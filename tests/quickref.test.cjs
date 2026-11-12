const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const categories = ['movement', 'action', 'bonusaction', 'reaction', 'condition', 'environment'];
const datasets = [
    'movement', 'action', 'bonusaction', 'reaction', 'condition',
    'environment_obscurance', 'environment_light', 'environment_vision', 'environment_cover'
];
const ruleTypes = new Set(['Standard rule', 'Optional Official rule', 'Homebrew rule']);

for (const [edition, prefix] of [['2014', ''], ['2024', '2024_']]) {
    test(edition + ' datasets retain the renderer input format and valid icons', () => {
        const context = vm.createContext({});
        for (const category of categories) {
            const filename = path.join(root, 'js', prefix + 'data_' + category + '.js');
            vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {filename});
        }
        assert.deepEqual(Object.keys(context).sort(), datasets.map(name => 'data_' + name).sort());
        for (const name of datasets) {
            const entries = context['data_' + name];
            assert.ok(Array.isArray(entries) && entries.length > 0, name);
            for (const entry of entries) {
                const label = edition + ': ' + name + ': ' + entry.title;
                for (const field of ['title', 'subtitle', 'description', 'icon']) {
                    assert.equal(typeof entry[field], 'string', label + ': ' + field);
                    assert.ok(entry[field].length > 0, label + ': empty ' + field);
                }
                if (entry.reference !== undefined) {
                    assert.equal(typeof entry.reference, 'string', label + ': reference');
                }
                assert.ok(ruleTypes.has(entry.optional), label + ': unknown rule type');
                assert.ok(Array.isArray(entry.bullets), label + ': bullets');
                assert.ok(entry.bullets.every(bullet => typeof bullet === 'string'), label + ': HTML bullet strings');
                assert.ok(fs.existsSync(path.join(root, 'img', entry.icon + '.png')), label + ': missing icon');
            }
        }
    });
}

test('all application scripts and inline scripts have valid syntax', () => {
    for (const name of fs.readdirSync(path.join(root, 'js')).filter(name => name.endsWith('.js'))) {
        const filename = path.join(root, 'js', name);
        new vm.Script(fs.readFileSync(filename, 'utf8'), {filename});
    }
    for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
        new vm.Script(match[1], {filename: 'index.html inline script'});
    }
});

test('the page and its linked stylesheets reference existing local assets', () => {
    const stylesheets = [];
    for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
        const reference = match[1];
        if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) continue;
        const filename = path.resolve(root, reference);
        assert.ok(fs.existsSync(filename), 'Missing page asset: ' + reference);
        if (filename.endsWith('.css')) stylesheets.push(filename);
    }
    assert.ok(stylesheets.length > 0);
    for (const filename of stylesheets) {
        const css = fs.readFileSync(filename, 'utf8');
        for (const match of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
            assert.ok(fs.existsSync(path.resolve(path.dirname(filename), match[1])),
                'Missing stylesheet asset: ' + match[1]);
        }
    }
});

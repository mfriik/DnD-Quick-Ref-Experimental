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

function searchContext() {
    const element = () => ({setAttribute() {}});
    const context = vm.createContext({
        document: {
            createElement: element,
            head: {appendChild() {}},
            body: {appendChild() {}, classList: {add() {}}},
            getElementById: element,
            addEventListener() {}
        },
        window: {matchMedia: () => ({matches: false})},
        localStorage: {getItem: () => null},
        sessionStorage: {getItem: () => null}
    });
    vm.runInContext(fs.readFileSync(path.join(root, 'js', 'quickref.js'), 'utf8'), context);
    return context;
}

test('search normalizes words and requires every word without treating input as regex', () => {
    const {getSearchTerms, matchesSearch} = searchContext();
    assert.deepEqual(Array.from(getSearchTerms('  AtTaCk \n ADVANTAGE\t')), ['attack', 'advantage']);
    assert.deepEqual(Array.from(getSearchTerms(' \t\n')), []);
    assert.ok(matchesSearch('attack with advantage', getSearchTerms('ADVANTAGE attack')));
    assert.ok(!matchesSearch('attack with disadvantage', getSearchTerms('attack missing')));
    assert.ok(matchesSearch('attack', getSearchTerms('')));
    for (const literal of ['[', '.*', '(', '+', '?', '\\']) {
        assert.ok(matchesSearch('literal ' + literal, getSearchTerms(literal)));
        assert.ok(!matchesSearch('plain text', getSearchTerms(literal)));
    }
});

test('search indexes only the four supported fields and matches across fields', () => {
    const context = searchContext();
    context.readableText = text => text;
    const {ruleSearchText, getSearchTerms, matchesSearch} = context;
    const text = ruleSearchText({
        title: 'Attack',
        subtitle: 'One Action',
        description: 'Choose a Target',
        bullets: ['Roll a D20.', 'Apply damage.'],
        reference: 'Secret source',
        icon: 'hidden-icon',
        optional: 'Homebrew rule'
    });
    for (const query of ['ATTACK', 'action', 'target', 'D20', 'damage', 'attack damage target']) {
        assert.ok(matchesSearch(text, getSearchTerms(query)), query);
    }
    for (const query of ['secret', 'source', 'hidden-icon', 'homebrew', 'missing']) {
        assert.ok(!matchesSearch(text, getSearchTerms(query)), query);
    }
    assert.equal(ruleSearchText({}), '');
});

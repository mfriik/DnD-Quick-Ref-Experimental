// Data files remain separate so both editions use the same presentation.
const ruleFiles = [
    'data_movement', 'data_action', 'data_bonusaction',
    'data_reaction', 'data_condition', 'data_environment'
];
const dataReady = Promise.all(ruleFiles.map(function(base) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        const prefix = localStorage.getItem('rules2024') === 'true' ? '2024_' : '';
        script.src = 'js/' + prefix + base + '.js';
        script.onload = resolve;
        script.onerror = function() {
            reject(new Error('Could not load ' + script.src));
        };
        document.head.appendChild(script);
    });
}));

let itemSequence = 0;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const rulesetTransitionKey = 'rulesetTransition';
const pendingRuleset = sessionStorage.getItem(rulesetTransitionKey);
const restoringRuleset = pendingRuleset !== null && pendingRuleset === localStorage.getItem('rules2024');
const restoreRulesetFocus = sessionStorage.getItem('rulesetKeyboardFocus') === 'true';
const rulesetStatus = document.createElement('div');
rulesetStatus.className = 'ruleset-status';
rulesetStatus.setAttribute('role', 'status');
rulesetStatus.setAttribute('aria-live', 'polite');
rulesetStatus.hidden = true;
document.body.appendChild(rulesetStatus);
document.body.classList.add('ruleset-entering');
document.getElementById('main-content').setAttribute('aria-busy', 'true');

function finishRulesetTransition(error) {
    sessionStorage.removeItem(rulesetTransitionKey);
    sessionStorage.removeItem('rulesetKeyboardFocus');
    document.body.classList.remove('ruleset-entering');
    document.getElementById('main-content').removeAttribute('aria-busy');
    if (restoringRuleset) {
        rulesetStatus.hidden = false;
        rulesetStatus.textContent = error ? 'Could not switch rulesets. Please reload to try again.'
            : 'Now showing ' + document.getElementById('ruleset-trigger').textContent +
                (localStorage.getItem('rules2024') === 'true' ? ' (2024)' : ' (2014)') + ' rules.';
        if (restoreRulesetFocus) {
            document.getElementById('ruleset-trigger').focus({preventScroll: true});
        }
    }
    if (!error) {
        document.body.classList.add('ruleset-arriving');
        setTimeout(function() {
            document.body.classList.remove('ruleset-arriving');
            rulesetStatus.hidden = true;
        }, 3000);
    }
    document.documentElement.classList.remove('rules-loading');
}

const expansionAnimations = new WeakMap();

function setExpanded(button, content, expanded, animate = false) {
    const height = content.hidden ? 0 : content.getBoundingClientRect().height;
    const currentStyles = getComputedStyle(content);
    const startFrame = {
        height: height + 'px', overflow: 'hidden', minHeight: '0',
        paddingTop: height === 0 ? '0px' : currentStyles.paddingTop,
        paddingBottom: height === 0 ? '0px' : currentStyles.paddingBottom,
        borderTopWidth: height === 0 ? '0px' : currentStyles.borderTopWidth,
        borderBottomWidth: height === 0 ? '0px' : currentStyles.borderBottomWidth
    };
    const previousAnimation = expansionAnimations.get(content);
    if (previousAnimation) {
        previousAnimation.cancel();
        expansionAnimations.delete(content);
    }
    if (!expanded && content.contains(document.activeElement)) {
        button.focus();
    }
    button.setAttribute('aria-expanded', String(expanded));
    content.classList.toggle('collapsed', !expanded);
    content.inert = !expanded;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!animate || reducedMotion.matches) {
        content.hidden = !expanded;
        return;
    }
    content.hidden = false;
    const targetHeight = expanded ? content.getBoundingClientRect().height : 0;
    const styles = getComputedStyle(content);
    const openFrame = {
        overflow: 'hidden', minHeight: '0',
        paddingTop: styles.paddingTop, paddingBottom: styles.paddingBottom,
        borderTopWidth: styles.borderTopWidth, borderBottomWidth: styles.borderBottomWidth
    };
    const closedFrame = {
        overflow: 'hidden', minHeight: '0',
        paddingTop: '0', paddingBottom: '0', borderTopWidth: '0', borderBottomWidth: '0'
    };
    const animation = content.animate([
        startFrame,
        {...(expanded ? openFrame : closedFrame), height: targetHeight + 'px'}
    ], {duration: 220, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'both'});
    expansionAnimations.set(content, animation);
    function finish() {
        content.hidden = !expanded;
        expansionAnimations.delete(content);
        reducedMotion.removeEventListener('change', motionChanged);
        animation.cancel();
    }
    function motionChanged(event) {
        if (event.matches) animation.finish();
    }
    animation.onfinish = finish;
    animation.oncancel = function() {
        reducedMotion.removeEventListener('change', motionChanged);
    };
    reducedMotion.addEventListener('change', motionChanged);
}

function add_quickref_item(parent, data, type) {
    const item = document.createElement('div');
    item.className = 'item itemsize';
    const ruleType = data.optional || 'Standard rule';
    const extraRule = ruleType === 'Optional rule' || ruleType === 'Homebrew rule';
    item.dataset.ruleType = ruleType;
    if (data.description) {
        const description = document.createElement('template');
        description.innerHTML = data.description;
        description.content.querySelectorAll('br, p, div, li').forEach(function(element) {
            element.after(document.createTextNode(' '));
        });
        const tooltip = description.content.textContent.replace(/\s+/g, ' ').trim();
        if (tooltip) item.title = tooltip;
    }

    const heading = document.createElement('h3');
    heading.className = 'item-heading';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'item-header';
    button.id = 'rule-toggle-' + ++itemSequence;
    button.setAttribute('aria-expanded', 'false');
    const contentId = 'rule-content-' + itemSequence;
    button.setAttribute('aria-controls', contentId);

    const icon = document.createElement('span');
    icon.className = 'item-icon iconsize icon-' + (data.icon || 'perspective-dice-six-faces-one');
    const iconUrl = new URL('img/' + encodeURIComponent(data.icon || 'perspective-dice-six-faces-one') + '.png', document.baseURI);
    icon.style.setProperty('--icon-image', 'url("' + iconUrl.href + '")');
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.className = 'item-text-container text';
    const title = document.createElement('span');
    title.className = 'item-title';
    title.textContent = data.title || '[no title]';
    if (extraRule) {
        const marker = document.createElement('span');
        marker.className = 'rule-marker ' +
            (ruleType === 'Optional rule' ? 'rule-marker-optional' : 'rule-marker-homebrew');
        marker.setAttribute('aria-hidden', 'true');
        title.prepend(marker);
    }
    const subtitle = document.createElement('span');
    subtitle.className = 'item-desc';
    subtitle.textContent = data.subtitle || '';
    text.append(title, subtitle);
    if (extraRule) {
        const classification = document.createElement('span');
        classification.className = 'sr-only';
        classification.textContent = ruleType;
        text.appendChild(classification);
    }
    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.setAttribute('aria-hidden', 'true');
    button.append(icon, text, chevron);
    heading.appendChild(button);

    const bulletsHTML = (data.bullets || []).map(function(bullet) {
        if (typeof bullet === 'object' && bullet.collapsible) {
            return '<div class="item-collapsible-container">' +
                '<div class="item-collapsible-title">' + bullet.title + '</div>' +
                '<div class="item-collapsible-content">' +
                bullet.content.map(p => '<p>' + p + '</p>').join('') +
                '</div></div>';
        }
        return '<p>' + bullet + '</p>';
    }).join('\n<hr>\n');

    const content = document.createElement('div');
    content.id = contentId;
    content.className = 'item-content collapsed';
    content.hidden = true;
    content.innerHTML = '<p class="item-description">' + (data.description || data.subtitle || '') +
        '</p><div class="item-bullets">' + bulletsHTML +
        '</div><div class="item-reference">' + (data.reference || '') + '</div>';
    if (extraRule) {
        const badge = document.createElement('span');
        badge.className = 'rule-type';
        badge.textContent = ruleType;
        content.prepend(badge);
    }

    button.addEventListener('click', function() {
        setExpanded(button, content, button.getAttribute('aria-expanded') !== 'true', true);
        updateCollapseAllButtonState(item.closest('.section-container'));
    });
    item.append(heading, content);
    parent.appendChild(item);
}

function fill_section(data, parentname, type) {
    const parent = document.getElementById(parentname);
    parent.classList.add('items-grid-container');
    data.forEach(item => add_quickref_item(parent, item, type));
}

function init() {
    fill_section(data_movement, 'basic-movement', 'Move');
    fill_section(data_action, 'basic-actions', 'Action');
    fill_section(data_bonusaction, 'basic-bonus-actions', 'Bonus action');
    fill_section(data_reaction, 'basic-reactions', 'Reaction');
    fill_section(data_condition, 'basic-conditions', 'Condition');
    fill_section(data_environment_obscurance, 'environment-obscurance', 'Environment');
    fill_section(data_environment_light, 'environment-light', 'Environment');
    fill_section(data_environment_vision, 'environment-vision', 'Environment');
    fill_section(data_environment_cover, 'environment-cover', 'Environment');
    handleRulesToggle();
    finishRulesetTransition(false);
}

function updateCollapseAllButtonState(section) {
    const button = section.querySelector('.collapse-all-btn');
    if (button) {
        button.disabled = !section.querySelector('.item:not(.item-hidden) .item-header[aria-expanded="true"]');
    }
}

function initCollapsibleSections() {
    const navigation = document.querySelector('.category-nav');
    const sectionIcons = {
        'section-movement': 'run',
        'section-action': 'crossed-swords',
        'section-bonus-action': 'embrassed-energy',
        'section-reaction': 'stopwatch',
        'section-condition': 'deathcab',
        'section-environment': 'broken-shield'
    };
    document.querySelectorAll('.section-container').forEach(function(section) {
        const title = section.querySelector('.section-title');
        const text = title.querySelector('.section-title-text');
        const name = text.firstChild.textContent.trim();
        if (section.id !== 'section-settings') {
            const link = navigation.querySelector('a[href="#' + section.id + '"]') || document.createElement('a');
            link.href = '#' + section.id;
            const label = section.id === 'section-environment' ? 'Environmental effects'
                : section.id === 'section-condition' ? 'Conditions' : name;
            link.setAttribute('aria-label', label);
            link.title = label;
            const iconName = sectionIcons[section.id];
            if (iconName) {
                const icon = document.createElement('span');
                icon.className = 'menu-icon';
                icon.setAttribute('aria-hidden', 'true');
                const iconUrl = new URL('img/' + iconName + '.png', document.baseURI);
                icon.style.setProperty('--icon-image', 'url("' + iconUrl.href + '")');
                link.replaceChildren(icon);
            } else {
                link.textContent = name;
            }
            navigation.insertBefore(link, document.getElementById('back-to-top'));
        }
        const content = section.querySelector('.section-content');
        content.id = section.id + '-content';
        const heading = document.createElement('h2');
        heading.className = 'section-heading';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'section-toggle';
        toggle.id = section.id + '-toggle';
        toggle.setAttribute('aria-controls', content.id);
        const chevron = document.createElement('span');
        chevron.className = 'chevron';
        chevron.setAttribute('aria-hidden', 'true');
        toggle.append(chevron, document.createTextNode(name));
        heading.appendChild(toggle);
        const collapseAll = title.querySelector('.collapse-all-btn:not(#app-version-display)');
        const limit = title.querySelector('.float-right');
        const version = title.querySelector('#app-version-display');
        title.replaceChildren(heading);
        if (limit) {
            limit.className = 'section-limit';
            title.appendChild(limit);
        }
        if (collapseAll) {
            collapseAll.type = 'button';
            collapseAll.setAttribute('aria-label', 'Collapse all items in ' + name);
            collapseAll.dataset.tooltip = 'Collapse all open cards';
            const icon = document.createElement('span');
            icon.className = 'collapse-all-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = '\u21a9';
            collapseAll.replaceChildren(icon);
            title.appendChild(collapseAll);
            collapseAll.addEventListener('click', function() {
                section.querySelectorAll('.item-header[aria-expanded="true"]').forEach(function(button) {
                    setExpanded(button, document.getElementById(button.getAttribute('aria-controls')), false, true);
                });
                updateCollapseAllButtonState(section);
            });
        }
        if (version) {
            const badge = document.createElement('span');
            badge.id = 'app-version-display';
            badge.className = 'app-version';
            badge.textContent = 'v' + window.dndQuickRefAppVersion;
            title.appendChild(badge);
        }
        setExpanded(toggle, content, localStorage.getItem(section.id + '-collapsed') !== 'true');
        toggle.addEventListener('click', function() {
            const expanded = toggle.getAttribute('aria-expanded') !== 'true';
            setExpanded(toggle, content, expanded, true);
            localStorage.setItem(section.id + '-collapsed', String(!expanded));
        });
    });
    const topMenu = navigation.closest('.top-menu');
    const updateMenuSpace = function() {
        document.documentElement.style.setProperty('--top-menu-height', topMenu.offsetHeight + 'px');
    };
    new ResizeObserver(updateMenuSpace).observe(topMenu);
    updateMenuSpace();

    document.querySelectorAll('a[href^="#section-"]').forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const section = document.getElementById(link.hash.slice(1));
            const toggle = section.querySelector('.section-toggle');
            setExpanded(toggle, section.querySelector('.section-content'), true);
            localStorage.setItem(section.id + '-collapsed', 'false');
            history.pushState(null, '', link.hash);
            toggle.focus({preventScroll: true});
            section.scrollIntoView({
                block: 'start',
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        });
    });
}

function handleRulesToggle() {
    const optional = document.getElementById('optional-switch').checked;
    const homebrew = document.getElementById('homebrew-switch').checked;
    document.querySelectorAll('.item[data-rule-type]').forEach(function(item) {
        const ruleType = item.dataset.ruleType;
        const hide = (ruleType === 'Optional rule' && !optional) ||
            (ruleType === 'Homebrew rule' && !homebrew);
        if (hide && item.contains(document.activeElement)) {
            document.getElementById(ruleType === 'Optional rule' ? 'optional-switch' : 'homebrew-switch').focus();
        }
        item.classList.toggle('item-hidden', hide);
    });
    document.querySelectorAll('.section-container').forEach(updateCollapseAllButtonState);
}

let themeTransitionTimer;

function applyTheme(dark, animate = false) {
    clearTimeout(themeTransitionTimer);
    const root = document.documentElement;
    const transitioning = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.toggle('theme-transitioning', transitioning);
    if (transitioning) {
        getComputedStyle(document.body).backgroundColor;
        themeTransitionTimer = setTimeout(function() {
            root.classList.remove('theme-transitioning');
        }, 500);
    }
    document.documentElement.classList.toggle('dark-mode-active', dark);
    document.getElementById('theme-trigger').setAttribute('aria-label',
        dark ? 'Switch to light mode' : 'Switch to dark mode');
}

function initSettings() {
    const dropdown = document.querySelector('.settings-dropdown');
    const panel = document.getElementById('settings-panel');
    const trigger = document.getElementById('settings-trigger');
    dropdown.appendChild(panel);
    function updateSettingsSpace() {
        if (!panel.hidden) {
            const menuBottom = dropdown.closest('.top-menu').getBoundingClientRect().bottom;
            panel.style.setProperty('--settings-top', (menuBottom + 12) + 'px');
        }
    }
    window.addEventListener('scroll', updateSettingsSpace, {passive: true});
    new ResizeObserver(updateSettingsSpace).observe(dropdown.closest('.top-menu'));
    document.getElementById('app-version-display').textContent = 'v' + window.dndQuickRefAppVersion;
    function closeSettings(restoreFocus) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restoreFocus) trigger.focus();
    }
    trigger.addEventListener('click', function() {
        const opening = panel.hidden;
        panel.hidden = !opening;
        trigger.setAttribute('aria-expanded', String(opening));
        updateSettingsSpace();
    });
    document.addEventListener('click', function(event) {
        if (!panel.hidden && !dropdown.contains(event.target)) {
            closeSettings(panel.contains(document.activeElement));
        }
    });
    dropdown.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !panel.hidden) {
            event.preventDefault();
            closeSettings(true);
        }
    });
    dropdown.addEventListener('focusout', function(event) {
        if (event.relatedTarget && !dropdown.contains(event.relatedTarget)) closeSettings(false);
    });
    const controls = [
        ['optional', 'optional-toggle-item', 'optional-switch'],
        ['homebrew', 'homebrew-toggle-item', 'homebrew-switch']
    ];
    controls.forEach(function([key, labelId, inputId]) {
        const oldLabel = document.getElementById(labelId);
        const label = document.createElement('label');
        label.id = labelId;
        label.className = oldLabel.className;
        label.htmlFor = inputId;
        while (oldLabel.firstChild) {
            const oldText = oldLabel.firstChild;
            if (oldText.nodeType === Node.ELEMENT_NODE) {
                const span = document.createElement('span');
                span.className = oldText.className;
                span.textContent = oldText.textContent;
                label.appendChild(span);
                oldText.remove();
            } else {
                label.appendChild(oldText);
            }
        }
        oldLabel.replaceWith(label);
        const input = document.getElementById(inputId);
        const title = label.querySelector('.item-title');
        const description = label.querySelector('.item-desc');
        title.id = inputId + '-label';
        description.id = inputId + '-description';
        input.setAttribute('aria-labelledby', title.id);
        input.setAttribute('aria-describedby', description.id);
        input.checked = localStorage.getItem(key) === 'true';
        input.addEventListener('change', function() {
            localStorage.setItem(key, String(input.checked));
            handleRulesToggle();
        });
    });
    const savedTheme = localStorage.getItem('darkmode');
    applyTheme(savedTheme === null ? systemTheme.matches : savedTheme === 'true');
    document.getElementById('theme-trigger').addEventListener('click', function() {
        const dark = !document.documentElement.classList.contains('dark-mode-active');
        localStorage.setItem('darkmode', String(dark));
        applyTheme(dark, true);
    });
    systemTheme.addEventListener('change', function(event) {
        if (localStorage.getItem('darkmode') === null) applyTheme(event.matches, true);
    });
    updateRulesToggleLabel();
    document.getElementById('ruleset-trigger').addEventListener('click', function(event) {
        const button = document.getElementById('ruleset-trigger');
        if (button.getAttribute('aria-disabled') === 'true') return;
        sessionStorage.setItem('rulesetKeyboardFocus', String(event.detail === 0));
        const next2024 = localStorage.getItem('rules2024') !== 'true';
        button.setAttribute('aria-disabled', 'true');
        rulesetStatus.textContent = next2024 ? 'Switching to D&D 5.5e (2024)...' : 'Switching to D&D 5e (2014)...';
        rulesetStatus.hidden = false;
        const main = document.getElementById('main-content');
        main.setAttribute('aria-busy', 'true');
        main.inert = true;
        document.body.classList.remove('ruleset-arriving');
        document.body.classList.add('ruleset-leaving');
        localStorage.setItem('rules2024', String(next2024));
        sessionStorage.setItem(rulesetTransitionKey, String(next2024));
        setTimeout(function() {
            location.reload();
        }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
    });
}

function updateRulesToggleLabel() {
    const current2024 = localStorage.getItem('rules2024') === 'true';
    const button = document.getElementById('ruleset-trigger');
    button.textContent = current2024 ? 'D&D 5.5e' : 'D&D 5e';
    const current = 'Current ruleset: ' + button.textContent + (current2024 ? ' (2024).' : ' (2014).');
    const action = 'Click to switch to ' + (current2024 ? 'D&D 5e (2014)' : 'D&D 5.5e (2024)') + ' rules.';
    button.dataset.tooltipHeading = current;
    button.dataset.tooltip = action;
    const label = current + ' ' + action;
    button.setAttribute('aria-label', label);
    button.title = label;
}

function initMenuTooltips() {
    const tooltip = document.createElement('div');
    tooltip.id = 'menu-tooltip';
    tooltip.className = 'menu-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.hidden = true;
    document.body.appendChild(tooltip);
    let activeControl = null;
    let hideTimer;

    function hide() {
        clearTimeout(hideTimer);
        tooltip.hidden = true;
        if (activeControl) activeControl.removeAttribute('aria-describedby');
        activeControl = null;
    }

    function show(control) {
        hide();
        activeControl = control;
        const label = control.getAttribute('aria-label');
        tooltip.textContent = control.dataset.tooltip ||
            (control.matches('.category-nav > a') ? 'Jump to ' + label : label);
        if (control.dataset.tooltipHeading) {
            const heading = document.createElement('strong');
            heading.textContent = control.dataset.tooltipHeading;
            tooltip.prepend(heading, document.createElement('br'));
        }
        tooltip.hidden = false;
        control.setAttribute('aria-describedby', tooltip.id);
        const rect = control.getBoundingClientRect();
        const left = Math.max(12, Math.min(rect.left + (rect.width - tooltip.offsetWidth) / 2,
            window.innerWidth - tooltip.offsetWidth - 12));
        tooltip.style.left = left + 'px';
        tooltip.style.top = Math.max(12, Math.min(rect.bottom + 8,
            window.innerHeight - tooltip.offsetHeight - 12)) + 'px';
    }

    function scheduleHide() {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(hide, 120);
    }

    document.querySelectorAll('.category-nav > a, .top-menu .menu-control, .settings-trigger, .collapse-all-btn').forEach(function(control) {
        control.removeAttribute('title');
        control.addEventListener('pointerenter', function(event) {
            if (event.pointerType !== 'touch') show(control);
        });
        control.addEventListener('pointerleave', scheduleHide);
        control.addEventListener('focus', function() { show(control); });
        control.addEventListener('blur', scheduleHide);
        control.addEventListener('click', hide);
    });
    tooltip.addEventListener('pointerenter', function() { clearTimeout(hideTimer); });
    tooltip.addEventListener('pointerleave', scheduleHide);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') hide();
    });
    window.addEventListener('scroll', hide, {passive: true});
    window.addEventListener('resize', hide);
}

function initHelp() {
    const trigger = document.getElementById('help-trigger');
    const dialog = document.getElementById('help-dialog');
    const close = document.getElementById('help-close');
    const body = dialog.querySelector('.help-body');
    const annotations = dialog.querySelector('.help-annotations');
    const topics = [
        {
            title: 'Section Navigation', target: '.category-nav',
            text: 'Section icons open a collapsed section, scroll to it and update the address fragment. Navigation stays available while scrolling.'
        },
        {
            title: 'Jump to Top', target: '#back-to-top',
            text: 'Return to the title and clear the section fragment (#section-...) from the address, keeping the page path and query.'
        },
        {
            title: 'Preferences Menu', target: '.preferences-menu',
            text: 'Ruleset, theme, Settings and Help are grouped here. The question mark opens this guide without changing your preferences.'
        },
        {
            title: 'Ruleset', target: '#ruleset-trigger',
            text: 'Switch D&D 5e (2014) / 5.5e (2024). The choice is saved and the page reloads with the other rules. Individual cards start closed.'
        },
        {
            title: 'Light / Dark Mode', target: '#theme-trigger',
            text: 'Change and save the theme without reloading. On your first visit, appearance follows your system setting.'
        },
        {
            title: 'Settings', target: '#settings-trigger',
            text: 'Independent, saved switches show optional and homebrew cards. Feedback and main-site links open in new tabs.'
        },
        {
            title: 'Section Chevron', target: '.section-toggle',
            text: 'Click the chevron or heading to expand or collapse the whole section. This choice is remembered separately from open cards.'
        },
        {
            title: 'Item Card', target: '.item-header',
            text: 'Click the header or chevron to show or hide details and the source. Hover for a native description tooltip. Open cards reset on reload.'
        },
        {
            title: 'Collapse All Open Cards', target: '.collapse-all-btn',
            text: 'Close open cards in this section, not the section itself. Enabled only when at least one visible card here is expanded; otherwise dimmed and disabled.'
        },
        {
            title: 'Extra Rule Markers', target: '.rule-marker',
            text: 'Extra cards have a gold star (optional) or beer stein (homebrew) before the title. Settings controls visibility; expanded cards also show the written type.'
        }
    ];
    const list = document.getElementById('help-topics');
    topics.forEach(function(topic) {
        const entry = document.createElement('li');
        const heading = document.createElement('h3');
        heading.textContent = topic.title;
        const text = document.createElement('p');
        text.textContent = topic.text;
        entry.append(heading, text);
        list.appendChild(entry);
    });

    let frame = 0;
    let previousPadding;
    let wasLocked;
    let previousFilters;
    let previousScroll;
    const observer = new ResizeObserver(scheduleLayout);
    function scheduleLayout() {
        if (!dialog.open || frame) return;
        frame = requestAnimationFrame(function() {
            frame = 0;
            layoutAnnotations();
        });
    }
    function layoutAnnotations() {
        annotations.replaceChildren();
        dialog.classList.remove('help-contextual');
        if (window.innerWidth < 1000 || window.innerHeight < 560) return;
        dialog.classList.add('help-contextual');
        if (document.activeElement === body) close.focus({preventScroll: true});
        const heading = dialog.querySelector('.help-sheet').getBoundingClientRect();
        const menuBottom = document.querySelector('.top-menu').getBoundingClientRect().bottom;
        const occupied = [heading];
        const menu = document.querySelector('.top-menu').getBoundingClientRect();
        const highlights = [];
        function overlaps(a, b) {
            return a.left < b.right + 4 && a.right + 4 > b.left &&
                a.top < b.bottom + 4 && a.bottom + 4 > b.top;
        }
        topics.forEach(function(topic, index) {
            const label = document.createElement('div');
            label.className = 'help-callout';
            const title = document.createElement('h3');
            title.textContent = (index + 1) + '. ' + topic.title;
            const text = document.createElement('p');
            text.textContent = topic.text;
            label.append(title, text);
            annotations.appendChild(label);
            const width = label.offsetWidth;
            const height = label.offsetHeight;
            let placement;
            const target = Array.from(document.querySelectorAll(topic.target)).find(function(element) {
                const rect = element.getBoundingClientRect();
                const visible = element.getClientRects().length && rect.width && rect.height &&
                    rect.left >= 8 && rect.right <= window.innerWidth - 8 &&
                    rect.top >= (element.closest('.top-menu') ? 8 : Math.max(8, menuBottom + 8)) &&
                    rect.bottom + height + 10 <= window.innerHeight - 8;
                if (!visible || occupied.some(other => overlaps(rect, other))) return false;
                const offsets = [rect.left, rect.right - width, rect.left - width / 2];
                placement = offsets.map(function(left) {
                    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
                    return {left, top: rect.bottom + 10, right: left + width, bottom: rect.bottom + 10 + height};
                }).find(box => !overlaps(box, menu) && !occupied.some(other => overlaps(box, other)) &&
                    !highlights.some(other => overlaps(box, other)));
                return !!placement;
            });
            if (!target) {
                if (!document.querySelector(topic.target)?.closest('.top-menu')) {
                    label.remove();
                    return;
                }
                const element = document.querySelector(topic.target);
                const rect = element.getBoundingClientRect();
                const columns = Math.max(1, Math.floor((window.innerWidth - 16) / (width + 8)));
                const lefts = Array.from({length: columns}, (_, column) => 8 +
                    column * (window.innerWidth - width - 16) / Math.max(1, columns - 1))
                    .sort((a, b) => Math.abs(a + width / 2 - (rect.left + rect.width / 2)) -
                        Math.abs(b + width / 2 - (rect.left + rect.width / 2)));
                for (let top = menuBottom + 10; top + height <= window.innerHeight - 8 && !placement; top += 16) {
                    placement = lefts.map(left => ({left, top, right: left + width, bottom: top + height}))
                        .find(box => !occupied.some(other => overlaps(box, other)) &&
                            !highlights.some(other => overlaps(box, other)));
                }
                if (placement) {
                    placeLabel(rect);
                    return;
                }
                label.remove();
                return;
            }
            const rect = target.getBoundingClientRect();
            placeLabel(rect);
            function placeLabel(rect) {
                label.style.left = placement.left + 'px';
                label.style.top = placement.top + 'px';
                const highlight = document.createElement('div');
                highlight.className = 'help-highlight';
                highlight.dataset.helpTopic = String(index + 1);
                if (topic.target === '.preferences-menu') highlight.classList.add('help-highlight-preferences');
                Object.assign(highlight.style, {
                    left: rect.left + 'px', top: rect.top + 'px',
                    width: rect.width + 'px', height: rect.height + 'px'
                });
                const number = document.createElement('span');
                number.className = 'help-target-number';
                number.textContent = String(index + 1);
                highlight.appendChild(number);
                annotations.appendChild(highlight);
                occupied.push(placement);
                highlights.push(rect);
            }
        });
        if (annotations.querySelectorAll('.help-callout').length !== topics.length) {
            annotations.replaceChildren();
            dialog.classList.remove('help-contextual');
        }
    }
    trigger.addEventListener('click', function() {
        if (dialog.open) return;
        const settings = document.getElementById('settings-panel');
        settings.hidden = true;
        document.getElementById('settings-trigger').setAttribute('aria-expanded', 'false');
        previousScroll = {left: window.scrollX, top: window.scrollY};
        previousFilters = ['optional-switch', 'homebrew-switch'].map(function(id) {
            const input = document.getElementById(id);
            const checked = input.checked;
            input.checked = true;
            return {input, checked};
        });
        handleRulesToggle();
        previousPadding = document.body.style.paddingRight;
        wasLocked = document.body.classList.contains('dialog-open');
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = (parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar) + 'px';
        document.body.classList.add('dialog-open');
        dialog.showModal();
        body.scrollTop = 0;
        close.focus({preventScroll: true});
        observer.observe(document.querySelector('.top-menu'));
        observer.observe(document.getElementById('main-content'));
        window.addEventListener('resize', scheduleLayout);
        scheduleLayout();
    });
    close.addEventListener('click', function() { dialog.close(); });
    dialog.addEventListener('cancel', function(event) {
        event.preventDefault();
        dialog.close();
    });
    dialog.addEventListener('keydown', function(event) {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        (dialog.classList.contains('help-contextual') ? close :
            document.activeElement === close ? body : close).focus({preventScroll: true});
    });
    dialog.addEventListener('close', function() {
        observer.disconnect();
        window.removeEventListener('resize', scheduleLayout);
        cancelAnimationFrame(frame);
        frame = 0;
        annotations.replaceChildren();
        previousFilters.forEach(function(saved) { saved.input.checked = saved.checked; });
        handleRulesToggle();
        document.body.style.paddingRight = previousPadding;
        if (!wasLocked) document.body.classList.remove('dialog-open');
        window.scrollTo({...previousScroll, behavior: 'instant'});
        trigger.focus({preventScroll: true});
    });
}

function initNotices() {
    const notice = document.getElementById('cookie-notice');
    notice.hidden = localStorage.getItem('cookiesAccepted') === 'true';
    function updateNoticeSpace() {
        document.body.classList.toggle('has-cookie-notice', !notice.hidden);
        document.documentElement.style.setProperty('--cookie-space', notice.hidden ? '0px' : (notice.offsetHeight + 40) + 'px');
    }
    new ResizeObserver(updateNoticeSpace).observe(notice);
    updateNoticeSpace();
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        notice.hidden = true;
        updateNoticeSpace();
        document.getElementById('main-content').focus({preventScroll: true});
    });
    document.addEventListener('focusin', function(event) {
        if (event.target.closest('#help-dialog')) return;
        if (!notice.hidden && !notice.contains(event.target) && event.target.id !== 'back-to-top') {
            const bottom = event.target.getBoundingClientRect().bottom;
            const noticeTop = notice.getBoundingClientRect().top;
            if (bottom > noticeTop - 12) window.scrollBy(0, bottom - noticeTop + 16);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCollapsibleSections();
    initSettings();
    initHelp();
    initMenuTooltips();
    initNotices();
    document.getElementById('back-to-top').addEventListener('click', function() {
        history.replaceState(history.state, '', window.location.pathname + window.location.search);
        document.getElementById('page-title').focus({preventScroll: true});
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    });
});

dataReady.then(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {once: true});
    } else {
        init();
    }
}).catch(function(error) {
    console.error('Quick reference data failed to load:', error);
    finishRulesetTransition(true);
    const message = document.createElement('p');
    message.className = 'load-error';
    message.setAttribute('role', 'alert');
    message.textContent = 'The rules could not be loaded. Please reload the page to try again.';
    document.getElementById('main-content').prepend(message);
});

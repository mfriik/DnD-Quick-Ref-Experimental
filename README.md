# D&D Quick Reference - Experimental

> **💡 Important:**
>
> If the page looks off, sections don’t load, or you’re not seeing the newest features —
>
> **hard-refresh your browser** (`Ctrl + Shift + R` or `Ctrl + F5`).
> This should be purely optional as the page has logic to automatically refresh if a new version is detected and you have an older version cached, but it never hurts to try 😉
>
> GitHub Pages and browsers aggressively cache static files,
>
> so a full reload ensures you’re running the latest version with **all recent improvements, fixes, and UI updates**.
>
> Think of it as your *long rest* for the app — refresh to recharge and unlock new abilities!

A browser-based Dungeons & Dragons 5e reference for players and Dungeon Masters.
Look up common actions, movement, conditions and environmental rules during play,
with separate **2014** and **2024** rulesets.

This repository is the experimental version of the reference: a place to try
interface changes and features before they may reach the regular site. It is
a quick reminder of the rules, not a replacement for the rulebooks.

- **[Open the experimental site](https://dndtest.misiek.win/)**
- [Open the regular site](https://dnd.misiek.win/)
- [Source repository](https://github.com/mfriik/DnD-Quick-Ref-Experimental)

## What it covers

| Section | Contents |
| --- | --- |
| Movement | Movement costs, climbing, swimming, jumping and difficult terrain |
| Actions | Attacking, spellcasting, defensive actions, helping and interacting |
| Bonus actions | Offhand attacks, spells and features that use a bonus action |
| Reactions | Opportunity attacks, readied actions and reaction spells |
| Conditions | Effects such as blinded, grappled, poisoned and exhaustion |
| Environmental effects | Obscured vision, lighting, special senses and cover |

Available entries and details depend on the selected ruleset. Cards include
short summaries, expanded explanations and source references.

## Using the reference

- **Choose an edition.** The D&D 5e / D&D 5.5e button switches between the 2014
  and 2024 rulesets respectively; its tooltip includes the edition year. It
  reloads the page with the selected data. The initial default is 2014.
  A short fade and status message make the change visible; reduced-motion
  preferences disable the animation and its added delay.
  Sections and cards also fade in when the page first loads or is refreshed.
- **Jump to a section.** The sticky navigation stays available while scrolling.
  Selecting a section opens it if it was collapsed. The up arrow returns to
  the top and clears the section fragment from the address.
- **Open only what you need.** Select a card to reveal its details, or a section
  heading to collapse that section. The return-arrow button in each section
  closes all its open cards; it is disabled when none are open.
- **Switch the theme.** Use the sun/moon button beside the edition selector.
  On your first visit, the appearance follows your system theme.
  Colors transition smoothly without hiding text; reduced-motion preferences
  make theme changes immediate.
- **Include extra rules.** Settings provides separate switches for optional
  official rules and homebrew rules, both hidden by default. A tiny gold star
  marks optional rules; a gold beer stein marks homebrew rules. These icons
  appear before the card title. Expanded cards retain
  their written rule-type labels.
  Homebrew entries are available in both editions; optional official entries
  are currently present in the 2014 dataset.
  The 2014 homebrew entries include Exhaustion (2024), an alternative to the
  original Exhaustion condition, not an additional set of penalties.
  Other 2014 homebrew entries include Bleeding, Intercept Attack, Take Aim and
  Throw a Potion.
  Both editions include Delay and the 3.5e-inspired Flanked condition (+2 to
  melee attacks against the flanked target). The 2024 homebrew entries also
  include Switch Mastery, Duck and Cover, and Dazed.
  Cards show standard rules first, then optional rules, then homebrew.
  Shove Aside and Exhaustion (2024) stay beside their standard counterparts.
- **Give feedback or return to the regular site.** Both links are in Settings.
- **Get interface help.** The question-mark button after Settings opens a
  read-only guide over a dimmed page. Descriptions appear directly below visible
  controls on larger screens, without a side list. Close help to scroll to other
  controls, then reopen it; on small screens a scrollable guide covers all topics.
  Ten separate topics cover navigation, Jump to Top, preferences, ruleset,
  theme, Settings, sections, cards, Collapse All and rule markers. Repeated
  controls can be highlighted in a later section when an earlier one has no
  room for its description.
  The page underneath is blocked until you close help
  with X or Escape. While help is open, optional and homebrew cards are shown
  temporarily so their markers can be explained. Closing help restores your
  filters and scroll position without changing saved preferences or open cards.
- **Print what you need.** Open the sections and cards you want, then use your
  browser's Print or Save as PDF option. Print styling removes navigation and
  notices; collapsed or filtered-out content remains hidden.

The layout adapts to narrow screens. Controls support keyboard navigation,
visible focus and explanatory tooltips, and animations respect your system's
reduced-motion preference.
Hovering over a rule card shows its description in a native browser tooltip.

### Saved preferences

The site remembers your edition, theme choice, optional/homebrew filters,
collapsed sections and dismissed notices in your browser's local storage.
Individual cards start closed after a reload.

Preferences are specific to the browser and site address: the experimental site,
regular site and local preview do not share them. No account is required.
The cookie notice can be dismissed with **Accept**. To show it again locally,
run `localStorage.removeItem('cookiesAccepted'); location.reload();` in your
browser's developer console on the local preview. Other preferences are preserved.

## Run locally

The application is a static HTML, CSS and JavaScript site. It needs no package
installation, build step or application server.
The help overlay also runs entirely in the browser and works with static
GitHub Pages hosting, including repository subpaths; no backend is required.

With Python installed, run this from the repository root:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Refresh after editing files;
if older assets persist, use `Ctrl + Shift + R`.

The page loads fonts from Google Fonts, with fallback fonts available.
The same static files can be served by a static hosting provider; [CNAME](./CNAME)
records the experimental site's custom domain.

## Repository and customization

| Location | Purpose |
| --- | --- |
| [index.html](./index.html) | Page structure, section containers, menu and Settings |
| [js/quickref.js](./js/quickref.js) | Loads the chosen edition, renders cards and handles interaction and preferences |
| [js/](./js/) | Rule datasets: `data_*.js` for 2014 and `2024_data_*.js` for 2024 |
| [css/quickref.css](./css/quickref.css) | Active layout, themes, responsive and print styles |
| [css/icons.css](./css/icons.css) | Icon background definitions |
| [img/](./img/) | Rule pictograms |
| [favicon.ico](./favicon.ico) | Site icon |

The page loads one set of rule files for the selected edition and turns their
entries into cards. Both editions share the same renderer and interface.
Environmental data is grouped into obscurance, lighting, vision and cover.

### Editing rules

Edit the relevant file in [js/](./js/) for the edition you intend to change.
For example, [data_action.js](./js/data_action.js) contains 2014 actions, while
[2024_data_action.js](./js/2024_data_action.js) contains their 2024 counterparts.
The files are maintained JavaScript data, not an in-page rule editor.

Follow the existing entry structure:

- `title` and `subtitle` provide the card's heading and summary.
- `description` and `bullets` provide the expanded explanation.
- Write `title`, `subtitle` and `description` in Title Case, preserving acronyms
  such as HP and D20. Detailed `bullets` keep normal sentence capitalization.
- `reference` identifies the rule source.
- `icon` names a PNG in [img/](./img/), without its extension.
- `optional` classifies the entry as `Standard rule`, `Optional rule` or
  `Homebrew rule`, which determines whether the Settings filters hide it.

Detailed content supports HTML, so use trusted content and preserve the existing
formatting conventions. Changes to one edition do not automatically update the
other; check both when a correction applies to both rulesets.

For interface changes, edit the stylesheets linked above. The similarly named
stylesheets at the repository root are not loaded by the current page.

## Contributing

[Report a problem or suggest an improvement](https://github.com/mfriik/DnD-Quick-Ref-Experimental/issues).
For a rule correction, include the edition and source reference. For interface
problems, include your browser, steps to reproduce and a screenshot if useful.

Pull requests should be focused and explain the intended behavior. Run the site
locally and check the affected ruleset, both themes and a narrow screen.
For interaction changes, also check keyboard use and the relevant saved settings.
There is currently no automated test suite or build command.

## Credits and license

- [crobi/dnd5e-quickref](https://github.com/crobi/dnd5e-quickref) - original project.
- [nico-713/dnd5e-quickref-2024](https://github.com/nico-713/dnd5e-quickref-2024) - source for the 2024 rules adaptation.
- [natsumeaoii/dnd5e-quickref](https://github.com/natsumeaoii/dnd5e-quickref) - inspiration for features and design.
- [game-icons.net](https://game-icons.net/) - rule icons.
- [Iconduck dragon icon](https://iconduck.com/icons/21871/dragon) - favicon.

The repository includes an [MIT license](./LICENSE).

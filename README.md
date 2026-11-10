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

- **Choose an edition.** The D&D 2014 / D&D 2024 button switches rulesets and
  reloads the page with the selected data. The initial default is 2014.
- **Jump to a section.** The sticky navigation stays available while scrolling.
  Selecting a section opens it if it was collapsed. The up arrow returns to
  the top and clears the section fragment from the address.
- **Open only what you need.** Select a card to reveal its details, or a section
  heading to collapse that section. The return-arrow button in each section
  closes all its open cards; it is disabled when none are open.
- **Switch the theme.** Use the sun/moon button beside the edition selector.
  On your first visit, the appearance follows your system theme.
- **Include extra rules.** Settings provides separate switches for optional
  official rules (`*`) and homebrew rules (`**`), both hidden by default.
  Currently, these extra entries are present in the 2014 dataset; all entries
  in the 2024 dataset are classified as standard rules.
- **Give feedback or return to the regular site.** Both links are in Settings.
- **Print what you need.** Open the sections and cards you want, then use your
  browser's Print or Save as PDF option. Print styling removes navigation and
  notices; collapsed or filtered-out content remains hidden.

The layout adapts to narrow screens. Controls support keyboard navigation,
visible focus and explanatory tooltips, and animations respect your system's
reduced-motion preference.

### Saved preferences

The site remembers your edition, theme choice, optional/homebrew filters,
collapsed sections and dismissed notices in your browser's local storage.
Individual cards start closed after a reload.

Preferences are specific to the browser and site address: the experimental site,
regular site and local preview do not share them. No account is required.
A first-visit dialog identifies the experimental site, and a separate notice
can be dismissed with **Accept**.

## Run locally

The application is a static HTML, CSS and JavaScript site. It needs no package
installation, build step or application server.

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

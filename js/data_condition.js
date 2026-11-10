data_condition = [
    {
        title: "Blinded",
        optional: "Standard rule",
        icon: "one-eyed",
        subtitle: "No sight; Attack disadvantage",
        description: "You can't see: sight-based checks fail, your attacks have disadvantage, and attacks against you have advantage.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You automatically fail any ability check which requires sight.",
            "You have disadvantage on attack rolls.",
            "Attack rolls against you have advantage."
        ]
    },
    {
        title: "Charmed",
        optional: "Standard rule",
        icon: "smitten",
        subtitle: "Can't harm your charmer",
        description: "You can't attack or harm your charmer with abilities or magic. They have advantage on social checks with you.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You can't attack your charmer or target them with harmful abilities or magical effects.",
            "Your charmer has advantage on ability checks to interact socially with you."
        ]
    },
    {
        title: "Deafened",
        optional: "Standard rule",
        icon: "elf-ear",
        subtitle: "Hearing checks fail",
        description: "You can't hear and automatically fail ability checks that require hearing.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You automatically fail any ability check which requires hearing."
        ]
    },
    {
        title: "Exhaustion",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Penalties by level",
        description: "Six cumulative levels impair checks, speed, attacks, saves, and maximum hit points, ending in death at level 6.",
        reference: "PHB'14, pg. 291.",
        bullets: [
            "<table><tr><th>Level</th><th></th><th></th><th style='text-align:left'>Effect</th></tr><tr><td>1</td><td></td><td></td><td>Disadvantage on ability checks</td></tr><tr><td>2</td><td></td><td></td><td>Speed halved</td></tr><tr><td>3</td><td></td><td></td><td>Disadvantage on attack rolls and saving throws</td></tr><tr><td>4</td><td></td><td></td><td>Hit point maximum halved</td></tr><tr><td>5</td><td></td><td></td><td>Speed reduced to 0</td></tr><tr><td>6</td><td></td><td></td><td>Death</td></tr></table>",
            "You suffer the effect of your current level of exhaustion as well as all lower levels.",
            "Finishing a long rest reduces your exhaustion level by 1, provided that you have also had some food and drink.",
            "Also, being raised from the dead reduces a creature’s exhaustion level by 1."
        ]
    },
    {
        title: "Exhaustion (2024)",
        optional: "Homebrew rule",
        icon: "crawl",
        subtitle: "D20 and speed penalties",
        description: "Each level gives -2 to ability checks, attacks, and saves, and -5 ft. speed; level 6 means death. Replaces 2014 Exhaustion.",
        reference: "PHB'24, pg. 366. Homebrew adaptation for D&D 5e.",
        bullets: [
            "This is an alternative to the standard Exhaustion condition, not an additional set of penalties.",
            "Each Exhaustion level imposes a -2 penalty to D20 Tests (ability checks, attack rolls, and saving throws) and reduces your speed by 5 feet.",
            "<table><tr><th>Level</th><th>D20 Tests</th><th>Speed</th></tr><tr><td>1</td><td>-2</td><td>-5 ft.</td></tr><tr><td>2</td><td>-4</td><td>-10 ft.</td></tr><tr><td>3</td><td>-6</td><td>-15 ft.</td></tr><tr><td>4</td><td>-8</td><td>-20 ft.</td></tr><tr><td>5</td><td>-10</td><td>-25 ft.</td></tr><tr><td>6</td><td colspan='2'>Death</td></tr></table>",
            "Exhaustion levels accumulate. At level 6, you die.",
            "Finishing a long rest reduces your Exhaustion level by 1. At level 0, the condition ends."
        ]
    },
    {
        title: "Frightened",
        optional: "Standard rule",
        icon: "sharp-smile",
        subtitle: "Can't approach source",
        description: "You can't willingly approach the source of fear. While you can see it, your attacks and ability checks have disadvantage.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You have disadvantage on ability checks and attack rolls while the source of your fear is within line of sight.",
            "You can't willingly move closer to the source of your fear."
        ]
    },
    {
        title: "Grappled",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Speed reduced to 0",
        description: "Your speed is 0 and can't benefit from bonuses. The grapple ends if the grappler is incapacitated or you leave their reach.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "Your speed becomes 0, and you can't benefit from any bonus to your speed.",
            "The condition ends if your grappler is incapacitated.",
            "The condition also ends if you are removed from the reach of your grappler."
        ]
    },
    {
        title: "Incapacitated",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "No actions or reactions",
        description: "You can't take actions, bonus actions, or reactions.",
        reference: "PHB'14, pg. 290.",
        bullets: [
        ]
    },
    {
        title: "Invisible",
        optional: "Standard rule",
        icon: "invisible",
        subtitle: "Unseen; attack advantage",
        description: "You can't be seen without magic or special senses. Your attacks have advantage; attacks against you have disadvantage. Noise and tracks can reveal you.",
        reference: "PHB'14, pg. 291.",
        bullets: [
            "For the purpose of hiding, you are heavily obscured.",
            "You can still be detected by any noise you make or tracks you leave.",
            "You have advantage on attack rolls.",
            "Attack rolls against you have disadvantage.",
            "A target that's invisble can’t be targeted by a spell requiring sight."
        ]
    },
    {
        title: "Paralyzed",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Incapacitated; can't move",
        description: "You can't act, move, or speak and fail Strength/Dexterity saves. Attacks against you have advantage; hits from within 5 ft. are critical.",
        bullets: [
            "You are incapacitated and can't move or speak.",
            "Attack rolls against you have advantage.",
            "Any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Petrified",
        optional: "Standard rule",
        icon: "stone-pile",
        subtitle: "Inert; resist all damage",
        description: "You and your nonmagical gear become an inert substance. You can't act or move, fail Strength/Dexterity saves, and resist all damage.",
        reference: "PHB'14, pg. 291.",
        bullets: [
            "Your weight increases by a factor of ten, and you cease aging.",
            "You are incapacitated, can't move or speak, and are unaware of your surroundings.",
            "Attack rolls against you have advantage.",
            "You automatically fail Strength and Dexterity saving throws.",
            "You have resistance to all damage.",
            "You are immune to poison and disease, though a poison or disease already in your system is only suspended, not neutralized."
        ]
    },
    {
        title: "Poisoned",
        optional: "Standard rule",
        icon: "deathcab",
        subtitle: "Attacks & tests have disadvantage",
        description: "Your attack rolls and ability checks have disadvantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "You have disadvantage on attack rolls and ability checks."
        ]
    },
    {
        title: "Prone",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Crawl; Attack disadvantage",
        description: "Crawl or stand up. Your attacks have disadvantage; attacks against you have advantage from within 5 ft., otherwise disadvantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "Your only movement option is to crawl, unless you stand up.",
            "You have disadvantage on attack rolls.",
            "Attack rolls against you have advantage if the attacker is within 5 feet of you, otherwise the attack roll has disadvantage."
        ]
    },
    {
        title: "Restrained",
        optional: "Standard rule",
        icon: "imprisoned",
        subtitle: "Speed 0; Attack disadvantage",
        description: "Your speed is 0. Your attacks and Dexterity saves have disadvantage; attacks against you have advantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "Your speed becomes 0, and you can't benefit from any bonus to your speed.",
            "You have disadvantage on attack rolls.",
            "Attack rolls against you have advantage.",
            "You have disadvantage on Dexterity saving throws."
        ]
    },
    {
        title: "Stunned",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Incapacitated; can't move",
        description: "You can't act or move and can barely speak. You fail Strength/Dexterity saves; attacks against you have advantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "You are incapacitated, can't move, and can speak only falteringly.",
            "Attack rolls against you have advantage.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Unconscious",
        optional: "Standard rule",
        icon: "coma",
        subtitle: "Incapacitated; fall prone",
        description: "You can't act, move, speak, or perceive your surroundings. You fall prone, drop held items, and fail Strength/Dexterity saves. Hits from within 5 ft. are critical.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "You are incapacitated, can't move or speak, and are unaware of your surroundings.",
            "You drop whatever you're holding and fall prone.",
            "Attack rolls against you have advantage.",
            "Any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws.",
        ]
    },
    {
        title: "Dying",
        optional: "Standard rule",
        icon: "dead-head",
        subtitle: "0 HP; make death saves",
        description: "At 0 HP and not stable, make death saves each turn: three successes stabilize you; three failures kill you. Healing ends dying.",
        reference: "PHB'14, pg. 197.",
        bullets: [
            "If you are reduced to 0 hit points by damage that fails to kill you, you fall unconscious and are dying.",
            "If you receive any healing you immediately regain consciousness again and no longer dying.",
            "When dying, at the start of each of your turns you make a death saving throw. Roll a d20 and do not add any modifiers.",
            "A 10 or higher is a success, 9 or lower is a failure.",
            "On your third success, you become stable.",
            "On your third failure, you die.",
            "Rolling a 1 counts as two failures.",
            "Rolling a 20 immediately causes you to regain 1 hit point.",
            "You can also be stabilized by an ally taking the Stabilize action and succeeding on a DC 10 Wisdom (Medicine) check.",
            "Once stable, you regain 1 hit point after 1d4 hours."
        ]
    }
]

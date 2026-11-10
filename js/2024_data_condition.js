data_condition = [
    {
        title: "Blinded",
        optional: "Standard rule",
        icon: "one-eyed",
        subtitle: "No sight; attack disadvantage",
        description: "You can't see: sight-based checks fail, your attacks have Disadvantage, and attacks against you have Advantage.",
        reference: "PHB'24, pg. 361.",
        bullets: [
            "You automatically fail any ability check that requires sight.",
            "You have Disadvantage on attack rolls.",
            "Attack rolls against you have Advantage."
        ]
    },
    {
        title: "Charmed",
        optional: "Standard rule",
        icon: "smitten",
        subtitle: "Can't harm your charmer",
        description: "You can't attack or target your charmer with damaging abilities or magic. They have Advantage on social checks with you.",
        reference: "PHB'24, pg. 363.",
        bullets: [
            "You can't attack the charmer or target them with damaging abilities or magical effects.",
            "The charmer has Advantage on ability checks to interact with you socially."
        ]
    },
    {
        title: "Deafened",
        optional: "Standard rule",
        icon: "elf-ear",
        subtitle: "Hearing checks fail",
        description: "You can't hear and automatically fail ability checks that require hearing.",
        reference: "PHB'24, pg. 365.",
        bullets: [
            "You automatically fail any ability check that requires hearing."
        ]
    },
    {
        title: "Exhaustion",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "D20 and speed penalties",
        description: "Each level gives -2 to D20 Tests and -5 ft. Speed. Levels accumulate; at level 6, you die.",
        reference: "PHB'24, pg. 366.",
        bullets: [
            "<table><tr><th>Level</th><th></th><th></th><th style='text-align:left'>D20 Tests</th><th></th><th></th><th>Speed</th></tr><tr><td>1</td><td></td><td></td><td>-2</td><td></td><td></td><td>-5 ft.</td></tr><tr><td>2</td><td></td><td></td><td>-4</td><td></td><td></td><td>-10 ft.</td></tr><tr><td>3</td><td></td><td></td><td>-6</td><td></td><td></td><td>-15 ft.</td></tr><tr><td>4</td><td></td><td></td><td>-8</td><td></td><td></td><td>-20 ft.</td></tr><tr><td>5</td><td></td><td></td><td>-10</td><td></td><td></td><td>-25 ft.</td></tr><tr><td>6</td><td></td><td></td><td>Death</td><td></td><td></td><td>Death</td></tr></table>",
            "This condition is cumulative. Each time you receive it, you gain 1 Exhaustion level. You die if your Exhaustion level is 6.",
            "Finishing a long rest reduces your exhaustion level by 1. When your Exhaustion level reaches 0, the condition ends."
        ]
    },
    {
        title: "Frightened",
        optional: "Standard rule",
        icon: "sharp-smile",
        subtitle: "Can't approach source",
        description: "You can't willingly approach the source of fear. While you can see it, your attacks and ability checks have Disadvantage.",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "You have Disadvantage on ability checks and attack rolls while the source of fear is within line of sight.",
            "You can't willingly move closer to the source of fear."
        ]
    },
    {
        title: "Grappled",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Speed 0; limited attacks",
        description: "Your Speed is 0. Attacks against anyone but the grappler have Disadvantage, and the grappler can drag or carry you.",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "Your speed is 0 and can't increase.",
            "You have Disadvantage on attack rolls against any target other than the grappler.",
            "The grappler can drag or carry you when it moves, but every foot of movement costs 1 extra foot unless you are Tiny or 2 or more sizes smaller."
        ]
    },
    {
        title: "Incapacitated",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "No actions or reactions",
        description: "You can't take actions, Bonus Actions, or Reactions, or speak. Concentration ends, and Initiative rolls have Disadvantage.",
        reference: "PHB'24, pg. 369.",
        bullets: [
            "Your Concentration is broken.",
            "You can't speak.",
            "You have Disadvantage on Initiative rolls."
        ]
    },
    {
        title: "Invisible",
        optional: "Standard rule",
        icon: "invisible",
        subtitle: "Unseen; attack advantage",
        description: "You have Advantage on Initiative. Against creatures that can't see you, your attacks have Advantage and their attacks have Disadvantage; sight-based targeting can't affect you.",
        reference: "PHB'24, pg. 370.",
        bullets: [
            "You have Advantage on Initiative rolls and attack rolls unless your target can somehow see you.",
            "Attack rolls against you have Disadvantage, unless your attacker can somehow see you",
            "You aren't affected by any effect that requires its target to be seen unless the effect's creator can somehow see you. Any equipment you are wearing or carrying is also concealed."
        ]
    },
    {
        title: "Paralyzed",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Incapacitated; speed 0",
        description: "You are Incapacitated, your Speed is 0, and you fail Strength/Dexterity saves. Attacks against you have Advantage; hits from within 5 ft. are critical.",
        reference: "PHB'24, pg. 371.",
        bullets: [
            "You have the Incapacitated condition.",
            "Your speed is 0 and can't increase.",
            "Attack rolls against you have Advantage and any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Petrified",
        optional: "Standard rule",
        icon: "stone-pile",
        subtitle: "Inert; resist all damage",
        description: "You and your nonmagical gear become an inert substance. You are Incapacitated with Speed 0, fail Strength/Dexterity saves, and resist all damage.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "Your weight increases by a factor of ten, and you cease aging.",
            "You have the Incapacitated condition.",
            "Your speed is 0 and can't increase.",
            "Attack rolls against you have Advantage.",
            "You automatically fail Strength and Dexterity saving throws.",
            "You have resistance to all damage.",
            "You have Immunity to the Poisoned condition."
        ]
    },
    {
        title: "Poisoned",
        optional: "Standard rule",
        icon: "deathcab",
        subtitle: "Attacks/checks: disadvantage",
        description: "Your attack rolls and ability checks have Disadvantage.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "You have Disadvantage on attack rolls and ability checks."
        ]
    },
    {
        title: "Prone",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Crawl; attack disadvantage",
        description: "Crawl or stand up; you can't stand with Speed 0. Your attacks have Disadvantage; attacks against you have Advantage from within 5 ft., otherwise Disadvantage.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "Your only movement option is to crawl, unless you stand up. If your speed is 0, you can't stand up.",
            "You have Disadvantage on attack rolls.",
            "Attack rolls against you have Advantage if the attacker is within 5 feet of you, otherwise the attack roll has Disadvantage."
        ]
    },
    {
        title: "Restrained",
        optional: "Standard rule",
        icon: "imprisoned",
        subtitle: "Speed 0; attack disadvantage",
        description: "Your Speed is 0. Your attacks and Dexterity saves have Disadvantage; attacks against you have Advantage.",
        reference: "PHB'24, pg. 373.",
        bullets: [
            "Your speed is 0 and can't increase.",
            "You have Disadvantage on attack rolls.",
            "Attack rolls against you have Advantage.",
            "You have Disadvantage on Dexterity saving throws."
        ]
    },
    {
        title: "Stunned",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Fail STR/DEX saves",
        description: "You are Incapacitated and automatically fail Strength/Dexterity saves. Attacks against you have Advantage; Stunned itself doesn't reduce Speed.",
        reference: "PHB'24, pg. 376.",
        bullets: [
            "You have the Incapacitated condition.",
            "Attack rolls against you have Advantage.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Unconscious",
        optional: "Standard rule",
        icon: "coma",
        subtitle: "Incapacitated; fall prone",
        description: "You are Incapacitated and Prone with Speed 0, drop held items, and fail Strength/Dexterity saves. Attacks against you have Advantage; hits from within 5 ft. are critical.",
        reference: "PHB'24, pg. 377.",
        bullets: [
            "You have the Incapacitated and Prone conditions and you drop whatever you're holding.",
            "Your speed is 0 and can't increase.",
            "Attack rolls against you have Advantage.",
            "Any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws.",
        ]
    },
    {
        title: "Dying",
        optional: "Standard rule",
        icon: "dead-head",
        subtitle: "0 HP; make death saves",
        description: "At 0 HP and not stable, make Death Saving Throws each turn: three successes stabilize you; three failures kill you. Healing ends dying.",
        reference: "PHB'24, pg. 197.",
        bullets: [
            "If you are reduced to 0 hit points by damage that fails to kill you, you fall unconscious and are dying.",
            "If you receive any healing you immediately regain consciousness and are no longer dying.",
            "When you start your turn with 0 hit points, you must make a Death Saving Throw without modifiers.",
            "10 or higher is a success, 9 or lower is a failure.",
            "On your third success, you become stable.",
            "On your third failure, you die.",
            "Rolling a 1 counts as two failures.",
            "Rolling a 20 immediately causes you to regain 1 hit point.",
            "If you take damage while dying, you suffer a failure. If it's from a critical hit, you suffer 2 failures.",
            "You can be stabilized by an ally taking the Help (Stabilize) action and succeeding on a DC 10 Wisdom (Medicine) check.",
            "Once stable, you are at 0 HP, still unconcious, but no longer dying. you regain 1 hit point after 1d4 hours if not healed."
        ]
    }
]

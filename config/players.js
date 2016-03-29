var players = {
    orc : {
        lineman : { mv : 5, st : 3, ag : 3, av : 9 },
        'black orc blocker' : { mv : 4, st : 4, ag : 2, av : 9 },
        goblin : { mv : 6, st : 2, ag : 3, av : 7 },
        thrower : { mv : 5, st : 3, ag : 3, av : 8 },
        blitzer : { mv : 6, st : 3, ag : 3, av : 9 }
    },
    human : {
        lineman : { mv : 6, st : 3, ag : 3, av : 8 },
        blitzer : { mv : 7, st : 3, ag : 3, av : 8 },
        thrower : { mv : 8, st : 2, ag : 3, av : 7 },
        catcher : { mv : 5, st : 3, ag : 3, av : 9 }
    }
}

module.exports = players;
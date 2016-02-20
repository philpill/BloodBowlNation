var data = require('../data/data');

function * all () {

    console.log('players', data.players);

    this.type = 'application/json';

    this.body = { 'foo' : 'bar' };
};

function PlayerFactory (name, race, position) {

    function create () {
        return {
            name : name,
            race : 'human',
            position : 'lineman'
        }
    }

    return {
        create : create
    }
}

function * create () {

    var body = this.request.body;

    var factory = new PlayerFactory(body.name, 'human', 'lineman');

    var data = factory.create();

    data.team = body.team;

    var player = yield data.players.insertAsync(data)
    .catch(function (error) {
        // stuff
    });

    this.type = 'application/json';

    this.status = player ? 200 : 500;

    this.body = player;
}

module.exports = {
    all : all,
    create : create
};

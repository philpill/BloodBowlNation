var data = require('../data/data');

function TeamFactory (name, race) {

    function getTeam () {

    }

    return {
      getTeam : getTeam
    }
}

function * create () {

    var data = this.request.body;

    var factory = new TeamFactory(data.name, data.race);

    var team = factory.getTeam();

    var team = yield data.teams.insertAsync(team)
    .then(function (team) {

        return team
    });

    this.body = 'thing'; 
}

module.exports = {
    create : create
};

var data = require('../data/data');

var team = {};

team.addPlayer = function * addPlayer (next) {

    console.log('teams', data.teams);

    // this.request.body

    this.type = 'application/json';

    this.body = yield { 'foo' : 'bar' };
};

module.exports = team;
var data = require('../data/data');

module.exports.all = function * all () {

    console.log('players', data.players);

    this.type = 'application/json';

    this.body = { 'foo' : 'bar' };
};
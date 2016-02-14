var data = require('../data/data');

module.exports.all = function * all (next) {

    console.log('players', data.players);

    this.body = yield { 'foo' : 'bar' };
};
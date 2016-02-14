var Datastore = require('nedb');
var wrap = require('co-nedb');
var Promise = require('bluebird');

Promise.promisifyAll(Datastore.prototype);

var data = {};

data.players = wrap(new Datastore({ filename: './db/players.db', autoload: true }));

module.exports = data;
var Datastore = require('nedb');

var Promise = require('bluebird');

Promise.promisifyAll(Datastore.prototype);

var data = {};

data.players = new Datastore({ filename: './db/players.db', autoload: true });

data.teams = new Datastore({ filename: './db/teams.db', autoload: true });

data.users = new Datastore({ filename: './db/users.db', autoload: true });

module.exports = data;
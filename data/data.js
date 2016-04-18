var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

function query (query, callback) {
    console.log(query);
    pg.connect(conn, function onConnect (err, client, done) {
        if (err) { callback(err); }
        client.query(query, function (err, result) {
            console.log(result);
            done();
            err ? callback(err) : callback(null, result);
        });
    });
}

module.exports = {
    query : Promise.promisify(query)
}
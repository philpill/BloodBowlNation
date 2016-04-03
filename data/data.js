var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

// var createQuery = 'DROP TABLE IF EXISTS "users" CASCADE; CREATE TABLE IF NOT EXISTS users(ID SERIAL PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL);';
var createQuery = 'CREATE TABLE IF NOT EXISTS users(ID SERIAL PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL);';

pg.connect(conn, function onConnect (err, client, done) {
    if (err) {
        console.log(err);
    }
    client.query(createQuery, function (err, result) {
        done();
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});





function query (query, callback) {
    console.log('query');
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
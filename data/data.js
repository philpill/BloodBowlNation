var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

//*
var createUserTable = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL);';
var createTeamTable = 'CREATE TABLE IF NOT EXISTS teams (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races(ID), managerId SERIAL REFERENCES users(ID));';
var createRaceTable = 'CREATE TABLE IF NOT EXISTS races (id SERIAL PRIMARY KEY, name TEXT NOT NULL);';
var createPositionTable = 'CREATE TABLE IF NOT EXISTS positions (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races(ID));';
var createPlayerTable = 'CREATE TABLE IF NOT EXISTS players (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races(ID), positionId SERIAL NOT NULL REFERENCES positions(ID), teamId SERIAL REFERENCES teams(ID));';
//*/
/*
var createUserTable = 'DROP TABLE IF EXISTS users CASCADE; CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL);';
var createTeamTable = 'DROP TABLE IF EXISTS teams CASCADE; CREATE TABLE IF NOT EXISTS teams (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races(ID), managerId SERIAL REFERENCES users(ID));';
var createRaceTable = 'DROP TABLE IF EXISTS races CASCADE; CREATE TABLE IF NOT EXISTS races (id SERIAL PRIMARY KEY, name TEXT NOT NULL);';
var createPositionTable = 'DROP TABLE IF EXISTS positions CASCADE; CREATE TABLE IF NOT EXISTS positions (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races(ID));';
var createPlayerTable = 'DROP TABLE IF EXISTS players CASCADE; CREATE TABLE IF NOT EXISTS players (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races(ID), positionId SERIAL NOT NULL REFERENCES positions(ID), teamId SERIAL REFERENCES teams(ID));';
//*/

pg.connect(conn, function onConnect (err, client, done) {

    if (err) { console.log(err); }

    client.query(createUserTable, function (err, result) {
        done();
        if (err) { console.log(err); }
    });
    client.query(createTeamTable, function (err, result) {
        done();
        if (err) { console.log(err); }
    });
    client.query(createRaceTable, function (err, result) {
        done();
        if (err) { console.log(err); }
    });
    client.query(createPositionTable, function (err, result) {
        done();
        if (err) { console.log(err); }
    });
    client.query(createPlayerTable, function (err, result) {
        done();
        if (err) { console.log(err); }
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
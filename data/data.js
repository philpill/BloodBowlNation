var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

var createUserTable = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);';
var createTeamTable = 'CREATE TABLE IF NOT EXISTS teams (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE, race SERIAL NOT NULL REFERENCES races, managerId SERIAL REFERENCES users);';
var createRaceTable = 'CREATE TABLE IF NOT EXISTS races (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);';
var createPositionTable = 'CREATE TABLE IF NOT EXISTS positions (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races, movement SMALLINT NOT NULL, strength SMALLINT NOT NULL, agility SMALLINT NOT NULL, armour SMALLINT NOT NULL);';
var createPlayerTable = 'CREATE TABLE IF NOT EXISTS players (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES races, positionId SERIAL NOT NULL REFERENCES positions(ID), teamId SERIAL REFERENCES teams);';

var populateRacesTable = `INSERT INTO races (name) VALUES ('human'),('orc') ON CONFLICT DO NOTHING;`

var populatePositionsTable = `
    INSERT INTO positions (name, race, movement, strength, agility, armour) VALUES ('lineman', (SELECT id FROM races WHERE name = 'human'), 6, 3, 3, 8) ON CONFLICT DO NOTHING;
    INSERT INTO positions (name, race, movement, strength, agility, armour) VALUES ('blitzer', (SELECT id FROM races WHERE name = 'human'), 7, 3, 3, 8) ON CONFLICT DO NOTHING;
    INSERT INTO positions (name, race, movement, strength, agility, armour) VALUES ('thrower', (SELECT id FROM races WHERE name = 'human'), 6, 3, 3, 8) ON CONFLICT DO NOTHING;
    INSERT INTO positions (name, race, movement, strength, agility, armour) VALUES ('catcher', (SELECT id FROM races WHERE name = 'human'), 8, 2, 3, 7) ON CONFLICT DO NOTHING;`;

pg.connect(conn, function onConnect (err, client, done) {

    if (err) { console.log(err); }
    //*
    client.query(createUserTable, function (err, result) {
        if (err) { console.log(err); }
    });
    client.query(createRaceTable, function (err, result) {
        if (err) { console.log(err); }

        client.query(populateRacesTable, function (err, result) {
            if (err) { console.log(err); }
        });

        client.query(createTeamTable, function (err, result) {
            if (err) { console.log(err); }
        });
        client.query(createPositionTable, function (err, result) {
            if (err) { console.log(err); }

            client.query(populatePositionsTable, function (err, result) {
                if (err) { console.log(err); }
            });

            client.query(createPlayerTable, function (err, result) {
                if (err) { console.log(err); }
            });
        });
    });

    done();

    // drop schema public cascade; create schema public;
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
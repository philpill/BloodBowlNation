var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

// http://stackoverflow.com/a/9790225
var create = `
    CREATE TABLE IF NOT EXISTS manager (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS race (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
    CREATE TABLE IF NOT EXISTS team (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE, race SERIAL NOT NULL REFERENCES race, manager SERIAL REFERENCES manager);
    CREATE TABLE IF NOT EXISTS position (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES race, movement SMALLINT NOT NULL, strength SMALLINT NOT NULL, agility SMALLINT NOT NULL, armour SMALLINT NOT NULL);
    CREATE TABLE IF NOT EXISTS skill (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
    CREATE TABLE IF NOT EXISTS position_skill (position_id SERIAL REFERENCES position ON UPDATE CASCADE ON DELETE CASCADE, skill_id SERIAL REFERENCES skill ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (position_id, skill_id));
    CREATE TABLE IF NOT EXISTS player (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES race, positionId SERIAL NOT NULL REFERENCES position, teamId SERIAL REFERENCES team);
    CREATE TABLE IF NOT EXISTS player_skill (player_id SERIAL REFERENCES player ON UPDATE CASCADE ON DELETE CASCADE, skill_id SERIAL REFERENCES skill ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (player_id, skill_id));
`;



var populate = `
    INSERT INTO race (name) VALUES ('human'),('orc') ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour) VALUES ('lineman', (SELECT id FROM race WHERE name = 'human'), 6, 3, 3, 8) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour) VALUES ('blitzer', (SELECT id FROM race WHERE name = 'human'), 7, 3, 3, 8) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour) VALUES ('thrower', (SELECT id FROM race WHERE name = 'human'), 6, 3, 3, 8) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour) VALUES ('catcher', (SELECT id FROM race WHERE name = 'human'), 8, 2, 3, 7) ON CONFLICT DO NOTHING;`;

pg.connect(conn, function onConnect (err, client, done) {

    if (err) { console.log(err); }

    client.query(create, function (err, result) {
        if (err) { console.log(err); }

        client.query(populate, function (err, result) {
            if (err) { console.log(err); }

            done();
        });
    });

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
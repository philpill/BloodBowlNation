var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

// http://stackoverflow.com/a/9790225
var create = `
    CREATE TABLE IF NOT EXISTS manager (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS race (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
    CREATE TABLE IF NOT EXISTS team (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE, race SERIAL NOT NULL REFERENCES race, manager SERIAL REFERENCES manager);
    CREATE TABLE IF NOT EXISTS position (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES race, movement SMALLINT NOT NULL, strength SMALLINT NOT NULL, agility SMALLINT NOT NULL, armour SMALLINT NOT NULL, cost INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS skill (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
    CREATE TABLE IF NOT EXISTS position_skill (position_id INT REFERENCES position ON UPDATE CASCADE ON DELETE CASCADE, skill_id INT REFERENCES skill ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (position_id, skill_id));
    CREATE TABLE IF NOT EXISTS player (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES race, positionId SERIAL NOT NULL REFERENCES position, teamId SERIAL REFERENCES team);
    CREATE TABLE IF NOT EXISTS player_skill (player_id SERIAL REFERENCES player ON UPDATE CASCADE ON DELETE CASCADE, skill_id SERIAL REFERENCES skill ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (player_id, skill_id));
`;



var populate = `
    DO $$
    DECLARE orcid INTEGER;
    DECLARE humanid INTEGER;
    DECLARE blockid INTEGER;
    DECLARE catchid INTEGER;
    DECLARE dodgeid INTEGER;
    DECLARE humanblitzerid INTEGER;
    DECLARE humancatcherid INTEGER;
    BEGIN

    INSERT INTO race (name) VALUES ('orc') ON CONFLICT DO NOTHING RETURNING id INTO orcid;
    INSERT INTO race (name) VALUES ('human') ON CONFLICT DO NOTHING RETURNING id INTO humanid;

    INSERT INTO skill (name) VALUES ('block') ON CONFLICT DO NOTHING RETURNING id INTO blockid;
    INSERT INTO skill (name) VALUES ('catch') ON CONFLICT DO NOTHING RETURNING id INTO catchid;
    INSERT INTO skill (name) VALUES ('dodge') ON CONFLICT DO NOTHING RETURNING id INTO dodgeid;
    INSERT INTO skill (name) VALUES ('sure hands') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('pass') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('right stuff') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('stunty') ON CONFLICT DO NOTHING;

    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('lineman', (SELECT id FROM race WHERE name = 'orc'), 5, 3, 3, 9, 50000) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('goblin', (SELECT id FROM race WHERE name = 'orc'), 6, 2, 3, 7, 40000) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('thrower', (SELECT id FROM race WHERE name = 'orc'), 5, 3, 3, 8, 70000) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('black orc blocker', (SELECT id FROM race WHERE name = 'orc'), 4, 4, 2, 9, 80000) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('blitzer', (SELECT id FROM race WHERE name = 'orc'), 6, 3, 3, 9, 80000) ON CONFLICT DO NOTHING;

    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('lineman', (SELECT id FROM race WHERE name = 'human'), 6, 3, 3, 8, 50000) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('blitzer', (SELECT id FROM race WHERE name = 'human'), 7, 3, 3, 8, 90000) ON CONFLICT DO NOTHING RETURNING id INTO humanblitzerid;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('thrower', (SELECT id FROM race WHERE name = 'human'), 6, 3, 3, 8, 70000) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost) VALUES ('catcher', (SELECT id FROM race WHERE name = 'human'), 8, 2, 3, 7, 70000) ON CONFLICT DO NOTHING RETURNING id INTO humancatcherid;

    INSERT INTO position_skill (position_id, skill_id) VALUES (humanblitzerid, blockid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position_id, skill_id) VALUES (humancatcherid, catchid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position_id, skill_id) VALUES (humancatcherid, dodgeid) ON CONFLICT DO NOTHING;

    END $$;
`;

// SELECT skill.name FROM skill, position, position_skill WHERE position.name LIKE 'catcher' AND position.id = position_skill.position_id AND skill.id = position_skill.skill_id;

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
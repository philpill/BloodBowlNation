var pg = require('pg');

var Promise = require('bluebird');

var conn = 'postgres://philpill@localhost:5432/philpill';

// var destroy = 'DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;';
// var destroy = 'DROP TABLE IF EXISTS race, team, player, skill, position CASCADE;';
var destroy = 'DROP TABLE IF EXISTS team, player CASCADE;';

// http://stackoverflow.com/a/9790225
var create = `
    DO $$
    BEGIN
    CREATE TABLE IF NOT EXISTS manager (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, createdDate TIMESTAMP WITH TIME ZONE NOT NULL);
    CREATE TABLE IF NOT EXISTS race (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
    CREATE TABLE IF NOT EXISTS team (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE, race SERIAL NOT NULL REFERENCES race, manager SERIAL REFERENCES manager, treasury INT NOT NULL, createdDate TIMESTAMP WITH TIME ZONE NOT NULL);
    CREATE TABLE IF NOT EXISTS position (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES race, movement SMALLINT NOT NULL, strength SMALLINT NOT NULL, agility SMALLINT NOT NULL, armour SMALLINT NOT NULL, cost INT NOT NULL, quantity INT NOT NULL);
    CREATE TABLE IF NOT EXISTS skill (id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE);
    CREATE TABLE IF NOT EXISTS position_skill (position INT REFERENCES position ON UPDATE CASCADE ON DELETE CASCADE, skill INT REFERENCES skill ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (position, skill));
    CREATE TABLE IF NOT EXISTS player (id SERIAL PRIMARY KEY, name TEXT NOT NULL, race SERIAL NOT NULL REFERENCES race, position SERIAL NOT NULL REFERENCES position, team SERIAL REFERENCES team, createdBy SERIAL NOT NULL REFERENCES manager, createdDate TIMESTAMP WITH TIME ZONE NOT NULL);
    CREATE TABLE IF NOT EXISTS player_skill (player SERIAL REFERENCES player ON UPDATE CASCADE ON DELETE CASCADE, skill SERIAL REFERENCES skill ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (player, skill));
    END $$;
`;

var populate = `
    DO $$
    DECLARE orcid INT;
    DECLARE humanid INT;
    DECLARE blockid INT;
    DECLARE catchid INT;
    DECLARE dodgeid INT;
    DECLARE passid INT;
    DECLARE surehandsid INT;
    DECLARE rightstuffid INT;
    DECLARE stuntyid INT;
    DECLARE lonerid INT;
    DECLARE boneheadid INT;
    DECLARE mightyblowid INT;
    DECLARE thickskullid INT;
    DECLARE throwteammateid INT;
    DECLARE alwayshungryid INT;
    DECLARE reallystupidid INT;
    DECLARE regenerationid INT;
    DECLARE humanblitzerid INT;
    DECLARE humancatcherid INT;
    DECLARE humanthrowerid INT;
    DECLARE humanogreid INT;
    DECLARE orcthrowerid INT;
    DECLARE orcblitzerid INT;
    DECLARE orcgoblinid INT;
    DECLARE orctrollid INT;
    BEGIN

    INSERT INTO race (name) VALUES ('orc') ON CONFLICT DO NOTHING;
    INSERT INTO race (name) VALUES ('human') ON CONFLICT DO NOTHING;

    INSERT INTO skill (name) VALUES ('block') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('catch') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('dodge') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('sure hands') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('pass') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('right stuff') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('stunty') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('loner') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('bonehead') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('mightyblow') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('thickskull') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('throwteammate') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('alwayshungry') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('reallystupid') ON CONFLICT DO NOTHING;
    INSERT INTO skill (name) VALUES ('regeneration') ON CONFLICT DO NOTHING;

    SELECT race.id INTO orcid FROM race WHERE name = 'orc';
    SELECT race.id INTO humanid FROM race WHERE name = 'human';

    SELECT skill.id INTO blockid FROM skill WHERE name = 'block';
    SELECT skill.id INTO catchid FROM skill WHERE name = 'catch';
    SELECT skill.id INTO dodgeid FROM skill WHERE name = 'dodge';
    SELECT skill.id INTO surehandsid FROM skill WHERE name = 'sure hands';
    SELECT skill.id INTO passid FROM skill WHERE name = 'pass';
    SELECT skill.id INTO rightstuffid FROM skill WHERE name = 'right stuff';
    SELECT skill.id INTO stuntyid FROM skill WHERE name = 'stunty';
    SELECT skill.id INTO lonerid FROM skill WHERE name = 'loner';
    SELECT skill.id INTO boneheadid FROM skill WHERE name = 'bonehead';
    SELECT skill.id INTO mightyblowid FROM skill WHERE name = 'mightyblow';
    SELECT skill.id INTO thickskullid FROM skill WHERE name = 'thickskull';
    SELECT skill.id INTO throwteammateid FROM skill WHERE name = 'throwteammate';
    SELECT skill.id INTO alwayshungryid FROM skill WHERE name = 'alwayshungry';
    SELECT skill.id INTO reallystupidid FROM skill WHERE name = 'reallystupid';
    SELECT skill.id INTO regenerationid FROM skill WHERE name = 'regeneration';

    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('lineman', orcid, 5, 3, 3, 9, 50000, 16) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('black orc blocker', orcid, 4, 4, 2, 9, 80000, 4) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('goblin', orcid, 6, 2, 3, 7, 40000, 4) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('thrower', orcid, 5, 3, 3, 8, 70000, 2) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('blitzer', orcid, 6, 3, 3, 9, 80000, 4) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('troll', orcid, 4, 5, 1, 9, 110000, 1) ON CONFLICT DO NOTHING;

    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('lineman', humanid, 6, 3, 3, 8, 50000, 16) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('blitzer', humanid, 7, 3, 3, 8, 90000, 4) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('thrower', humanid, 6, 3, 3, 8, 70000, 2) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('catcher', humanid, 8, 2, 3, 7, 70000, 4) ON CONFLICT DO NOTHING;
    INSERT INTO position (name, race, movement, strength, agility, armour, cost, quantity) VALUES ('ogre', humanid, 5, 5, 2, 9, 140000, 1) ON CONFLICT DO NOTHING;

    SELECT position.id INTO orcgoblinid FROM position WHERE name = 'goblin' AND race = orcid;
    SELECT position.id INTO orcthrowerid FROM position WHERE name = 'thrower' AND race = orcid;
    SELECT position.id INTO orcblitzerid FROM position WHERE name = 'blitzer' AND race = orcid;
    SELECT position.id INTO orctrollid FROM position WHERE name = 'troll' AND race = orcid;

    SELECT position.id INTO humanblitzerid FROM position WHERE name = 'blitzer' AND race = humanid;
    SELECT position.id INTO humanthrowerid FROM position WHERE name = 'thrower' AND race = humanid;
    SELECT position.id INTO humancatcherid FROM position WHERE name = 'catcher' AND race = humanid;
    SELECT position.id INTO humanogreid FROM position WHERE name = 'ogre' AND race = humanid;

    INSERT INTO position_skill (position, skill) VALUES (humanblitzerid, blockid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humancatcherid, catchid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humancatcherid, dodgeid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanthrowerid, passid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanthrowerid, surehandsid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanogreid, lonerid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanogreid, boneheadid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanogreid, mightyblowid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanogreid, thickskullid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (humanogreid, throwteammateid) ON CONFLICT DO NOTHING;

    INSERT INTO position_skill (position, skill) VALUES (orcthrowerid, passid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orcthrowerid, surehandsid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orcgoblinid, stuntyid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orcgoblinid, dodgeid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orcgoblinid, rightstuffid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orcblitzerid, blockid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orctrollid, lonerid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orctrollid, alwayshungryid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orctrollid, mightyblowid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orctrollid, reallystupidid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orctrollid, regenerationid) ON CONFLICT DO NOTHING;
    INSERT INTO position_skill (position, skill) VALUES (orctrollid, throwteammateid) ON CONFLICT DO NOTHING;

    END $$;
`;

// SELECT skill.name FROM skill, position, position_skill WHERE position.name LIKE 'catcher' AND position.id = position_skill.position AND skill.id = position_skill.skill;

pg.connect(conn, function onConnect (err, client, done) {

    if (err) { console.log(err); }

    client.query(destroy);

    client.query(create, function (err, result) {
        if (err) { console.log(err); }

        client.query(populate, function (err, result) {
            if (err) { console.log(err); }

            done();
        });
    });
});





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
var pg = require('pg');
var fs = require('fs');

var conn = 'postgres://philpill@localhost:5432/philpill';

var destroy = fs.readFileSync('./db/destroy.sql').toString();

// http://stackoverflow.com/a/9790225
var create = fs.readFileSync('./db/create.sql').toString();

var populate = fs.readFileSync('./db/populate.sql').toString();

// SELECT skill.name FROM skill, position, position_skill WHERE position.name LIKE 'catcher' AND position.id = position_skill.position AND skill.id = position_skill.skill;

console.log('db reset initialized');
pg.connect(conn, function onConnect (err, client, done) {

    if (err) { console.log(err); }

    client.query(destroy);
    console.log('db destroyed');

    client.query(create, function (err, result) {
        if (err) { console.log(err); }
        console.log('db tables created');


        client.query(populate, function (err, result) {
            if (err) { console.log(err); }
            console.log('db tables populated');

            console.log('db reset complete');
            done();
            process.exit();
        });
    });
});


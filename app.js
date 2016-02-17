var app = require('koa')();
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var users = require('./controllers/users');

app.use(bodyParser());

router.get('/players', players.all);

router.post('/teams/:id/player', teams.addPlayer);

router.post('/users', users.createUser);

router.post('/authentication', auth.authenticate);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
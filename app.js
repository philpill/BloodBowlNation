var koa = require('koa');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');

var players = require('./controllers/players');
var teams = require('./controllers/teams');
var users = require('./controllers/users');

var app = koa();

app.use(bodyParser());

router.get('/players', players.all);

router.post('/teams/:id/player', teams.addPlayer);

router.post('/users', users.createUser);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
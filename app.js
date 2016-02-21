var app = require('koa')();
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var users = require('./controllers/users');

app.use(bodyParser());

router.post('/players', players.create);

router.post('/teams', teams.create);

router.post('/users', users.create);

router.post('/authentication/login', auth.login);

router.post('/authentication/signup', auth.signup);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

var app = require('koa')();
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');

var cors = require('kcors');
app.use(cors());

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var users = require('./controllers/users');

app.use(bodyParser());

router.post('/players', players.create);

router.post('/teams', teams.create);

router.post('/users', users.create);

router.post('/login', auth.login);

router.post('/register', auth.register);

router.post('/authenticate', auth.authenticate);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

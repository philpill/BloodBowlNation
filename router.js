var router = require('koa-router')();

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var users = require('./controllers/users');

router.post('/players', players.create);

router.post('/teams', teams.create);

router.post('/users', users.create);

router.post('/login', auth.login);

router.post('/register', auth.register);

router.post('/authenticate', auth.authenticate);

router.post('/identify', auth.identify);


module.exports = router;
var router = require('koa-router');

var public = new router();

var private = new router();

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var users = require('./controllers/users');

public.post('/login', auth.login);

public.post('/register', auth.validateRegister, auth.register);

public.get('/teams', teams.getAll);

public.get('/teams/:teamId', teams.getById);


private.post('/authenticate', auth.authenticate);

private.post('/identify', auth.identify);

private.post('/players/:playerId', players.getById);

private.post('/teams', teams.validateCreate, teams.create);



module.exports = {
    public : public,
    private : private
};
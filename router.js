var router = require('koa-router');

var publicRoutes = new router();

var privateRoutes = new router();

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var races = require('./controllers/races');
var users = require('./controllers/users');

publicRoutes.post('/login', auth.login);

publicRoutes.post('/register', auth.validateRegister, auth.register);

publicRoutes.get('/teams', teams.getAll);

publicRoutes.get('/races', races.getAll);

publicRoutes.get('/teams/:teamId', teams.getById);


privateRoutes.post('/authenticate', auth.authenticate);

privateRoutes.post('/identify', auth.identify);

privateRoutes.post('/players/:playerId', players.getById);

privateRoutes.post('/teams', teams.validateCreate, teams.create);

privateRoutes.post('/teams/:teamId', teams.validateAddNewPlayer, teams.addNewPlayer);



module.exports = {
    publicRoutes : publicRoutes,
    privateRoutes : privateRoutes
};
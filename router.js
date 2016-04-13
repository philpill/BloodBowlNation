var router = require('koa-router');

var publicRoutes = new router();

var privateRoutes = new router();

var auth = require('./controllers/authentication');
var players = require('./controllers/players');
var teams = require('./controllers/teams');
var races = require('./controllers/races');
var users = require('./controllers/users');
var positions = require('./controllers/positions');

publicRoutes.post('/login', auth.login);

publicRoutes.post('/register', auth.validateRegister, auth.register);

publicRoutes.get('/teams', teams.getAll);

publicRoutes.get('/races', races.getAll);

publicRoutes.get('/positions', positions.getAllPositions);

publicRoutes.get('/teams/:teamId', teams.getById);

publicRoutes.get('/teams/:teamId/players', players.getPlayersByTeamId);



privateRoutes.post('/authenticate', auth.authenticate);

privateRoutes.post('/identify', auth.identify);

privateRoutes.post('/players/:playerId', players.getById);

privateRoutes.post('/teams', teams.validateCreate, teams.create);

privateRoutes.post('/teams/:teamId/player', players.validateAddNewPlayer, players.addNewPlayer);




module.exports = {
    publicRoutes : publicRoutes,
    privateRoutes : privateRoutes
};
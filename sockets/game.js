
(function(req) {

	var Game = req('../objects/Game');
	var Player = req('../objects/Player');
	var Team = req('../objects/Team');

	function init(socket) {

		console.log('game.init()');

		var game = new Game();

		game.init();

		socket.emit('log', game);
	}

	module.exports.init = init;

})(require);

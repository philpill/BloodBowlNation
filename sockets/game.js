
(function(req) {

	var Game = req('../objects/Game');

	function init(socket) {

		console.log('game.init()');

		var game = new Game();

		socket.emit('log', game);

		game.init();
	}

	module.exports.init = init;

})(require);
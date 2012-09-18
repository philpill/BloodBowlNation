
(function(req) {

	var game = req('./game');
	var team = req('./team');
	var player = req('./player');

	function connect(sockets) {
		sockets.on('connection', init);
	}

	function init(socket) {
		socket.emit('init', 'Hello Blood Bowl fans!');

		game.init(socket);
		team.init(socket);
		player.init(socket);
	}

	module.exports.connect = connect;

})(require);
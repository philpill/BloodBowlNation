
(function(req) {

	function init(socket) {
		socket.emit('init', 'game.init()');
		console.log('game.init()');
	}

	module.exports.init = init;

})(require);
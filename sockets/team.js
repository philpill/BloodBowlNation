
(function(req) {

	function init(socket) {
		socket.emit('init', 'team.init()');
		console.log('team.init()');
	}

	module.exports.init = init;

})(require);
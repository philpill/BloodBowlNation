
(function(req) {

	function init(socket) {
		socket.emit('init', 'player.init()');
		socket.on('player.move', onPlayerMove);
		socket.on('player.block', onPlayerBlock);
		socket.on('player.pickupBall', onPlayerPickupBall);
		socket.on('player.throwBall', onPlayerThrowBall);
	}

	function onPlayerMove(data) {
		console.log(data);
		console.log('move');
	}

	function onPlayerBlock(data) {
		console.log(data);
		console.log('block');
	}

	function onPlayerPickupBall(data) {
		console.log(data);
		console.log('pickupBall');
	}

	function onPlayerThrowBall(data) {
		console.log(data);
		console.log('throwBall');
	}

	module.exports.init = init;

})(require);
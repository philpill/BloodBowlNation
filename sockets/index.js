
var player = require('./player');

module.exports.bindEvents = function(sockets){

	sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'bloodbowlnation' });
		socket.on('my other event', function (data) {
			console.log(data);
			player.move();
		});
	});
}
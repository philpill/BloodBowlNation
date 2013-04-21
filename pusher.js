(function(req){

	var Pusher = req('pusher');
	var config = req('./config.js');

	module.exports = new Pusher({
		appId: config.pusher.id,
		key: config.pusher.key,
		secret: config.pusher.secret
	});

}(require));

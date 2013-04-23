requirejs.config({
	baseUrl: '/',
	paths: {
		js: '/js',
		lib: '/js/lib',
		jquery: '/js/lib/jquery-2.0.0.min',
		pusher: '/js/lib/pusher.min',
		underscore: '/js/lib/underscore-min'
	}
});

requirejs(['jquery', 'underscore', 'pusher', 'js/game'], function($, _, pusher, game){
	
	console.log('bbn');

	WEB_SOCKET_DEBUG = true;

	var pusher = new Pusher('4dd229412fb33d54de7c');

	var channel = pusher.subscribe('test_channel');
    channel.bind('test_event', function(data) {
		console.log(data);
    });

	channel.trigger("client-trigger", { client: 'client' });

	game.init();
});

requirejs.config({
	baseUrl: '/',
	paths: {
		js: '/js',
		lib: '/js/lib',
		jquery: '/js/lib/jquery-2.0.0.min',
		pusher: '/js/lib/pusher.min'
	}
});

requirejs(['jquery', 'pusher'], function($){

	console.log('bbn');

	WEB_SOCKET_DEBUG = true;

	var pusher = new Pusher('e67e6af24a68875be966');

	var channel = pusher.subscribe('test_channel');
    channel.bind('test_event', function(data) {
		console.log(data);
    });

	return {
		
		test: 'test'
	}

});

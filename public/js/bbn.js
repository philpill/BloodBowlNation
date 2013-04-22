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

	var pusher = new Pusher('d3ad66f3eb116013654a');

	var channel = pusher.subscribe('test_channel');
    channel.bind('test_event', function(data) {
		console.log(data);
    });

	channel.trigger("client-trigger", { client: 'client' });

	return {
		
		test: 'test'
	}

});

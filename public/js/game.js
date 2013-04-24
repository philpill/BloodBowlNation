define(['jquery'], function($){
	
	console.log('game');

	return {
		init: function() {
			console.log('game.init()');
			$.when($.ajax('/api/user'))
			.then(function(data){
				console.log(data);
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				console.log(textStatus + ': ' + errorThrown);
			});

			$.when($.ajax('/api/user/' + local.user.id + '/game'))
			.then(function(data){
				console.log(data);
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				console.log(textStatus + ': ' + errorThrown);
			});
		}
	}
});

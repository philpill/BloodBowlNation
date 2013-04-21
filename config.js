(function(req) {
	
	var config = req('./config.heroku');
	
	//var config = req('./config.local');

	console.log(config);

	module.exports = config;
})(require);

(function(req) {
	
	var config = req('./config.heroku');
	
	//var config = req('./config.local');

	module.exports = config;
})(require);

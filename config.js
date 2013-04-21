(function(req) {

	/* The Heroku config uses environment variables
	 * set within Heroku, using config:set
	 * or if using foreman for local Heroku then 
	 * set using .env for default, local settings,
	 * or heroku.env for remote settings.
	 */ 

	// http://ddollar.github.io/foreman/#ENVIRONMENT

	// https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application

	var config = req('./config.heroku');
	
	//var config = req('./config.local');

	module.exports = config;

})(require);

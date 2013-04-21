(function(req) {

	var user = '';
	var pass = '';
	var url = '';
	var db = '';
	var port = '';

	console.log(process.env);

	//Heroku sets web app port by default to 5000
	appPort = process.env.PORT;

	/* Remote Mongo env vars are user-defined by CLI
	 * or by .env files on local usiung foreman
	 */
	port = process.env.mongo_port;
	user = process.env.mongo_user;
	pass = process.env.mongo_pass;
	url = process.env.mongo_url;
	db = process.env.mongo_db;
	
	//heroku config:set mongo_user=user
	//https://devcenter.heroku.com/articles/nodejs#setting-node-env

	var config = { 
		database: {
			url: url,
			port: port,
			user: user,
			pass: pass,
			db: db
		},
		app: {
			port: appPort,
			secret: '7bqMLyN767Ga7djMjT6S'
		},
		pusher: {
			id: '42184',
			key: 'd3ad66f3eb116013654a',
			secret: '51741d0fa2e4695233a1'
		}
	}
	module.exports = config;
})(require);

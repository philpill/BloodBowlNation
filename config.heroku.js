(function(req) {

	var user = '';
	var pass = '';
	var url = '';
	var db = '';
	var port = '';

	//Heroku sets web app port by default to 5000
	var appPort = process.env.PORT;

	/* Remote Mongo env vars are user-defined by CLI
	 * or by .env files on local usiung foreman
	 */
	var port = process.env.mongo_port;
	var user = process.env.mongo_user;
	var pass = process.env.mongo_pass;
	var url = process.env.mongo_url;
	var db = process.env.mongo_db;
	
	//Pusher
	var pusherId = process.env.pusher_id;
	var pusherKey = process.env.pusher_key;
	var pusherSecret = process.env.pusher_secret;

	//Express
	var expressSecret = process.env.express_secret;	

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
			secret: expressSecret
		},
		pusher: {
			id: pusherId,
			key: pusherKey,
			secret: pusherSecret
		}
	}
	module.exports = config;
})(require);

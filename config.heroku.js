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
	
	//Pusher
	pusherId = process.env.pusher_id;
	pusherKey = process.env.pusher_key;
	pusherSecret = process.env.pusher_secret;

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
			secret: 
		},
		pusher: {
			id: pusherId,
			key: pusherKey,
			secret: pusherSecret
		}
	}
	module.exports = config;
})(require);

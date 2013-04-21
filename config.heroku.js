(function(req) {

	var user = '';
	var pass = '';
	var url = '';
	var db = '';
	var port = '';

	console.log(process.env);

	appPort = process.env.PORT;
		
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
			port: appPort
		}
	}
	module.exports = config;
})(require);

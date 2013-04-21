(function(req) {

	var appPort = process.env.PORT; 

	var config = { 
		database: {
			url: 'alex.mongohq.com',
			port: '10015',
			user: 'admin',
			pass: 'admin',
			db: 'app6556230'
		},
		app: {
			port: appPort 
		}
	}
	module.exports = config;
})(require);

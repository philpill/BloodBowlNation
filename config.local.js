(function(req) {
	var config = { 
		database: {
			url: 'localhost',
			port: '27017',
			user: '',
			pass: '',
			db: 'bbn'
		},
		app: {
			secret: '4d84rWuEMaWXSPVnAF4t', 
			port: '3000'
		},
		pusher: {
			id: '42184',
			key: 'd3ad66f3eb116013654a',
			secret: '51741d0fa2e4695233a1'
		}
	}
	module.exports = config;
})(require);

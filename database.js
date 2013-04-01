
(function(req) {

	var mysql = req('mysql');
	var config = req('./config');
	var pool = mysql.createPool({
		host : config.database.host,
		user : config.database.user,
		database : config.database.name,
		password : config.database.password,
		waitForConnections : config.database.waitForConnections,
		connectionLimit : config.database.connectionLimit
	});

	module.exports = {
		execute : function(query, callback) {
			console.log('\nQUERY: ' + query + '\n');	
			pool.getConnection(function(err, connection){
				if (err) console.log('\nERROR:' + err + '\n');
				connection.query(query, function(err, results) {
					callback(err, results);
					connection.end();
				});
			});
		}
	}

})(require);

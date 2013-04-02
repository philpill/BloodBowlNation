
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

	function execute(query, args, callback) {
		console.log('\nQUERY: ' + query + '\n');	
		pool.getConnection(function(err, connection){
			if (err) console.log('\nERROR:' + err + '\n');
			connection.query(query, args, function(err, results) {
				if (callback) {
					callback(err, results);
				}
				connection.end();
			});
		});
	}

	module.exports = {
		execute : execute,
		user : {
			get : function(id, callback) {
				execute('SET @id = "?"; EXECUTE get_user USING @id;', [id], callback);
			},
			getByUsername : function(username, callback) {
				execute('SET @username = ?"; EXECUTE get_user_by_username USING @username;', [username], callback);
			}
		}
	}

})(require);

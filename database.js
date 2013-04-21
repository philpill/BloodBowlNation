
(function(req) {


	var mongoose = req('mongoose');

	//var uri = "mongodb://localhost/bbn";
	
	var username = 'admin';

	var password = 'admin';

	var uri = "mongodb://" + username + ":" + password + "@alex.mongohq.com:10015/app6556230";

	mongoose.connect(uri);

	var connection = mongoose.createConnection(uri);

	connection.on("open", function(){

		console.log("Connection opened to mongodb at %s", uri);
	});

	connection.on("error", console.error.bind(console, "connection error:"));

})(require);

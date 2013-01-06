
(function(req) {


	var mongoose = req('mongoose');

	var uri = 'mongodb://localhost/bbn';

	var connection = mongoose.createConnection(uri);

	connection.on("open", function(){

		console.log("Connection opened to mongodb at %s", uri);
	});

	connection.on("error", console.error.bind(console, "connection error:"));

	mongoose.connect(uri);


})(require);
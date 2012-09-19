(function(req) {

	module.exports = function () {

		return {

			test : 'rawr',
			init : function() {

				console.log('Game.init()');
			}
		};
	};

})(require);
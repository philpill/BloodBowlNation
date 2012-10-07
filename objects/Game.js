
(function(req) {

	var Player = req('../objects/Player');
	var Team = req('../objects/Team');
	var config = req('../config');

	module.exports = function () {

		function generateTeams() {
			console.log('generateTeams()');
			var player, i, team1, team2, players1, players2;
			players1 = [];
			players2 = [];
			team1 = new Team("Reikland Reavers");
			team2 = new Team("Orcland Raiders");
			team1.colours = ["rgba(150,150,255,1)","rgba(255,255,255,1)"];
			team2.colours = ["rgba(200,100,100,1)"];
			for (i = 0; i < 11; i++) {
				players1.push(new Player("human" + i, i+1, 'human', config.attributes.human.lineman));
			}
			team1.players = players1;
			for (i = 0; i < 11; i++) {
				players2.push(new Player("orc" + i, i+1, 'orc', config.attributes.orc.lineman));
			}
			team2.players = players2;
			return [team1, team2];
		}

		return {

			test : 'rawr',
			teams : [],
			init : function() {

				console.log('Game.init()');

				this.teams = generateTeams();
			}
		};
	};

})(require);
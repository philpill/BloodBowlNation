
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.user);
	res.render('index', { title: 'BloodBowlNation', user: req.user });
};

exports.test = function(req, res){
	res.render('test', { title: 'BloodBowlNation Unit Tests' });
};

exports.about = function(req, res) {
  res.render('about', { title: 'BloodBowlNation: About' });
};

exports.game = function(req, res) {
  res.render('game', { title: 'BloodBowlNation: Game' });
};

exports.login = function(req, res) {
  res.render('login', { title: 'BloodBowlNation: Login' });
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.userLogin = function(req, res) {
	console.log('login');
	res.redirect('/');
};

exports.team = function(req, res) {

	var teamIds = req.user.teams;



	res.render('team', { title: 'BloodBowlNation: Team' });
};

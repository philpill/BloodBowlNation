
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BloodBowlNation' });
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
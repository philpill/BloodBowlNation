
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BloodBowlNation' })
};

exports.test = function(req, res){
  res.render('test', { title: 'BloodBowlNation Unit Tests' })
};
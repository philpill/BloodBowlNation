var mongoose = require('mongoose');
var User = require('../schema/user');
var passport = require('passport');

exports.loginPost = function(req, res) {
	console.log('login');
	res.redirect('/');
};

exports.loginGet = function(req, res) {
	var user = req.user;
	res.render('login', { title: 'BloodBowlNation: Login', user: user });
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.get = function(req, res) {
    var currentUser = req.user;
    var userId = req.params.id;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(401);
    User.findById(userId)
    .exec(function(err, user){
        if(err) res.send(500, {error: err});
        res.render('user', {
            title: 'BloodBowlNation: Player',
            currentUser: currentUser,
            user: user
        });
    });
};

exports.getAll = function(req, res) {
	var user = req.user;
	if (!user) res.redirect('/login');
    if (user.username!=='admin') res.send(401);
    User.find()
    .exec(function(err, users){
        if (err) res.send(500, {error: err});
        res.render('admin/users', {
            title: 'BloodBowlNation: Admin: Users',
            user: user,
            users: users
        });
    });
};

exports.createGet = function(req, res) {
    var user = req.user; 
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(401);
    res.render('newUser', {
        title: 'BloodBowlNation: Players',
        user: user
    });
};

exports.createPost = function(req, res) {
    var user = req.user; 
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(401);
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;    
    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.save(function(err){
        if (err) res.send(500, {error:err});
        res.redirect('/admin/user');
    });
};


var jwt = require('jsonwebtoken');
var data = require('..data/data');
var Promise = require('bluebird');

function signup () {

    var token = {};



    return token ? Promise.resolve(token) : Promise.reject('signup failed');
}


function login () {

    var token = {};

    return token ? Promise.resolve(token) : Promise.reject('login failed');
}


module.exports = {

    signup : signup,
    login : login
};

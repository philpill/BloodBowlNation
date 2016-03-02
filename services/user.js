var db = require('../data/data').users;

function addNewUser (email, hash) {
    return db.insert({
        email : email,
        password : hash
    });
}

function getUserByEmail (email) {
    return db.findOne({ email : email });
}

function getUserById (id) {
    return db.findOne({ _id : id });
}

module.exports = {
    addNewUser : addNewUser,
    getUserByEmail : getUserByEmail,
    getUserById : getUserById
};
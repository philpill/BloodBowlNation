var query = require('./data').query;

/**
 * Create a new user in the db
 * @param {string} email Email address of new user
 * @param {string} hash Password hash of new user
 * @returns {Promise}
 */
function addNewUser (name, email, hash) {
    let ps = { name : 'addNewUser', text : 'INSERT INTO manager (name, email, password) VALUES ($1, $2, $3) RETURNING *', values : [name, email, hash] };
    return query(ps).then((results) => {
        if (!results || results.rows.length !== 1) {
            throw new Error('add new user failed');
        }
        return results.rows[0];
    });
}

/**
 * Get user by email address
 * @param {string} email Email address to search for user
 * @returns {Promise}
 */
function getUserByEmail (email) {
    let ps = { name : 'getUserbyEmail', text : 'SELECT * FROM manager WHERE email = $1', values : [email] };
    return query(ps).then((results) => {
        if (!results || results.rows.length > 1) {
            throw new Error('get user by email failed');
        }
        return results.rows[0];
    });
}

/**
 * Get all users
 * @returns {Promise}
 */
function getAllUsers () {
    let ps = { name: 'getAllUsers', text: 'SELECT * FROM manager' };
    return query(ps).then((results) => {
        return results.rows;
    });
}

/**
 * Get user by user id
 * @param {Number} id User id
 * @returns {Promise}
 */
function getUserById (id) {
    let ps = { name : 'getUserById', text : 'SELECT * FROM manager WHERE id = $1', values : [id] };
    return query(ps).then((results) => {
        if (!results || results.rows.length > 1) {
            throw new Error('get user by id failed');
        }
        return results.rows[0];
    });
}

module.exports = {
    getUserById : getUserById,
    getAllUsers : getAllUsers,
    getUserByEmail : getUserByEmail,
    addNewUser : addNewUser
};
var data = require('../data/data');

var positions = require('../config/positions');

var Promisee = require("bluebird");

/**
 * Check race exists in config
 * @param {string} race Value to check against config
 * @returns {boolean} If race exists in config
 */ 
function isRaceValid (race) {
    var isRaceValid;
    isRaceValid = positions[race] && positions[race].length > 0; 
    return isRaceValid;
}

/**
 * Check position exists and valid for given race
 * @param {string} race Player race to check position against
 * @param {string} position Position to validate
 * @returns {boolean} If race is valid and position is valid for race
 */
function isPositionValid (race, position) {
    return isRaceValid(race) && positions[race].indexOf(position) > -1;
}

/**
 * Validate data to create player
 * @param {object} data Data to validate
 * @param {string} data.race Player race
 * @param {string} data.position Player position
 * @returns {Promise.<object|string>} Promise of player data or error message
 */
function validateData (data) {

    var isValid = true;

    isValid = isValid && isRaceValid(data.race);

    isValid = isValid && isPositionValid(data.race, data.position);    

    // check race
    // check position
    // check team belongs to logged in player

    return isValid ? Promise.resolve(data) : Promise.reject('validateData: data invalid');
}

/**
 * Create player from given data
 * @param {object} data Player data
 * @param {string} data.name Player name 
 * @param {string} data.race Player race
 * @param {string} data.position Player position
 * @param {string} data.team Team to add player to
 * @returns {Promise.<object>} Promise of a player object 
 */
function createPlayer (data) {

    var player = {
        name : data.name,
        race : data.race,
        position : data.position,
        team : data.team
    };

    return Promise.resolve(player);
}

function * create () {
    
    this.type = 'application/json';

    validateData(this.request.body)
    .then(createPlayer)
    .then(data.players.insertAsync)
    .then((player) => {
        this.status = 200;
        this.body = player;
    })
    .catch((error) => {
        this.status = 500;
        this.body = error;
    });
}

module.exports = {
    create : create
};

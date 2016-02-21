var data = require('../data/data');

var positions = require('../config/positions');

var Promise = require('bluebird');

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
 * Validate name is not empty
 * @param {string} name Value to check
 * @returns {boolean} Is name valid
 */
function isNameValid (name) {
    var isNameValid;
    isNameValid = name !== '';
    return isNameValid;
}

/**
 * Validate data to create new team
 * @param {object} data Data to validate
 * @param {string} data.name Team name to validate
 * @param {string} data.race Race to validate
 * @returns {Promise.<object|string>} Promise of team data or error message
 */
function validateData (data) {
    
    var isValid = true;

    isValid = isValid && isRaceValid(data.race);   
    isValid = isValid && isNameValid(data.name); 

    return isValid ? Promise.resolve(data) : Promise.reject('validateData: data invalid');
}

/**
 * Create team from valid data
 * @param {object} validData data to create team
 * @param {string} validData.name New team name
 * @param {string} validData.race New team race
 * @returns {object} New team
 */
function createTeam (validData) {
    
    var team = {
        name : validData.name,
        race : validData.race
    }; 

    return Promise.resolve(team);
}



function * create () {

    this.type = 'application/json';

    validateData(this.request.body)
    .then(createTeam)
    .then(data.teams.insertAsync)
    .then((team) => {
        this.status = 200;
        this.body = team;
    })
    .catch((error) => {
        this.status = 500;
        this.body = error;
    });
}

module.exports = {
    create : create
};

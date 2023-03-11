/**
 * The Match database table structure and configuration
 */

const { Sequelize } = require("sequelize");

module.exports = {
    team_one: {
        type: Sequelize.STRING,
    },
    team_one_score: {
        type: Sequelize.INTEGER,
    },
    team_two: {
        type: Sequelize.STRING,
    },
    team_two_score: {
        type: Sequelize.INTEGER,
    },
    date: {
        type: Sequelize.STRING,
    },
    event: {
        type: Sequelize.STRING,
    },
}
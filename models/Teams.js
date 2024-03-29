/**
 * The Teams database table structure and configuration
 */

const { Sequelize } = require("sequelize");

module.exports = {
    team_name: {
        type: Sequelize.STRING,
        unique: true,
    },
    player_one: {
        type: Sequelize.STRING,
    },
    player_two: {
        type: Sequelize.STRING,
    },
    player_three: {
        type: Sequelize.STRING,
    },
    player_four: {
        type: Sequelize.STRING,
    },
    player_five: {
        type: Sequelize.STRING,
    },
    player_six: {
        type: Sequelize.STRING,
    },
    coach: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    aliases: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}
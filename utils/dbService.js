const { Sequelize } = require('sequelize')
const _Matches = require('../models/Matches')
const _Teams = require('../models/Teams')

const matchesSequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'matches.sqlite'
})

const teamsSequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'teams.sqlite'
})

const Matches = matchesSequelize.define('matches', _Matches)
const Teams = teamsSequelize.define('teams', _Teams)

const addMatchEntry = async (match, eventName) => {
    await Matches.sync()
    try {
        const entry = await Matches.create({
            team_one: match.teamOne,
            team_one_score: match.teamOneScore,
            team_two: match.teamTwo,
            team_two_score: match.teamTwoScore,
            date: match.date,
            event: eventName
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const addTeamEntry = async (team) => {
    await Teams.sync()
    try {
        const entry = await Teams.create({
            team_name: team.teamName,
            player_one: team.p1,
            player_two: team.p2,
            player_three: team.p3,
            player_four: team.p4,
            player_five: team.p5,
            player_six: team.p6,
            coach: team.coach,
            aliases: team.aliases,
        })

        return true
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            console.log(`ERROR: Team with name ${team.teamName} already exists`)
        }
        else {
            console.log(`ERROR: An unknown error has occurred!\n`, err)           
        }
        return false
    }
}

const getMatches = async (teamName) => {
    await Matches.sync()
    const matches = await Matches.findAll({where: Sequelize.or({team_one: teamName}, {team_two: teamName})})
    return matches
}

const getMatchupHistory = async (teamOne, teamTwo) => {
    await Matches.sync()
    const matches = await Matches.findAll({where: Sequelize.or(Sequelize.and({team_one: teamOne}, {team_two: teamTwo}), Sequelize.and({team_one: teamTwo}, {team_two: teamOne}))})
    return matches
}

const getTeam = async (teamName) => {
    await Teams.sync()
    const team = await Teams.findOne({where: {team_name: teamName}})
    return team
}

const updateTeamEntry = async (teamName, oldPlayer, newPlayer) => {
    await Teams.sync()
    const team = await Teams.findOne({where: {team_name: teamName}})
    if (team) {
        const p1Changes = await RosterData.update({ player_one: newPlayer }, { where: Sequelize.and({team_name: teamName}, {player_one: oldPlayer})})
        const p2Changes = await RosterData.update({ player_two: newPlayer }, { where: Sequelize.and({team_name: teamName}, {player_two: oldPlayer})})
        const p3Changes = await RosterData.update({ player_three: newPlayer }, { where: Sequelize.and({team_name: teamName}, {player_three: oldPlayer})})
        const p4Changes = await RosterData.update({ player_four: newPlayer }, { where: Sequelize.and({team_name: teamName}, {player_four: oldPlayer})})
        const p5Changes = await RosterData.update({ player_five: newPlayer }, { where: Sequelize.and({team_name: teamName}, {player_five: oldPlayer})})
        const p6Changes = await RosterData.update({ player_six: newPlayer }, { where: Sequelize.and({team_name: teamName}, {player_six: oldPlayer})})

        if (p1Changes == 0 && p2Changes == 0 && p3Changes == 0 && p4Changes == 0 && p5Changes == 0 && p6Changes == 0) {
            return false // No Teams were updated
        }

        return true // Team successfully updated
    }
    return false // Team doesn't exist
}

const updateTeamCoach = async (teamName, coachName) => {
    await Teams.sync()
    const team = await Teams.findOne({where: {team_name: teamName}})
    if (team) {
        const affectedRows = await Teams.update({ coach: coachName }, { where: { team_name: teamName }})
        if (affectedRows > 0) {
            return true // Coach updated
        }
    }
    return false // Team doesn't exist
}

const updateTeamAlias = async (teamName, alias) => {
    await Teams.sync()
    const team = await Teams.findOne({where: {team_name: teamName}})
    if (team) {
        let currentAliases = team.get('aliases')
        if (currentAliases === 'null' || currentAliases === null) {
            currentAliases = alias + ","
        } else if (!currentAliases.includes(alias)) {
            currentAliases += alias + ","
        } else {
            return false // Alias already exists for this team
        }

        const affectedRows = await Teams.update({ aliases: currentAliases }, { where: { team_name: teamName }})
        
        if (affectedRows > 0) {
            return true // Alias successfully updated
        }

    }
    return false // Team doesn't exist or update failed
}

const removeTeamEntry = async (teamName) => {
    await Teams.sync()
    const deletedEntries = await Teams.destroy({ where: { team_name: teamName }})
    if (deletedEntries > 0) {
        return true // Team successfully deleted
    }
    else {
        return false // Team failed to be deleted
    }
}

const resetMatches = async () => {
    await Matches.sync({ force: true })
}

const resetTeams = async () => {
    await Teams.sync({ force: true })
}

export const DbService = {
    addMatchEntry,
    addTeamEntry,
    getMatches,
    getMatchupHistory,
    getTeam,
    updateTeamEntry,
    updateTeamAlias,
    updateTeamCoach,
    removeTeamEntry,
    resetMatches,
    resetTeams,
}
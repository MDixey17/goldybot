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

const checkForAlias = async (team) => {
    await Teams.sync()
    const allRosters = await Teams.findAll({ attributes: ['team_name', 'player_one', 'player_two', 'player_three', 'player_four', 'player_five', 'player_six']})
    for (let i = 0; i < allRosters.length; i++) {
        if (team.p1 === allRosters[i].player_one && team.p2 === allRosters[i].player_two && team.p3 === allRosters[i].player_three && team.p4 === allRosters[i].player_four && team.p5 === allRosters[i].player_five && team.p6 === allRosters[i].player_six && team.teamName !== allRosters[i].team_name) {
            const current = await Teams.findOne({ where: { team_name: allRosters[i].get('team_name') } })
            let currentAliases = current.get('aliases')
            if (currentAliases === 'null' || currentAliases === null) {
                currentAliases = team.teamName + ","
            }
            else if (!currentAliases.includes(team.teamName)) {
                currentAliases += team.teamName + ","
            }

            await Teams.update({ aliases: currentAliases }, { where: { team_name: allRosters[i].get('team_name') } })
            return true // Alias added
        }
    }

    return false
}

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
    if (!await checkForAlias(team)) {
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

    return false
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
    if (team) {
        return team
    }
    else {
        // Check the aliases
        const aliases = await Teams.findAll({ attributes: ['team_name', 'aliases'] })
        let aliasFound = false
        let storedTeam = null
        aliases.forEach(alias => {
            if (alias.aliases && !aliasFound) {
                const aliasList = alias.aliases.split(',')
                for (let i = 0; i < aliasList.length; i++) {
                    if (aliasList[i] === teamName) {
                        storedTeam = alias
                        aliasFound = true
                        break
                    }
                }
            }
        })

        return storedTeam
    }
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

const removeLastMatch = async (teamName) => {
    await Matches.sync()
    const entryToDelete = await Matches.findOne({ where: Sequelize.or({team_one: teamName}, {team_two: teamName}), order: [ ['id', 'DESC'] ]})
    if (entryToDelete) {
        const deletedEntries = await Matches.destroy({ where: {id: entryToDelete.get('id')}})
        if (deletedEntries > 0) {
            return true
        } 
    }
    return false
}

const removeOutdatedEntries = async () => {
    await Matches.sync()
    const entries = await Matches.findAll({ attributes: ['date'] })
    const entriesToDelete = []
    const today = new Date()

    entries.forEach(entry => {
        const entry = entry.date.split('-');
        const entryDD = entry[1];
        const entryMM = entry[0];
        const entryYYYY = entry[2];
        const temp = new Date(entryMM + '/' + entryDD + '/' + entryYYYY);
        const diffTime = Math.abs(today - temp); // This is in milliseconds
        const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (numDays >= 60) {
            matchesToDelete.push(e.date);
        }
    })

    let deleteCount = 0
    for (let i = 0; i < entriesToDelete.length; i++) {
        deleteCount += (await Matches.destroy({ where: { date: entriesToDelete[i] } }))
    }
    console.log('Matches Deleted: ', deleteCount)

    await Teams.sync()
    const teams = await Teams.findAll({ attributes: ['createdAt'] })
    const rostersToDelete = []
    teams.forEach(team => {
        let t = new Date(team.createdAt);
        const diffTime = Math.abs(today - t);
        const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (numDays >= 180) {
            rostersToDelete.push(t.id);
        }
    })

    deleteCount = 0
    for (let i = 0; i < rostersToDelete.length; i++) {
        deleteCount += (await Teams.destroy({ where: { id: rostersToDelete[i] } }))
    }
    console.log('Teams Deleted: ', deleteCount)
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
    return true
}

const resetTeams = async () => {
    await Teams.sync({ force: true })
    return true
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
    removeLastMatch,
    removeOutdatedEntries,
    removeTeamEntry,
    resetMatches,
    resetTeams,
}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
require('dotenv').config()

const BALLCHASING_REPLAY_URL = "https://ballchasing.com/api/replays/" // Needs the Replay ID
const BALLCHASING_GROUP_URL = "https://ballchasing.com/api/groups/" // Needs the Group ID

const getData = async (url) => {
    if (url === null) {
        return
    }

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.BALLCHASING_TOKEN
        }
    }).then(response => response.json())
}

/**
 * Individual Replay Stats - 
 * Get a specified player's stats from a specific replay.
 * As soon as we find the player's stats, we build the return object and return
 */

const getPlayerReplayGeneralStats = async (replayId, playerName) => {
    const response = await getData(BALLCHASING_REPLAY_URL + replayId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            const coreStats = response.blue.players[i].stats.core
            const boostStats = response.blue.players[i].stats.boost
            const movementStats = response.blue.players[i].stats.movement
            const positionStats = response.blue.players[i].stats.positioning
            const demoStats = response.blue.players[i].stats.demo
            return {
                goals: coreStats.goals,
                assists: coreStats.assists,
                saves: coreStats.saves,
                score: coreStats.score,
                averageBoost: boostStats.avg_amount,
                totalBoostCollected: boostStats.amount_collected,
                averageSpeed: movementStats.avg_speed,
                timeSupersonic: movementStats.time_supersonic_speed,
                timeOnOffense: positionStats.time_offensive_half,
                timeOnDefense: positionStats.time_defensive_half,
                demos: demoStats.inflicted,
                demosTaken: demoStats.taken
            }
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            const coreStats = response.orange.players[i].stats.core
            const boostStats = response.orange.players[i].stats.boost
            const movementStats = response.orange.players[i].stats.movement
            const positionStats = response.orange.players[i].stats.positioning
            const demoStats = response.orange.players[i].stats.demo
            return {
                goals: coreStats.goals,
                assists: coreStats.assists,
                saves: coreStats.saves,
                score: coreStats.score,
                averageBoost: boostStats.avg_amount,
                totalBoostCollected: boostStats.amount_collected,
                averageSpeed: movementStats.avg_speed,
                timeSupersonic: movementStats.time_supersonic_speed,
                timeOnOffense: positionStats.time_offensive_half,
                timeOnDefense: positionStats.time_defensive_half,
                demos: demoStats.inflicted,
                demosTaken: demoStats.taken
            }
        }
    }

    return null

}

const getPlayerReplayCoreStats = async (replayId, playerName) => {
    const response = await getData(BALLCHASING_REPLAY_URL + replayId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].stats.core
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].stats.core
        }
    }

    return null
}

const getPlayerReplayBoostStats = async (replayId, playerName) => {
    const response = await getData(BALLCHASING_REPLAY_URL + replayId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].stats.boost
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].stats.boost
        }
    }

    return null
}

const getPlayerReplayMovementStats = async (replayId, playerName) => {
    const response = await getData(BALLCHASING_REPLAY_URL + replayId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].stats.movement
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].stats.movement
        }
    }

    return null
}

const getPlayerReplayPositioningStats = async (replayId, playerName) => {
    const response = await getData(BALLCHASING_REPLAY_URL + replayId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].stats.positioning
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].stats.positioning
        }
    }

    return null
}

///////////////////////////////////////////////////////////////////////

/**
 * Group Replay Stats - 
 * Get a specified player's stats for a group of replay
 */
const getPlayerGroupGeneralStats = async (groupId, playerName) => {
    const response = await getData(BALLCHASING_GROUP_URL + groupId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            const coreStats = response.blue.players[i].game_average.core
            const boostStats = response.blue.players[i].game_average.boost
            const movementStats = response.blue.players[i].game_average.movement
            const positioningStats = response.blue.players[i].game_average.positioning
            const demoStats = response.blue.players[i].game_average.demo
            
            return {
                goals: coreStats.goals,
                assists: coreStats.assists,
                saves: coreStats.saves,
                score: coreStats.score,
                averageBoost: boostStats.avg_amount,
                totalBoostCollected: boostStats.amount_collected,
                averageSpeed: movementStats.avg_speed,
                timeSupersonic: movementStats.time_supersonic_speed,
                timeOnOffense: positioningStats.time_offensive_half,
                timeOnDefense: positioningStats.time_defensive_half,
                demos: demoStats.inflicted,
                demosTaken: demoStats.taken
            }
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            const coreStats = response.orange.players[i].game_average.core
            const boostStats = response.orange.players[i].game_average.boost
            const movementStats = response.orange.players[i].game_average.movement
            const positioningStats = response.orange.players[i].game_average.positioning
            const demoStats = response.orange.players[i].game_average.demo
            
            return {
                goals: coreStats.goals,
                assists: coreStats.assists,
                saves: coreStats.saves,
                score: coreStats.score,
                averageBoost: boostStats.avg_amount,
                totalBoostCollected: boostStats.amount_collected,
                averageSpeed: movementStats.avg_speed,
                timeSupersonic: movementStats.time_supersonic_speed,
                timeOnOffense: positioningStats.time_offensive_half,
                timeOnDefense: positioningStats.time_defensive_half,
                demos: demoStats.inflicted,
                demosTaken: demoStats.taken
            }
        }
    }

    return null
}

const getPlayerGroupCoreStats = async (groupId, playerName) => {
    const response = await getData(BALLCHASING_GROUP_URL + groupId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].game_average.core
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].game_average.core
        }
    }

    return null
}

const getPlayerGroupBoostStats = async (groupId, playerName) => {
    const response = await getData(BALLCHASING_GROUP_URL + groupId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].game_average.boost
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].game_average.boost
        }
    }

    return null
}

const getPlayerGroupMovementStats = async (groupId, playerName) => {
    const response = await getData(BALLCHASING_GROUP_URL + groupId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].game_average.movement
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].game_average.movement
        }
    }

    return null
}

const getPlayerGroupPositioningStats = async (groupId, playerName) => {
    const response = await getData(BALLCHASING_GROUP_URL + groupId)
    if (response === null) {
        console.log('No data received from Ballchasing API! Exiting...')
        return
    }

    // Check blue team
    for (let i = 0; i < response.blue.players.length; i++) {
        if (response.blue.players[i].name === playerName) {
            // We found the player, so return the data
            return response.blue.players[i].game_average.positioning
        }
    }

    // Check orange team (this will only happen if we haven't found the player yet)
    for (let i = 0; i < response.orange.players.length; i++) {
        if (response.orange.players[i].name === playerName) {
            // We found the player, so return the data
            return response.orange.players[i].game_average.positioning
        }
    }

    return null
}

/////////////////////////////////////////////////////////////////////
// Export a function that gets the data for us and returns it
const getBallchasingData = async (flag, id, playerName, isGroup) => {
    // First, determine if SINGLE or GROUP
    if (isGroup) {
        if (flag === 'general') {
            return await getPlayerReplayGeneralStats(id, playerName)
        } else if (flag === 'core') {
            return await getPlayerReplayCoreStats(id, playerName)
        } else if (flag === 'boost') {
            return await getPlayerReplayBoostStats(id, playerName)
        } else if (flag === 'movement') {
            return await getPlayerReplayMovementStats(id, playerName)
        } else {
            // Getting here means this is positioning
            return await getPlayerReplayPositioningStats(id, playerName)
        }
    }
    else {
        if (flag === 'general') {
            return await getPlayerGroupGeneralStats(id, playerName)
        } else if (flag === 'core') {
            return await getPlayerGroupCoreStats(id, playerName)
        } else if (flag === 'boost') {
            return await getPlayerGroupBoostStats(id, playerName)
        } else if (flag === 'movement') {
            return await getPlayerGroupMovementStats(id, playerName)
        } else {
            // Getting here means this is positioning
            return await getPlayerGroupPositioningStats(id, playerName)
        }
    }
}

module.exports = {
    BallchasingService: {
        getBallchasingData
    }
}
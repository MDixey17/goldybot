// A variety of utility functions that will be helpful throughout the project

const getFormattedDate = (date) => {
    let dd = String(date.getDate()).padStart(2, '0')
    let mm = String(date.getMonth() + 1).padStart(2, '0')
    let yyyy = String(date.getFullYear())
    return `${mm}-${dd}-${yyyy}`
}

const checkDate = (dateInput) => {
    // We got an input, but is it correct
    if (dateInput.includes('-')) {
        let dateInfo = dateInput.split('-');
        // Make sure the dates appear correct
        if (dateInfo.length == 3) {
            let mm = dateInfo[0];
            let dd = dateInfo[1];
            let yyyy = dateInfo[2];
            // Make sure they are correct with how big they can be
            if (Number(mm) > 0 && Number(mm) < 13) {
                if (Number(dd) > 0 && Number(dd) < 32) {
                    if (Number(yyyy) >= 2022) {
                        return true
                    }
                    
                }
                
            } 
            
        } 
        
    }
    
    return false // Check failed
}

const getEventName = (eventSlug) => {
    const words = eventSlug.split('-')
    let eventName = ''
    for (let i = 0; i < words.length; i++) {
        eventName += words[i].charAt(0).toUpperCase() + words[i].slice(1) + ' '
    }
    return eventName
}

const getTeamDetails = (teamObject) => {
    let teamDetails = ''

    if (teamObject.get('player_one') !== '-') {
        teamDetails += teamObject.get('player_one') + "\n"
    }
    if (teamObject.get('player_two') !== '-') {
        teamDetails += teamObject.get('player_two') + "\n"
    }
    if (teamObject.get('player_three') !== '-') {
        teamDetails += teamObject.get('player_three') + "\n"
    }
    if (teamObject.get('player_four') !== '-') {
        teamDetails += teamObject.get('player_four') + "\n"
    }
    if (teamObject.get('player_five') !== '-') {
        teamDetails += teamObject.get('player_five') + "\n"
    }
    if (teamObject.get('player_six') !== '-') {
        teamDetails += teamObject.get('player_six') + "\n"
    }
    if (teamObject.get('coach') && teamObject.get('coach') !== '-') {
        teamDetails += "*Coach:* " + teamObject.get('coach') + "\n"
    }

    return teamDetails
}

const parseGeneralStats = (generalObject, isGroup) => {
    let stringData = ''
    if (isGroup) {
        stringData += `**Goals Per Game:** ${generalObject.goals}\n\n`
        stringData += `**Assists Per Game:** ${generalObject.assists}\n\n`
        stringData += `**Saves Per Game:** ${generalObject.saves}\n\n`
        stringData += `**Score Per Game:** ${generalObject.score}\n\n`
        stringData += `**Average Boost Amount Per Game:** ${generalObject.averageBoost}\n\n`
        stringData += `**Average Total Boost Collected Per Game:** ${generalObject.totalBoostCollected}\n\n`
        stringData += `**Average Speed Per Game:** ${generalObject.averageSpeed}\n\n`
        stringData += `**Time Going SuperSonic Per Game:** ${generalObject.timeSupersonic} seconds\n\n`
        stringData += `**Time on Offense Per Game:** ${generalObject.timeOnOffense} seconds\n\n`
        stringData += `**Time on Defense Per Game:** ${generalObject.timeOnDefense} seconds\n\n`
        stringData += `**Demos Per Game:** ${generalObject.demos}\n\n`
        stringData += `**Demos Taken Per Game:** ${generalObject.demosTaken}`
    }

    else {
        stringData += `**Goals:** ${generalObject.goals}\n\n`
        stringData += `**Assists:** ${generalObject.assists}\n\n`
        stringData += `**Saves:** ${generalObject.saves}\n\n`
        stringData += `**Score:** ${generalObject.score}\n\n`
        stringData += `**Average Boost Amount:** ${generalObject.averageBoost}\n\n`
        stringData += `**Total Boost Collected:** ${generalObject.totalBoostCollected}\n\n`
        stringData += `**Average Speed:** ${generalObject.averageSpeed}\n\n`
        stringData += `**Time Going SuperSonic:** ${generalObject.timeSupersonic} seconds\n\n`
        stringData += `**Time on Offense:** ${generalObject.timeOnOffense} seconds\n\n`
        stringData += `**Time on Defense:** ${generalObject.timeOnDefense} seconds\n\n`
        stringData += `**Demos:** ${generalObject.demos}\n\n`
        stringData += `**Demos Taken:** ${generalObject.demosTaken}`
    }

    return stringData
}

const parseCoreStats = (coreObject, isGroup) => {
    let stringData = ''

    if (isGroup) {
        stringData += `**Shots Per Game:** ${coreObject.shots}\n\n`
        stringData += `**Goals Per Game:** ${coreObject.goals}\n\n`
        stringData += `**Average Shooting %:** ${coreObject.shooting_percentage}\n\n`
        stringData += `**Shots Against Per Game:** ${coreObject.shots_against}\n\n`
        stringData += `**Goals Against Average:** ${coreObject.goals_against}\n\n`
        stringData += `**Saves Per Game:** ${coreObject.saves}\n\n`
        stringData += `**Assists Per Game:** ${coreObject.assists}\n\n`
        stringData += `**Score Per Game:** ${coreObject.score}`
    }
    else {
        stringData += `**Shots:** ${coreObject.shots}\n\n`
        stringData += `**Goals:** ${coreObject.goals}\n\n`
        stringData += `**Shooting %:** ${coreObject.shooting_percentage}\n\n`
        stringData += `**Shots Against:** ${coreObject.shots_against}\n\n`
        stringData += `**Goals Against:** ${coreObject.goals_against}\n\n`
        stringData += `**Saves:** ${coreObject.saves}\n\n`
        stringData += `**Assists:** ${coreObject.assists}\n\n`
        stringData += `**Score:** ${coreObject.score}`
    }

    return stringData
}

const parseBoostStats = (boostObject, isGroup) => {
    let stringData = ''

    if (isGroup) {
        stringData += `**Average Boost Per Minute:** ${boostObject.bpm}\n\n`
        stringData += `**Average Boost Amount Per Game:** ${boostObject.avg_amount}\n\n`
        stringData += `**Average # of Full Boosts Collected Per Game:** ${Number(boostObject.amount_collected_big) / 100}\n\n`
        stringData += `**Average # of Pads Collected Per Game:** ${Number(boostObject.amount_collected_small) / 12}\n\n`
        stringData += `**Average Time at Zero Boost:** ${boostObject.time_zero_boost} seconds\n\n`
        stringData += `**Average Time at Full Boost:** ${boostObject.time_full_boost} seconds`
    }
    else {
        stringData += `**Boost Per Minute:** ${boostObject.bpm}\n\n`
        stringData += `**Average Boost Amount:** ${boostObject.avg_amount}\n\n`
        stringData += `**# of Full Boosts Collected:** ${Number(boostObject.amount_collected_big) / 100}\n\n`
        stringData += `**# of Pads Collected:** ${Number(boostObject.amount_collected_small) / 12}\n\n`
        stringData += `**Time at Zero Boost:** ${boostObject.time_zero_boost} seconds\n\n`
        stringData += `**Time at Full Boost:** ${boostObject.time_full_boost} seconds`
    }

    return stringData
}

const parseMovementStats = (movementObject, isGroup) => {
    let stringData = ''

    if (isGroup) {
        stringData += `**Average Speed:** ${movementObject.avg_speed}\n\n`
        stringData += `**Average Time Supersonic Per Game:** ${movementObject.time_supersonic_speed} seconds\n\n`
        stringData += `**Average Time on Ground Per Game:** ${movementObject.time_ground} seconds\n\n`
        stringData += `**Average Time Low in the Air Per Game:** ${movementObject.time_low_air} seconds\n\n`
        stringData += `**Average Time High in the Air Per Game:** ${movementObject.time_high_air} seconds`
    }
    else {
        stringData += `**Average Speed:** ${movementObject.avg_speed}\n\n`
        stringData += `**Time Supersonic:** ${movementObject.time_supersonic_speed} seconds\n\n`
        stringData += `**Time on Ground:** ${movementObject.time_ground} seconds\n\n`
        stringData += `**Time Low in the Air:** ${movementObject.time_low_air} seconds\n\n`
        stringData += `**Time High in the Air:** ${movementObject.time_high_air} seconds`
    }

    return stringData
}

const parsePositioningStats = (positioningObject, isGroup) => {
    let stringData = ''

    if (isGroup) {
        stringData += `**Average Time Closest To The Ball:** ${positioningObject.time_closest_to_ball} seconds\n\n`
        stringData += `**Average Time Farthest From The Ball:** ${positioningObject.time_farthest_from_ball} seconds\n\n`
        stringData += `**Average Time Behind The Ball:** ${positioningObject.time_behind_ball} seconds\n\n`
        stringData += `**Average Time In Front of The Ball:** ${positioningObject.time_infront_ball} seconds\n\n`
        stringData += `**Average Time In Defensive Half:** ${positioningObject.time_defensive_half} seconds\n\n`
        stringData += `**Average Time In Offensive Half:** ${positioningObject.time_offensive_half} seconds\n\n`
        stringData += `**Goals Against While Last Defender Per Game:** ${positioningObject.goals_against_while_last_defender}`
    }
    else {
        stringData += `**Time Closest To The Ball:** ${positioningObject.time_closest_to_ball} seconds\n\n`
        stringData += `**Time Farthest From The Ball:** ${positioningObject.time_farthest_from_ball} seconds\n\n`
        stringData += `**Time Behind The Ball:** ${positioningObject.time_behind_ball} seconds\n\n`
        stringData += `**Time In Front of The Ball:** ${positioningObject.time_infront_ball} seconds\n\n`
        stringData += `**Time In Defensive Half:** ${positioningObject.time_defensive_half} seconds\n\n`
        stringData += `**Time In Offensive Half:** ${positioningObject.time_offensive_half} seconds\n\n`
        stringData += `**Goals Against While Last Defender:** ${positioningObject.goals_against_while_last_defender}`
    }

    return stringData
}

module.exports = {
    UtilityService: {
        getFormattedDate,
        checkDate,
        getEventName,
        getTeamDetails,
        parseGeneralStats,
        parseCoreStats,
        parseBoostStats,
        parseMovementStats,
        parsePositioningStats
    }
}
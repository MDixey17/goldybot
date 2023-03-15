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

module.exports = {
    UtilityService: {
        getFormattedDate,
        checkDate,
        getEventName,
        getTeamDetails,
    }
}
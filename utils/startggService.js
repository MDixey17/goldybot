/**
 * Contain all the appropriate calls to the start.gg API to retrieve data
 */

import { CHECK_EVENT_REGISTRATION, GET_EVENT_ID, GET_EVENT_MATCHES, GET_EVENT_PLACEMENT, GET_EVENT_ROSTERS, GET_TOTAL_ENTRANTS, TOTAL_EVENT_MATCHES } from '../constants/queries'
import { UtilityService } from './utilityService'

const STARTGG_URL = "https://api.start.gg/gql/alpha"
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
require('dotenv').config()

const sleep = (ms) => {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } while (currentDate - date < ms)
}

const getData = async (query, variables) => {
    // Make sure we have valid arguments
    if (query === null || variables === null) {
        return
    }

    // Get the data and return it
    return await fetch(STARTGG_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer ' + process.env.STARTGG_TOKEN
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        })
    }).then(response => response.json())

}

const getEventId = async (tournamentName, eventName) => {
    const eventSlug = `tournament/${tournamentName}/event/${eventName}`
    const response = await getData(GET_EVENT_ID, {slug: eventSlug})
    sleep(1000)
    return response.data.event.id
}

const getTotalEntrants = async (eventId) => {
    const response = await getData(GET_TOTAL_ENTRANTS, {eventId: eventId, page: 1, perPage: 1})
    sleep(1000)
    return response.data.event.entrants.pageInfo.total
}

const getTotalMatches = async (eventId) => {
    const response = await getData(TOTAL_EVENT_MATCHES, {eventId: eventId, page: 1, perPage: 1})
    sleep(1000)
    return response.data.event.sets.pageInfo.total
}

const getEventPlacement = async (tournamentName, eventName, entrantName) => {
    const eventId = await getEventId(tournamentName, eventName)
    const numEntrants = await getTotalEntrants(eventId)
    let numEntrantsFound = 0
    let pageNumber = 1
    let numTeamsSharedPlacement = 0
    let placementFound = false
    let placement = -1

    while (numEntrantsFound < numEntrants) {
        const response = await getData(GET_EVENT_PLACEMENT, {eventId: eventId, page: pageNumber, perPage: 50})
        let loopCondition = 50
        if (numEntrantsFound + loopCondition > numEntrants) {
            loopCondition = numEntrants - numEntrantsFound;
        }
        for (let i = 0; i < loopCondition; i++) {
            if (entrantName === response.data.event.standings.nodes[i].entrant.name) {
                placement = response.data.event.standings.nodes[i].placement
                placementFound = true
            }
        }

        if (placementFound) {
            for (let i = 0; i < loopCondition; i++) {
                if (placement === response.data.event.standings.nodes[i].placement) {
                    numTeamsSharedPlacement += 1
                }
            }
        }

        pageNumber += 1
        numEntrantsFound += 50
        sleep(1000)
    }

    if (!placementFound) {
        // Entrant wasn't in this event. We return NULL and check in command
        return null
    }
    else {
        // Entrant was in this event and placement was retrieved
        if (numTeamsSharedPlacement > 0) {
            return `${placement}-${placement + numTeamsSharedPlacement}`
        }
        else {
            return placement.toString()
        }
    }
}

const getEventMatches = async (tournamentName, eventName) => {
    const eventId = await getEventId(tournamentName, eventName)
    const numMatches = await getTotalMatches(eventId)
    const matches = [] // Each item will have the object format {teamOne: String, teamOneScore: Number, teamTwo: String, teamTwoScore: Number, date: String}

    let numMatchesFound = 0
    let pageNumber = 1

    while (numMatchesFound < numMatches) {
        const response = await getData(GET_EVENT_MATCHES, {eventId: eventId, page: pageNumber, perPage: 50})
        let loopCondition = 50;
        if (numMatchesFound + loopCondition > numMatches) {
            loopCondition = numMatches - numMatchesFound;
        }

        for (let i = 0; i < loopCondition; i++) {
            const teamOneName = response.data.event.sets.nodes[i].slots[0].entrant.name
            const teamOneScore = response.data.event.sets.nodes[i].slots[0].standing.stats.score.value
            const teamTwoName = response.data.event.sets.nodes[i].slots[1].entrant.name
            const teamTwoScore = response.data.event.sets.nodes[i].slots[1].standing.stats.score.value
            const date = UtilityService.getFormattedDate(new Date(response.data.event.sets.nodes[i].startedAt * 1000))
            
            // Check if either score is a -1 --> this means the team didn't show up or was disqualified so we want to ignore this
            if (teamOneScore !== -1 && teamTwoScore !== -1) {
                matches.push({teamOne: teamOneName, teamOneScore: teamOneScore, teamTwo: teamTwoName, teamTwoScore: teamTwoScore, date: date})
            }
        }

        pageNumber += 1
        numMatchesFound += 50
        sleep(1000)
    }

    return matches
}

const getEventRosters = async (tournamentName, eventName) => {
    const eventId = await getEventId(tournamentName, eventName)
    const numEntrants = await getTotalEntrants(eventId)
    let numEntrantsFound = 0
    let pageNumber = 1
    const rosters = []

    while (numEntrantsFound < numEntrants) {
        const response = await getData(GET_EVENT_ROSTERS, {eventId: eventId, page: pageNumber, perPage: 25})
        let loopCondition = 25
        if (numEntrantsFound + loopCondition > numEntrants) {
            loopCondition = numEntrants - numEntrantsFound
        }

        for (let i = 0; i < loopCondition; i++) {
            const teamName = response.data.event.entrants.nodes[i].name
            const gamerTags = [...new Set(response.data.event.entrants.nodes[i].participants)]
            let playerNumber = 1
            let p1 = '-'
            let p2 = '-'
            let p3 = '-'
            let p4 = '-'
            let p5 = '-'
            let p6 = '-'

            gamerTags.forEach(player => {
                if (playerNumber == 1) {
                    p1 = player.gamerTag
                } else if (playerNumber == 2) {
                    p2 = player.gamerTag
                } else if (playerNumber == 3) {
                    p3 = player.gamerTag
                } else if (playerNumber == 4) {
                    p4 = player.gamerTag
                } else if (playerNumber == 5) {
                    p5 = player.gamerTag
                } else if (playerNumber == 6) {
                    p6 = player.gamerTag
                }
                playerNumber += 1
            })

            rosters.push({teamName: teamName, p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6})
        }

        pageNumber += 1
        numEntrantsFound += 25
        sleep(1000)
    }

    return rosters
}

const checkEventRegistration = async (tournamentName, eventName, entrantName) => {
    const eventId = await getEventId(tournamentName, eventName)
    const numEntrants = await getTotalEntrants(eventId)
    let numEntrantsFound = 0
    let pageNumber = 1
    while (numEntrantsFound < numEntrants) {
        const response = await getData(CHECK_EVENT_REGISTRATION, {eventId: eventId, page: pageNumber, perPage: 50})
        let loopCondition = 50
        if (numEntrantsFound + loopCondition > numEntrants) {
            loopCondition = numEntrants - numEntrantsFound;
        }
        for (let i = 0; i < loopCondition; i++) {
            if (entrantName === response.data.event.entrants.nodes[i].name) {
                return true
            }
        }
        pageNumber += 1
        numEntrantsFound += 50
        sleep(1000)
    }
    return false
}

export const StartggService = {
    getEventPlacement,
    getEventMatches,
    getEventRosters,
    checkEventRegistration,
}
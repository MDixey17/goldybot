/**
 * Contain all the appropriate calls to the start.gg API to retrieve data
 */

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
            variables: {variables},
        })
    }).then(response => response.json())

}

const getEventId = async (tournamentSlug, eventSlug) => {

}

const getTotalEntrants = async (eventId) => {
    
}

const getEventPlacement = async (tournamentSlug, eventSlug, teamName) => {

}

const getEventMatches = async (tournamentSlug, eventSlug) => {

}

const getEventRosters = async (tournamentSlug, eventSlug) => {

}

const checkEventRegistration = async (tournamentSlug, eventSlug, teamName) => {

}

export const StartggService = {
    getEventPlacement,
    getEventMatches,
    getEventRosters,
    checkEventRegistration,
}
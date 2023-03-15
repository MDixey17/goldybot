/**
 * File that contains all the relevant GraphQL queries as strings to be immediately referenced in other files
 */

const GET_EVENT_ID = "query EventQuery($slug:String) {event(slug: $slug) {id name}}"

const GET_TOTAL_ENTRANTS = "query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { entrants(query: {page: $page perPage: $perPage}) {pageInfo {total totalPages}}}}"

const GET_EVENT_PLACEMENT = "query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { standings(query: {perPage: $perPage, page: $page}){nodes {placement entrant {name}}}}}"

const TOTAL_EVENT_MATCHES = "query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) { event(id: $eventId) {sets(page: $page perPage: $perPage sortType: STANDARD) {pageInfo {total}}}}"

const GET_EVENT_MATCHES = "query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) {sets(page: $page perPage: $perPage sortType: STANDARD) {nodes { startedAt slots { entrant { name } standing { stats { score { value }}}}}}}}"

const GET_EVENT_ROSTERS = "query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { entrants(query: {page: $page perPage: $perPage}) {nodes {name participants {gamerTag}}}}}"

const CHECK_EVENT_REGISTRATION = "query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { entrants(query: {page: $page perPage: $perPage}) {nodes {name participants {gamerTag}}}}}"

module.exports = {
    GET_EVENT_ID,
    GET_TOTAL_ENTRANTS,
    GET_EVENT_PLACEMENT,
    TOTAL_EVENT_MATCHES,
    GET_EVENT_MATCHES,
    GET_EVENT_ROSTERS,
    CHECK_EVENT_REGISTRATION
}
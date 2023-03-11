/**
 * File that contains all the relevant GraphQL queries as strings to be immediately referenced in other files
 */

export const GET_EVENT_ID = "query EventQuery($slug:String) {event(slug: $slug) {id name}}"

export const GET_TOTAL_ENTRANTS = "query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { entrants(query: {page: $page perPage: $perPage}) {pageInfo {total totalPages}}}}"

export const GET_EVENT_PLACEMENT = "query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { standings(query: {perPage: $perPage, page: $page}){nodes {placement entrant {name}}}}}"

export const TOTAL_EVENT_MATCHES = "query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) { event(id: $eventId) {sets(page: $page perPage: $perPage sortType: STANDARD) {pageInfo {total}}}}"

export const GET_EVENT_MATCHES = "query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) {sets(page: $page perPage: $perPage sortType: STANDARD) {nodes { startedAt slots { entrant { name } standing { stats { score { value }}}}}}}}"

export const GET_EVENT_ROSTERS = "query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { entrants(query: {page: $page perPage: $perPage}) {nodes {name participants {gamerTag}}}}}"

export const CHECK_EVENT_REGISTRATION = "query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {event(id: $eventId) { entrants(query: {page: $page perPage: $perPage}) {nodes {name participants {gamerTag}}}}}"
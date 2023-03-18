# GoldyBot - The Rocket League Utility Discord Bot

## Table of Contents
[Contributors](#contributors)
[Summary](#summary)
[Commands](#commands)
[Support](#support)
[Developers - How to set up locally](#developers---how-to-set-up-locally)

## Contributors
- Matt Dixey AKA TitanHawk17#4522 (Lead Developer & Project Manager)

## Summary
GoldyBot uses the `node-fetch` package to retrieve Rocket League statistics, matches, and various other information from the [start.gg API](#) and [Ballchasing API](#). All team and match information is stored locally using the `Sequelize` node module. Individual statistics from Ballchasing is not stored as this would be very expensive. Proper error handling is in place, but not confirmed to be prepared for ALL user inputs. Please be sure to read the description of each command and parameter to minimize potential errors. 

## Commands
`/addalias [TEAM_NAME] [ALIAS]`: Add an alias or alternate name to a Team
`/addcoach [TEAM_NAME] [COACH]`: Add or update the coach for a Team
`/addevent [TOURNAMENT_NAME] [EVENT_NAME]`: Add all the teams and matches for a start.gg event
`/addmatch [6 Parameters]`: Add a match between two Teams
`/addteam [7 Parameters]`: Add a Team
`/deletelast [TEAM_NAME]`: Delete the last match for a Team
`/deleteteam [TEAM_NAME]`: Delete a Team
`/getmatches [TEAM_NAME]`: Get the recent matches for a Team
`/getteam [TEAM_NAME]`: Get the roster for a Team
`/help`: Get the full list of GoldyBot commands
`/matchup [TEAM_ONE] [TEAM_TWO]`: Get the matchup information between two Teams
`/replaygroupstats [PLAYER_NAME] [REPLAY_GROUP_LINK] [optional: FLAG]`: Get a player's stats for a Ballchasing Replay Group
`/replaystats [PLAYER_NAME] [REPLAY_LINK] [optional: FLAG]`: Get a player's stats for a Ballchasing Replay
`/reset`: Reset the Matches database
`/resetteams`: Reset the Teams database
`/substitute [TEAM_NAME] [OLD_PLAYER] [NEW_PLAYER]`: Substitute a player on a Team
`/support`: Get additional information and support about GoldyBot

_NOTE:_ Some of the listed commands will not be available to the public as a protective measure against unwanted write access to the database files. If you believe you should be able to execute a certain command that you don't have permission to, please reach out to a [developer](#contributors).

## Support
If there are any issues with running a GoldyBot command or you have an idea of a feature that would improve GoldyBot, please reach out to a [Contributor](#contributors) via Discord.

Want to support the developers? Become a patreon [here!](https://www.patreon.com/titanhawk17)
## Developers - How to set up locally
1. Clone this repository
2. Open a new terminal and run `npm install`
3. Obtain the required `.env` file from TitanHawk17#4522 on Discord
4. Ensure that the `.env` file is named correctly and in the root directory of the repository
5. If you make any change to a command, run `node deploy-commands.js`
6. If you delete a command, run `node delete-commands.js`. Then, run `node deploy-commands.js` to redeploy the commands that weren't deleted.
7. Run `node index.js` to run GoldyBot locally
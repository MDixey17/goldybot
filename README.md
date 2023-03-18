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
GoldyBot uses the `node-fetch` package to retrieve Rocket League statistics, matches, and various other information from the [start.gg API](https://developer.start.gg/docs/intro/) and [Ballchasing API](https://ballchasing.com/doc/api). All team and match information is stored locally using the `Sequelize` node module. Individual statistics from Ballchasing is not stored as this would be very expensive. Proper error handling is in place, but not confirmed to be prepared for ALL user inputs. Please be sure to read the description of each command and parameter to minimize potential errors. 

## Commands
1. `/addalias [TEAM_NAME] [ALIAS]`: Add an alias or alternate name to a Team
2. `/addcoach [TEAM_NAME] [COACH]`: Add or update the coach for a Team
3. `/addevent [TOURNAMENT_NAME] [EVENT_NAME]`: Add all the teams and matches for a start.gg event
4. `/addmatch [6 Parameters]`: Add a match between two Teams
5. `/addteam [7 Parameters]`: Add a Team
6. `/deletelast [TEAM_NAME]`: Delete the last match for a Team
7. `/deleteteam [TEAM_NAME]`: Delete a Team
8. `/getmatches [TEAM_NAME]`: Get the recent matches for a Team
9. `/getplacement [TOURNAMENT_NAME] [EVENT_NAME] [TEAM_NAME]`: Get the final placement for a Team in a start.gg event
10. `/getteam [TEAM_NAME]`: Get the roster for a Team
11. `/help`: Get the full list of GoldyBot commands
12. `/matchup [TEAM_ONE] [TEAM_TWO]`: Get the matchup information between two Teams
13. `/replaygroupstats [PLAYER_NAME] [REPLAY_GROUP_LINK] [optional: FLAG]`: Get a player's stats for a Ballchasing Replay Group
14. `/replaystats [PLAYER_NAME] [REPLAY_LINK] [optional: FLAG]`: Get a player's stats for a Ballchasing Replay
15. `/reset`: Reset the Matches database
16. `/resetteams`: Reset the Teams database
17. `/substitute [TEAM_NAME] [OLD_PLAYER] [NEW_PLAYER]`: Substitute a player on a Team
18. `/support`: Get additional information and support about GoldyBot

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
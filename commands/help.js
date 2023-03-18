/**
 * Slash command to view the full list of commands and links to relevant pages (submit bug, support us, etc.)
 */

const { SlashCommandBuilder } = require("discord.js");
const { DiscordService } = require("../utils/discordService");

const COMMANDS_LIST = `**/addalias** [TEAM_NAME] [ALIAS]\nAdd an alias or alternate name to a Team\n\n**/addcoach** [TEAM_NAME] [COACH]\nAdd or update the coach for a Team\n\n**/addevent** [TOURNAMENT_NAME] [EVENT_NAME]\nAdd all the teams and matches from a start.gg event\n\n**/addmatch** [6 Parameters]\nAdd a match between two teams\n\n**/addteam** [7 Parameters]\nAdd a Team\n\n**/deletelast** [TEAM_NAME]\nDelete the last match for a Team\n\n**/deleteteam** [TEAM_NAME]\nDelete a Team\n\n**/getmatches** [TEAM_NAME]\nGet the recent matches for a Team\n\n**/getteam** [TEAM_NAME]\nGet the roster for a Team\n\n**/matchup** [TEAM_ONE] [TEAM_TWO]\nGet the matchup information between two teams\n\n**/replaygroupstats** [PLAYER_NAME] [REPLAY_GROUP_LINK] [optional: FLAG]\nGet a player's stats for a Ballchasing Replay Group\n\n**/replaystats** [PLAYER_NAME] [REPLAY_LINK] [optional: FLAG]\nGet a player's stats for a Ballchasing Replay\n\n**/reset**\nReset the Matches database\n\n**/resetteams**\nReset the Teams database\n\n**/substitute** [TEAM_NAME] [OLD_PLAYER] [NEW_PLAYER]\nSubstitute a player on a team\n\n**/support**\nGet additional information and support\n`

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a full list of GoldyBot commands'),
    async execute(interaction) {
        const embed = DiscordService.getSuccessEmbed(`GoldyBot Commands`, COMMANDS_LIST)
        await interaction.editReply({ embeds: [embed] })
    }
}
/**
 * Slash command to view the full list of commands and links to relevant pages (submit bug, support us, etc.)
 */

const { SlashCommandBuilder } = require("discord.js");
const { DiscordService } = require("../utils/discordService");

const COMMANDS_LIST = `**/addalias** [TEAM_NAME] [ALIAS]\nAdd an alias or alternate name to a Team\n**/addcoach** [TEAM_NAME] [COACH]\nAdd or update the coach for a Team\n**/addevent** [TOURNAMENT_NAME] [EVENT_NAME]\nAdd all the teams and matches from a start.gg event\n**/addmatch** [6 Parameters]\nAdd a match between two teams\n**/addteam** [7 Parameters]\nAdd a Team\n**/deletelast** [TEAM_NAME]\nDelete the last match for a Team\n**/deleteteam** [TEAM_NAME]\nDelete a Team\n**/getmatches** [TEAM_NAME]\nGet the recent matches for a Team\n**/getteam** [TEAM_NAME]\nGet the roster for a Team\n**/matchup** [TEAM_ONE] [TEAM_TWO]\nGet the matchup information between two teams\n**/resetmatches**\nReset the Matches database\n**/resetteams**\nReset the Teams database\n**/substitute** [TEAM_NAME] [OLD_PLAYER] [NEW_PLAYER]\nSubstitute a player on a team\n `

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a full list of GoldyBot commands'),
    async execute(interaction) {
        const embed = DiscordService.getSuccessEmbed(`GoldyBot Commands`, COMMANDS_LIST)
        await interaction.editReply({ embeds: [embed] })
    }
}
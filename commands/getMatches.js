/**
 * Slash command to view recent Matches for a specified team
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getmatches')
        .setDescription('Get the recent matches for a specified Team')
        .addStringOption(option => 
            option.setName('team_name')
                .setDescription('The name of the Team')
                .setRequired(true)
        ),
    async execute(interaction) {
        const teamName = interaction.options.getString('team_name')
        const matches = DbService.getMatches(teamName)
        if (matches) {
            let matchesString = ''
            for (let i = 0; i < (await matches).length; i++) {
                matchesString += `${matches.get('team_one')} ${matches.get('team_one_score')} - ${matches.get('team_two')} ${matches.get('team_two_score')}\n${matches.get('event')}\n${matches.get('date')}\n\n`
            }

            const embed = DiscordService.getSuccessEmbed(`${teamName} Recent Matches`, `${matchesString}`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Find Recent Matches`, `Unable to find recent matches for ${teamName}`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
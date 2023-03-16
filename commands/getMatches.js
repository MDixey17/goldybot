/**
 * Slash command to view recent Matches for a specified team
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");
const { UtilityService } = require("../utils/utilityService");

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
        const matches = await DbService.getMatches(teamName)
        if (matches) {
            if (matches.length === 0) {
                const embed = DiscordService.getNoDataEmbed()
                await interaction.editReply({ embeds: [embed] })
                return
            }

            let matchesString = ''
            for (let i = 0; i < matches.length; i++) {
                matchesString += `${matches[i].team_one} ${matches[i].team_one_score} - ${matches[i].team_two_score} ${matches[i].team_two}\n${matches[i].event}\n${UtilityService.getFormattedDate(new Date(matches[i].date))}\n\n`
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
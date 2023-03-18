/**
 * Slash command to delete the last match for a specified team
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletelast')
        .setDescription('Delete the most recent match for a specified team')
        .addStringOption(option => 
            option.setName('team_name')
                .setDescription('The name of the Team')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!DiscordService.checkPermission(interaction)) {
            const embed = DiscordService.getNoPermissionEmbed()
            await interaction.editReply({ embeds: [embed] })
            return
        }
        
        const teamName = interaction.options.getString('team_name')
        if (await DbService.removeLastMatch(teamName)) {
            const embed = DiscordService.getSuccessEmbed(`Successfully Deleted Match`, `Successfully deleted the last match for ${teamName}`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Delete Last Match`, `Unable to delete the last match for ${teamName}! Please make sure you typed the team name correctly and at least one recorded match exists.`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
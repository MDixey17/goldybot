/**
 * Slash command to reset the Matches data table
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService")
const { DiscordService } = require("../utils/discordService")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset the Matches database'),
    async execute(interaction) {
        if (!DiscordService.checkPermission(interaction)) {
            const embed = DiscordService.getNoPermissionEmbed()
            await interaction.editReply({ embeds: [embed] })
            return
        }
        
        await DbService.resetMatches()
        const embed = DiscordService.getSuccessEmbed(`Matches Reset`, `Successfully reset the matches database`)
        await interaction.editReply({ embeds: [embed] })
    }
}
/**
 * Slash command to delete a specific team from the Teams database
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteteam')
        .setDescription('Delete all information regarding the specified Team')
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
        if (await DbService.removeTeamEntry(teamName)) {
            const embed = DiscordService.getSuccessEmbed(`Successfully Deleted Team`, `Successfully deleted all of ${teamName}'s team information!`)
            await interaction.editReply({embeds: [embed]})
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Delete Team`, `Unable to delete team information regarding ${teamName}! Please make sure this information about this team exists and that you entered the team name correctly.`)
            await interaction.editReply({embeds: [embed]})
        }
    }
}
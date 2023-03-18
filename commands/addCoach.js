// Add a coach to a Team that exists in the database

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcoach')
        .setDescription('Add a coach to a team')
        .addStringOption(option =>
            option.setName('team_name')
                .setDescription('The existing team name')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('coach_name')
                .setDescription("The coach's name")
                .setRequired(true)    
        ),
    async execute(interaction) {
        if (!DiscordService.checkPermission(interaction)) {
            const embed = DiscordService.getNoPermissionEmbed()
            await interaction.editReply({ embeds: [embed] })
            return
        }
        
        const teamName = interaction.options.getString('team_name')
        const coach = interaction.options.getString('coach_name')
        if (await DbService.updateTeamCoach(teamName, coach)) {
            const embed = DiscordService.getSuccessEmbed(`Updated ${teamName}'s Coach`, `Successfully updated ${teamName}'s coach to ${coach}`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to add Coach`, `Failed to add/update the coach for ${teamName}! Please make sure ${teamName} exists by using */getteam ${teamName}*`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
/**
 * Slash command to substitute an old player with a new player for a specified team
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService")
const { DiscordService } = require("../utils/discordService")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('substitute')
        .setDescription('Substitute a player for a specified Team')
        .addStringOption(option => 
            option.setName('team_name')
                .setDescription('The name of the Team')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('old_player')
                .setDescription('The name of the player being removed from the team')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('new_player')
                .setDescription('The name of the player being added to the team')
                .setRequired(true)
        ),
    async execute(interaction) {
        const teamName = interaction.options.getString('team_name')
        const oldPlayer = interaction.options.getString('old_player')
        const newPlayer = interaction.options.getString('new_player')

        if (await DbService.updateTeamEntry(teamName, oldPlayer, newPlayer)) {
            const embed = DiscordService.getSuccessEmbed(`Updated ${teamName}'s Information`, `Successfully substituted ${newPlayer} for ${oldPlayer} on ${teamName}!`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Update ${teamName}'s Information`, `Unable to substitute ${newPlayer} for ${oldPlayer} on ${teamName}! Please make sure you have entered the correct information and that the Team exists.`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
/**
 * Slash command to get the final placement of a specified team in a start.gg event
 */

const { SlashCommandBuilder } = require("discord.js");
const { DiscordService } = require("../utils/discordService")
const { StartggService } = require("../utils/startggService")
const { UtilityService } = require("../utils/utilityService")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getplacement')
        .setDescription('Get the final placement in a start.gg event for a specified Team')
        .addStringOption(option => 
            option.setName('tournament_name')
                .setDescription('Tournament name according to start.gg URL')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('event_name')
                .setDescription('Event name according to start.gg URL')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('team_name')
                .setDescription('Name of the Team')
                .setRequired(true)
        ),
    async execute(interaction) {
        const tournamentName = interaction.options.getString('tournament_name')
        const eventName = interaction.options.getString('event_name')
        const teamName = interaction.options.getString('team_name')

        const placement = await StartggService.getEventPlacement(tournamentName, eventName, teamName)
        const officialName = UtilityService.getEventName(eventName)

        if (placement) {
            const embed = DiscordService.getSuccessEmbed(`${teamName}'s Placement`, `${teamName} placed **${placement}** in ${officialName}`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Find Placement`, `Unable to find ${teamName}'s placement in ${officialName}`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
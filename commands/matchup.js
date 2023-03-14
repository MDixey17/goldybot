// A Slash Command to get the matchup between two teams

const { DbService } = require("../utils/dbService")
const { DiscordService } = require("../utils/discordService")
const { UtilityService } = require("../utils/utilityService")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('matchup')
        .setDescription('Get the matchup history between two specified Teams')
        .addStringOption(option =>
            option.setName('team_one')
                .setDescription('Name of Team 1')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('team_two')
                .setDescription('Name of Team 2')
                .setRequired(true)
        ),
    async execute(interaction) {
        const teamOne = interaction.options.getString('team_one')
        const teamTwo = interaction.options.getString('team_two')

        const teamOneRoster = await DbService.getTeam(teamOne)
        const teamTwoRoster = await DbService.getTeam(teamTwo)
        const matchHistory = await DbService.getMatchupHistory(teamOne, teamTwo)

        if (teamOneRoster && teamTwoRoster && matchHistory) {
            const embed = DiscordService.getSuccessEmbed(`${teamOne} vs ${teamTwo}`, `Matchup History`)
            const teamOneDetails = UtilityService.getTeamDetails(teamOneRoster)
            const teamTwoDetails = UtilityService.getTeam(teamTwoRoster)

            embed.addFields(
                { name: teamOne, value: teamOneDetails, inline: true },
                { name: teamTwo, value: teamTwoDetails, inline: true }
            )

            for (let i = 0; i < matchHistory.length && i < 18; i++) {
                embed.addFields(
                    { name: `${matchHistory[i].get('team_one')} ${matchHistory[i].get('team_one_score')} - ${matchHistory[i].get('team_two_score')} ${matchHistory[i].get('team_two')}`, value: `${matchHistory[i].get('event')}\n${matchHistory[i].get('date')}`, inline: false }
                )
            }

            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Find Matchup History`, `There is no known match history between ${teamOne} and ${teamTwo}.`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
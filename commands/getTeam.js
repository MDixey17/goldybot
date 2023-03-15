/**
 * Slash command to view the roster of a specified Team
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getteam')
        .setDescription('Get information about a specific team')
        .addStringOption(option => 
            option.setName('team_name')
                .setDescription('The team name. It can be the official team name or one of their known aliases.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const teamName = interaction.options.getString('team_name')
        const teamObject = await DbService.getTeam(teamName)
        if (teamObject) {
            let rosterString = ''
            if (teamObject.player_one !== '-') {
                rosterString += teamObject.player_one + "\n"
            }
            if (teamObject.player_two !== '-') {
                rosterString += teamObject.player_two + "\n"
            }
            if (teamObject.player_three !== '-') {
                rosterString += teamObject.player_three + "\n"
            }
            if (teamObject.player_four !== '-') {
                rosterString += teamObject.player_four + "\n"
            }
            if (teamObject.player_five !== '-') {
                rosterString += teamObject.player_five + "\n"
            }
            if (teamObject.player_six !== '-') {
                rosterString += teamObject.player_six + "\n"
            }
            if (teamObject.coach !== null && teamObject.coach !== 'null') {
                rosterString += "*Coach: " + teamObject.coach + "*\n"
            }

            let teamAliases = teamObject.aliases
            if (teamAliases) {
                rosterString += "\n**Alternate Names / Aliases**\n"
                aliasesList = teamAliases.split(',')
                for (let i = 0; i < aliasesList.length; i++) {
                    if (aliasesList[i] !== teamName) {
                        rosterString += aliasesList[i] + "\n"
                    }
                    else {
                        // The inputted name was an alias, so let's add the official team name instead
                        rosterString += teamObject.team_name + "\n"
                    }
                }
            }

            const embed = DiscordService.getSuccessEmbed(`${teamName} Information`, `**Roster**\n${rosterString}`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Cannot find ${teamName}`, `Could not find any team information for ${teamName}`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
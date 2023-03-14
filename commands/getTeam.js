/**
 * Slash command to view the roster of a specified Team
 */

const { SlashCommandBuilder } = require("discord.js");
const { GREEN_COLOR, RED_COLOR } = require("../constants/colors");
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
            if (teamObject.get('player_one') !== '-') {
                rosterString += teamObject.get('player_one') + "\n"
            }
            if (teamObject.get('player_two') !== '-') {
                rosterString += teamObject.get('player_two') + "\n"
            }
            if (teamObject.get('player_three') !== '-') {
                rosterString += teamObject.get('player_three') + "\n"
            }
            if (teamObject.get('player_four') !== '-') {
                rosterString += teamObject.get('player_four') + "\n"
            }
            if (teamObject.get('player_five') !== '-') {
                rosterString += teamObject.get('player_five') + "\n"
            }
            if (teamObject.get('player_six') !== '-') {
                rosterString += teamObject.get('player_six') + "\n"
            }
            if (teamObject.get('coach') !== null && teamObject.get('coach') !== 'null') {
                rosterString += "*Coach: " + teamObject.get('coach') + "*\n"
            }

            let teamAliases = teamObject.get('aliases')
            if (teamAliases) {
                rosterString += "\n**Alternate Names / Aliases**\n"
                aliasesList = teamAliases.split(',')
                for (let i = 0; i < aliasesList.length; i++) {
                    if (aliasesList[i] !== teamName) {
                        rosterString += aliasesList[i] + "\n"
                    }
                    else {
                        // The inputted name was an alias, so let's add the official team name instead
                        rosterString += teamObject.get('team_name') + "\n"
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
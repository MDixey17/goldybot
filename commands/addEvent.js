/**
 * Slash command to add a start.gg event to the Matches database
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");
const { StartggService } = require("../utils/startggService");
const { UtilityService } = require("../utils/utilityService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addevent')
        .setDescription('Add all the matches and teams from a start.gg event')
        .addStringOption(option => 
            option.setName('tournament_name')
                .setDescription('Tournament name according to start.gg URL')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('event_name')
                .setDescription('Event name according to start.gg URL')
                .setRequired(true)
        ),
        async execute(interaction) {
            const tournamentName = interaction.options.getString('tournament_name')
            const eventName = interaction.options.getString('event_name')
            const storedName = UtilityService.getEventName(eventName)

            // Get matches and add them
            const eventMatches = await StartggService.getEventMatches(tournamentName, eventName)
            let failCounter = 0
            for (let i = 0; i < eventMatches.length; i++) {
                if (!(await DbService.addMatchEntry(eventMatches[i], storedName))) {
                    // ERROR: if this passes to more than 33% of matches, we should stop
                    failCounter += 1
                }
            }

            if (failCounter >= eventMatches.length / 3) {
                const embed = DiscordService.getFailedEmbed(`start.gg Error`, `Data retrieval failed. Please try again! If this persists, please contact a developer.`)
                await interaction.editReply({ embeds: [embed] })
                return
            }

            // Get teams
            const eventTeams = await StartggService.getEventRosters(tournamentName, eventName)
            failCounter = 0
            for (let i = 0; i < eventTeams.length; i++) {
                if (!(await DbService.addTeamEntry(eventTeams[i]))) {
                    // ERROR: if this passes to more than 33% of teams, we should stop
                    failCounter += 1
                }
            }

            if (failCounter >= eventMatches.length / 3) {
                const embed = DiscordService.getFailedEmbed(`start.gg Error`, `Data retrieval failed. Please try again! If this persists, please contact a developer.`)
                await interaction.editReply({ embeds: [embed] })
                return
            }

            const embed = DiscordService.getSuccessEmbed(`Successfully Added start.gg Event`, `Successfully added teams and matches from the provided start.gg event!`)
            await interaction.editReply({ embeds: [embed] })
        }
}
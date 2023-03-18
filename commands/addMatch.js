/**
 * Slash command to manually add a match to the Matches database
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");
const { UtilityService } = require("../utils/utilityService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addmatch')
        .setDescription('Add a single match to the database')
        .addStringOption(option => 
            option.setName('team_one')
                .setDescription('Team 1 in the completed match')
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('team_one_score')
                .setDescription(`Team 1's series score in the completed match`)
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('team_two')
                .setDescription('Team 2 in the completed match')
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('team_two_score')
                .setDescription(`Team 2's series score in the completed match`)
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('event')
                .setDescription('The event name where the match was played')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('date')
                .setDescription('The date the match was played in mm-dd-yyyy format')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (!DiscordService.checkPermission(interaction)) {
            const embed = DiscordService.getNoPermissionEmbed()
            await interaction.editReply({ embeds: [embed] })
            return
        }
        
        const teamOne = interaction.options.getString('team_one')
        const teamOneScore = interaction.options.getInteger('team_one_score')
        const teamTwo = interaction.options.getString('team_two')
        const teamTwoScore = interaction.options.getInteger('team_two_score')
        const eventName = interaction.options.getString('event')
        let dateInput = null
        if (interaction.options.getString('date')) {
            dateInput = interaction.options.getString('date')
            if (!UtilityService.checkDate(dateInput)) {
                const badInputEmbed = DiscordService.getFailedEmbed(`Invalid Date`, `There was an error with the provided date. Please make sure it follows the MM-DD-YYYY format!`)
                await interaction.editReply({ embeds: [badInputEmbed] })
                return
            }
        }

        if (await DbService.addMatchEntry({teamOne: teamOne, teamOneScore: teamOneScore, teamTwo: teamTwo, teamTwoScore: teamTwoScore, date: dateInput}, eventName)) {
            const embed = DiscordService.getSuccessEmbed(`Successfully Added Match`, `Successfully added the provided match information!`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to Add Match`, `Unable to add the provided match information! Please try again later.`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
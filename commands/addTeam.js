/**
 * Slash command to manually add a team to the Teams database
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addteam')
        .setDescription('Add a team of up to 6 players, 1 coach, and aliases')
        .addStringOption(option =>
            option.setName('team_name')
                .setDescription('The name of the team')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('player_one')
                .setDescription('The captain of the team')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('player_two')
                .setDescription('The 2nd player of the team')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('player_three')
                .setDescription('The 3rd player of the team')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('player_four')
                .setDescription('The 4th player of the team')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('player_five')
                .setDescription('The 5th player of the team')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('player_six')
                .setDescription('The 6th player of the team')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('coach')
                .setDescription('The coach for the team')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('aliases')
                .setDescription('Alternate team names, separated by commas')
                .setRequired(false)
        ),
        async execute(interaction) {
            if (!DiscordService.checkPermission(interaction)) {
                const embed = DiscordService.getNoPermissionEmbed()
                await interaction.editReply({ embeds: [embed] })
                return
            }
            
            const teamName = interaction.options.getString('team_name')
            const p1 = interaction.options.getString('player_one')
            const p2 = interaction.options.getString('player_two')
            const p3 = interaction.options.getString('player_three')
            const p4 = interaction.options.getString('player_four') ?? "-"
            const p5 = interaction.options.getString('player_five') ?? "-"
            const p6 = interaction.options.getString('player_six') ?? "-"
            const coach = interaction.options.getString('coach') ?? ''
            const aliases = interaction.options.getString('aliases') ?? ''

            if (!aliases.endsWith(',') && aliases.length > 0) {
                aliases += ','
            }

            if (await DbService.addTeamEntry({teamName: teamName, p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6, coach: coach, aliases: aliases})) {
                const embed = DiscordService.getSuccessEmbed(`Successfully Added Team`, `Successfully added the provided team. Note that this can be updated later if the team changes.`)
                await interaction.editReply({ embeds: [embed] })
            }
            else {
                const embed = DiscordService.getFailedEmbed(`Failed to Add Team`, `Unable to add the team! Please check your inputs and try again later.`)
                await interaction.editReply({ embeds: [embed] })
            }
        }
}
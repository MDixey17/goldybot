// Slash command to reset the Teams database

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService")
const { DiscordService } = require("../utils/discordService")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resetteams')
        .setDescription('Reset the Teams database'),
    async execute(interaction) {
        await DbService.resetTeams()
        const embed = DiscordService.getSuccessEmbed(`Teams Reset`, `Successfully reset the teams database`)
        await interaction.editReply({ embeds: [embed] })
    }
}
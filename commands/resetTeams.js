// Slash command to reset the Teams database

const { DbService } = require("../utils/dbService")
const { DiscordService } = require("../utils/discordService")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset the Matches database'),
    async execute(interaction) {
        await DbService.resetTeams()
        const embed = DiscordService.getSuccessEmbed(`Teams Reset`, `Successfully reset the teams database`)
        await interaction.editReply({ embeds: [embed] })
    }
}
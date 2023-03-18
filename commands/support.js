const { SlashCommandBuilder } = require("discord.js");
const { DiscordService } = require("../utils/discordService");

const SUPPORT_MESSAGE = `*Problem running a command?*\nReach out to one of the developers listed at the bottom of this message and provide (1) the command you are trying to execute and (2) the expected response.\n\n*Want to support the developers?*\nBecome a patreon [here!](https://www.patreon.com/titanhawk17)\n\n*Have a feature that would improve GoldyBot?*\nWe want to hear your ideas! Reach out to one of the developers and let us know.\n\n*Developers:*\nTitanHawk17#4522`

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Get support information for GoldyBot such as developer contacts, contributing, etc'),
    
    async execute(interaction) {
        const embed = DiscordService.getSuccessEmbed(`Support`, SUPPORT_MESSAGE)
        await interaction.editReply({ embeds: [embed] })
    }
}
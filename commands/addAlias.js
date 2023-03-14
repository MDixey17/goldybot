/**
 * Slash command to add an alias (or alternate name) to a Team
 */

const { SlashCommandBuilder } = require("discord.js");
const { DbService } = require("../utils/dbService");
const { DiscordService } = require("../utils/discordService");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addalias')
        .setDescription('Add an alias or alternate name to a team')
        .addStringOption(option =>
            option.setName('team_name')
                .setDescription('The existing team name')
                .setRequired(true)
            )
        .addStringOption(option => 
            option.setName('alias')
                .setDescription('The alias or alternative name for the provided team')
                .setRequired(true)
            ),
    async execute(interaction) {
        const teamName = interaction.options.getString('team_name')
        const alias = interaction.options.getString('alias')
        if (await DbService.updateTeamAlias(teamName, alias)) {
            const embed = DiscordService.getSuccessEmbed(`Successfully added alias for ${teamName}`, `Successfully added the alias ${alias} for ${teamName}. You can view the full list of aliases by using */getteam ${teamName}* or */getteam ${alias}*`)
            await interaction.editReply({ embeds: [embed] })
        }
        else {
            const embed = DiscordService.getFailedEmbed(`Failed to add alias for ${teamName}`, `Failed to add the alias ${alias} for ${teamName}. Please make sure ${teamName} is already stored in the database by using */getteam ${teamName}* and ${alias} has not been previously added as an alias`)
            await interaction.editReply({ embeds: [embed] })
        }
    }
}
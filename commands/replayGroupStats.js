const { SlashCommandBuilder } = require("discord.js");
const { BallchasingService } = require("../utils/ballchasingService");
const { DiscordService } = require("../utils/discordService");
const { UtilityService } = require("../utils/utilityService");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('replaygroupstats')
        .setDescription('Get the stats of a specific player from a Ballchasing Replay Group')
        .addStringOption(option =>
            option.setName('player_name')
                .setDescription('The in-game name of the player')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('ballchasing_link')
                .setDescription('The link to the Ballchasing replay group')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('flag')
                .setDescription('An optional flag to specify which dataset to return')
                .setRequired(false)
                .addChoices(
                    { name: 'Core', value: 'core' },
                    { name: 'Boost', value: 'boost' },
                    { name: 'Movement', value: 'movement' },
                    { name: 'Positioning', value: 'positioning' }
                )    
        ),
    
        async execute(interaction) {
            const playerName = interaction.options.getString('player_name')
            const bcGroupId = interaction.options.getString('ballchasing_link').split('/').at(-1)
            const statsFlag = interaction.options.getString('flag') ?? 'general'

            // Get the data depending on the statsFlag
            const data = await BallchasingService.getBallchasingData(statsFlag, bcGroupId, playerName, true)
            const groupName = await BallchasingService.getBallchasingName(bcGroupId, true)
            let embed
            
            if (data) {
                if (statsFlag === 'general') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay Group *General* Stats`, `*${groupName}*\n` + UtilityService.parseGeneralStats(data, true))
                } else if (statsFlag === 'core') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay Group *Core* Stats`, `*${groupName}*\n` + UtilityService.parseCoreStats(data, true))
                } else if (statsFlag === 'boost') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay Group *Boost* Stats`, `*${groupName}*\n` + UtilityService.parseBoostStats(data, true))
                } else if (statsFlag === 'movement') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay Group *Movement* Stats`, `*${groupName}*\n` + UtilityService.parseMovementStats(data, true))
                } else {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay Group *Positioning* Stats`, `*${groupName}*\n` + UtilityService.parsePositioningStats(data, true))
                }
            }
            else {
                embed = DiscordService.getNoDataEmbed()
            }

            await interaction.editReply({ embeds: [embed] })

        }
}
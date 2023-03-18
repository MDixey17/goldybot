const { SlashCommandBuilder } = require("discord.js");
const { BallchasingService } = require("../utils/ballchasingService");
const { DiscordService } = require("../utils/discordService");
const { UtilityService } = require("../utils/utilityService");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('replaystats')
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
            const bcReplayId = interaction.options.getString('ballchasing_link').split('/').at(-1).split('?').at(0)
            const statsFlag = interaction.options.getString('flag') ?? 'general'

            const data = await BallchasingService.getBallchasingData(statsFlag, bcReplayId, playerName, false)
            const replayName = await BallchasingService.getBallchasingName(bcReplayId, false)
            let embed = DiscordService.getNoDataEmbed()

            if (data) {
                if (statsFlag === 'general') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay *General* Stats`, `*${replayName}*\n` + UtilityService.parseGeneralStats(data, false))
                } else if (statsFlag === 'core') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay *Core* Stats`, `*${replayName}*\n` + UtilityService.parseCoreStats(data, false))
                } else if (statsFlag === 'boost') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay *Boost* Stats`, `*${replayName}*\n` + UtilityService.parseBoostStats(data, false))
                } else if (statsFlag === 'movement') {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay *Movement* Stats`, `*${replayName}*\n` + UtilityService.parseMovementStats(data, false))
                } else {
                    embed = DiscordService.getSuccessEmbed(`${playerName}'s Replay *Positioning* Stats`, `*${replayName}*\n` + UtilityService.parsePositioningStats(data, false))
                }
            }
            await interaction.editReply({ embeds: [embed] })
        }
}
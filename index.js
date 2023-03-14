/**
 * The main file for testing GoldyBot. Developers can run this file locally to test their changes.
 * This file will be constantly running when deployed to a cloud hosting platform.
 */

const fs = require('node:fs')
const path = require('node:path')
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const { DbService } = require('./utils/dbService');
const { DiscordService } = require('./utils/discordService');
require("dotenv").config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file in commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filepath)
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    }
    else {
        console.log(`WARNING: The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

client.once('ready', async () => {
    console.log('Removing outdated information...')
    await DbService.removeOutdatedEntries()
    console.log('GoldyBot online!')
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found!`)
        return
    }

    if (interaction.channel.name !== "goldybot") {
        const channelEmbed = DiscordService.getChannelEmbed()
        await interaction.reply({ embeds: [channelEmbed] })
        return
    }

    interaction.deferReply()
    try {
        await command.execute(interaction)
    } catch (err) {
        console.log(err)
        const errorEmbed = DiscordService.getErrorEmbed()
        await interaction.editReply({ embeds: [errorEmbed] })
    }
})

client.login(process.env.DISCORD_TOKEN)
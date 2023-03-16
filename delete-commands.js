/**
 * Delete all commands that GoldyBot is capable of so they may not be recognized by Discord Guilds/Servers
 */

const { REST, Routes } = require('discord.js');
require('dotenv').config()

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.TEST_GUILD_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error)
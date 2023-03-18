const { EmbedBuilder } = require('discord.js')
const { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } = require("../constants/colors")
require('dotenv').config()

const createEmbed = (
    color,
    title,
    url,
    author,
    description,
    thumbnail,
    fields
) => {
    const embed = new EmbedBuilder()
    if (color !== null) {
        embed.setColor(color)
    }
    if (title !== null && title.length < 256) {
        embed.setTitle(title)
    }
    if (url !== null) {
        embed.setURL(url)
    }
    if (author !== null && author.length < 256) {
        embed.setAuthor(author)
    }
    if (description !== null && description.length < 4096) {
        embed.setDescription(description)
    }
    if (thumbnail !== null) {
        embed.setThumbnail(thumbnail)
    }
    if (fields !== null && fields.length < 26) {
        embed.addFields(fields)
    }
    return embed
}

const getSuccessEmbed = (title, description) => {
    return createEmbed(GREEN_COLOR, title, null, null, description, null, null)
}

const getFailedEmbed = (title, description) => {
    return createEmbed(RED_COLOR, title, null, null, description, null, null)
}

const getErrorEmbed = () => {
    return createEmbed(RED_COLOR, `Unexpected Error`, null, null, `An unexpected error has occurred. If this persists, please contact a developer!`, null, null)
}

const getChannelEmbed = () => {
    return createEmbed(RED_COLOR, `Wrong Channel`, null, null, `Please use the #goldybot text channel!`, null, null)
}

const getStartggEmbed = () => {
    return createEmbed(RED_COLOR, `start.gg API Failure`, null, null, `The start.gg API failed to retrieve and send back the requested data. Please wait before trying again!`, null, null)
}

const getNoDataEmbed = () => {
    return createEmbed(YELLOW_COLOR, `No Data Found`, null, null, `No data was found with that command!`, null, null)
}

const getNoPermissionEmbed = () => {
    return createEmbed(RED_COLOR, `Permission Denied`, null, null, `You do not have permission to execute this command!`, null, null)
}

/** 
 * IMPORTANT: This function is to check if a user is in a secret Discord server with a specific role!
 * Returning false from here implies the user does NOT have "write" access to the database and can only
 * execute "read" commands
 */
const checkPermission = (interaction) => {
    if (interaction.guildId === process.env.SECRET_GUILD_ID) {
        // User is in the server, but do they have the role
        if (interaction.member.roles.cache.some(role => role.name === "GoldyBot Master")) {
            // User does have permission to execute the command
            return true
        }
    }

    return false // User does not have permission
}

module.exports = {
    DiscordService: {
        createEmbed,
        getSuccessEmbed,
        getFailedEmbed,
        getErrorEmbed,
        getChannelEmbed,
        getStartggEmbed,
        getNoDataEmbed,
        getNoPermissionEmbed,
        checkPermission
    }
}
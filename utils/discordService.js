import { EmbedBuilder } from "discord.js"
import { GREEN_COLOR, RED_COLOR } from "../constants/colors"

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

export const DiscordService = {
    createEmbed,
    getSuccessEmbed,
    getFailedEmbed,
    getErrorEmbed,
    getChannelEmbed,
}
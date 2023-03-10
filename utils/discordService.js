import { EmbedBuilder } from "discord.js"

/**
 * 
 * @param {(String) A hex value that represents a color} color 
 * @param {(String) The title at the top of the Embed} title 
 * @param {(String) A link that users will go to when they click on the Embed} url 
 * @param {(String) The name of the author} author 
 * @param {(String) Text that will be displayed in the Embed} description 
 * @param {(String) The image path/URL that will be displayed in the Embed as a small image} thumbnail 
 * @param {({name: String, value: String, inline: Boolean}) Up to 25 subsections to the Embed} fields 
 * @returns The resulting Discord Embed object
 */
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

export const DiscordService = {
    createEmbed,
}
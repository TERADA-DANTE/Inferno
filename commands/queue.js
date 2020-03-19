// Require package
const {
    MessageEmbed
} = require(`discord.js`)
const ytdl = require('ytdl-core')

// Queue function
exports.run = (client, message, args, option) => {
    // Check if inferno is in voice channel
    if (!message.guild.me.voice.channel) return

    // Check if user is in "same" voice channel
    if (!message.member.voice.channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.reply('Inferno is in another channel 📶')

    // Variables
    const {
        servers
    } = option

    if (servers[message.guild.id]) {
        const server = servers[message.guild.id]
        const data = {
            playlist: [],
            count: 1,
        }
        message.reply("`Playlist Loading...`")
        queue(message, server, data)
    }
}

// Define queue function
async function queue(message, server, data) {
    // async await loop
    for (const item of server.queue) {
        const musicInfo = await ytdl.getBasicInfo(item)
        // To show queue requestor, need to modify server.queue. it has contain requester when requested
        data.playlist.push(`${data.count}. ${musicInfo.title}\n`)
        data.count++
    }
    // Send Message 
    const embed = new MessageEmbed()
        .setTitle('Current playlist')
        .setColor(0x00ccff)
        .setDescription(data.playlist)
    message.channel.send(embed)
}
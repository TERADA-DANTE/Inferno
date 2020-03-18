// Require package
const {
    MessageEmbed
} = require(`discord.js`)

// leave function
exports.run = (client, message, args, option) => {
    // Check if bot is in voice channel
    if (!message.guild.me.voice.channel) return

    // Variables
    const {
        servers
    } = option
    const server = servers[message.guild.id]

    // Check if user is in "same" voice channel
    if (!message.member.voice.channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.reply('Inferno is in another channel 📶')

    // Leave channel
    message.guild.me.voice.channel.leave()
    // clear queue
    server.queue = []

    // Send message
    const embed = new MessageEmbed()
        .setTitle('Bye...')
        .setColor(0x00ccff)
        .setDescription(`⏹ see you again`)
    message.channel.send(embed)
}
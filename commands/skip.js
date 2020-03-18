// Require package
const {
    MessageEmbed
} = require(`discord.js`)

// Skip function

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
        // Variables
        const server = servers[message.guild.id]

        // Send message
        if (server.queue[0]) {
            const embed = new MessageEmbed()
                .setTitle('Music skip')
                .setColor(0x00ccff)
                .setDescription(`⏩`)
            message.channel.send(embed)
        }

        // Stop current dispatcher
        if (server.dispatcher) server.dispatcher.end()
    }
}
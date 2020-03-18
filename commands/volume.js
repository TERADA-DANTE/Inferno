// Require package
const {
    MessageEmbed
} = require(`discord.js`)

// Volume function
exports.run = (client, message, args, option) => {

    // Check if user is in "same" voice channel
    if (!message.member.voice.channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.reply('Inferno is in another channel 📶')

    // Variable
    const {
        servers
    } = option

    if (servers[message.guild.id]) {
        // Variables
        const server = servers[message.guild.id]

        if (server.queue[0]) {
            if (!(args[1]) || args[1] > 200 || args[1] < 0) {
                const embed = new MessageEmbed()
                    .setTitle('Volume range')
                    .setColor(0x00ccff)
                    .setDescription(`☑ 0 ~ 200`)
                message.channel.send(embed)
                return
            }

            // Control volume
            server.dispatcher.setVolume(args[1] / 100)

            // Send message
            const embed = new MessageEmbed()
                .setTitle('Current Volume')
                .setColor(0x00ccff)
                .setDescription(`☑ ${args[1]} (Default : 30)`)
            message.channel.send(embed)
        }
    }
}
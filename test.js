// Import 
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const ytdl = require('ytdl-core')
//

// Variables
const queue = new Map()
//

// Login
client.login(config.TOKEN)
//

// Server status
client.once('ready', () => {
    client.user.setActivity('Danteが作る最中')
    console.log('Ready!')
})
client.once('reconneting', () => {
    console.log('reconnecting!')
})
client.once('disconnect', () => {
    console.log('Disconnect!')
})
//


// Main 
client.on('message', async message => {
    // Queue variables
    const guildQueue = queue.set('id', message.guild.id)

    // Voice only works in guilds, if the message does not come from a guild,
    if (!message.guild) return;

    // Command
    if (message.content.startsWith('=')) {
        switch (message.content) {
            // join the voice channel
            case '=join':
                execute(message, guildQueue)
                // leave the voice channel channel
            case '=out':
            case '=disconnect':
                execute(message, guildQueue)
            case '=play':
                execute(message, guildQueue)
                break
        }
    }
    // Only works user is in voice channel
})

async function execute(message, guildQueue) {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) {
        message.reply('You need to join a voice channel first! 🚸')
        return false
    } else {
        switch (message.content) {
            case '=join':
                await voiceChannel.join()
                break
            case '=out':
            case '=disconnect':
                await voiceChannel.leave()
                break
            case '=play':
                return message.reply('=play <WHAT TO PLAY🎵>')
                const connection = await voiceChannel.join()
                connection.play(ytdl('https://www.youtube.com/watch?v=wqeJ5Vkb6JE', {
                    filter: 'audioonly'
                }))
                break
        }

    }
}
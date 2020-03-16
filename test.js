// Import 
const {
    Client,
    MessageEmbed
} = require(`discord.js`)
const client = new Client()
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
        const command = message.content.split(' ')[0]
        switch (command) {
            case '=play':
                execute(message, guildQueue)
                break
            case '=skip':
                execute(message, guildQueue)
                break
            case '=stop':
                execute(message, guildQueue)
                break
            case '=clear':
                execute(message, guildQueue)
                break
            case '=join':
                execute(message, guildQueue)
                break
            case '=out':
            case '=disconnect':
                execute(message, guildQueue)
                break
            default:
                message.channel.send('Invalid command!')
                break
        }
    }
})

async function execute(message, guildQueue) {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) {
        message.reply('You need to join a voice channel first! 🚸')
        return
    } else {
        const command = message.content.split(' ')[0]
        switch (command) {
            case '=play':
                if (!message.content.split(' ')[1]) {
                    return message.reply('=play WHAT TO PLAY🎵')
                } else {
                    const regExp = /youtube/i
                    if (regExp.test(message.content.split(' ')[1])) {
                        const connection = await voiceChannel.join()
                        const musicInfo = await ytdl.getInfo(message.content.split(' ')[1])
                        const music = {
                            title: musicInfo.title,
                            url: musicInfo.video_url,
                            length: `${Math.floor(musicInfo.length_seconds/60)}min ${musicInfo.length_seconds%60}sec`
                        }
                        message.channel.send(embedMessage({
                            content: "=play",
                            musicInfo: music
                        }))
                        connection.play(ytdl('https://www.youtube.com/watch?v=wqeJ5Vkb6JE', {
                            filter: 'audioonly'
                        }))
                    } else {
                        console.log('not defined')
                        return
                    }
                }
                break
            case '=join':
                // ⚠ client.voice.connections.size == 0 => false 
                // bot greets when it comes to the first
                if (client.voice.connections.size === 0) {
                    await voiceChannel.join()
                    message.channel.send(embedMessage(message))
                } else {
                    await voiceChannel.join()
                }
                break

            case '=out':
            case '=disconnect':
                if (client.voice.connections.size === 0) {
                    return
                } else {
                    await voiceChannel.leave()
                    message.channel.send(embedMessage(message))
                }
                break
        }
    }
}

function embedMessage(message) {
    switch (message.content) {
        case '=play':
            let embedPlay = new MessageEmbed()
                .setTitle(message.musicInfo.title)
                .setColor(0x00ccff)
                .setDescription(message.musicInfo.length)
            return embedPlay
        case '=join':
            let embedJoin = new MessageEmbed()
                .setTitle('Hello! This is Inferno 🔥')
                .setColor(0x00ccff)
                .setDescription('You can check "=help" for commands')
            return embedJoin
        case '=out':
        case 'disconect':
            let embedOut = new MessageEmbed()
                .setTitle('Bye 😢')
                .setColor(0x00ccff)
                .setDescription('See you again')
            return embedOut
    }

}
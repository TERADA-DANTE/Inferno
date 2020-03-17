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
const servers = {}
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
client.on('message', message => {

    // Voice only works in guilds, if the message does not come from a guild,
    if (!message.guild) return

    // Command
    if (message.content.startsWith('=')) {
        const args = message.content.split(' ')
        switch (args[0]) {
            // COMMAND - =play
            case '=play':
                // Only '=play'
                if (!args[1]) {
                    message.reply('=play WHAT TO PLAY🎵')
                    return
                }
                // 'Member not in voice channel
                if (!message.member.voice.channel) {
                    message.reply('You need to join a voice channel first! 🚸')
                    return
                }
                // server identity set
                if (!servers[message.guild.id]) {
                    servers[message.guild.id] = {
                        queue: []
                    }
                }
                // variable for queue
                var server = servers[message.guild.id]

                // Youtube link check
                if (/[a-zA-Z0-9-_]{11}/.test(args[1]) === false) {
                    // this is not youtube link
                    message.reply("this is not a youtube link!")
                } else {
                    // this is youtube link
                    // bot comes in voice channel
                    // it returns promise(connection)
                    // so it has to be called ALWAYS!
                    message.member.voice.channel.join()
                        .then((connection) => {
                            if (server.queue[0]) {
                                server.queue.push(args[1])
                                message.reply("Your music added to Playlist 💙")
                            } else {
                                server.queue.push(args[1])
                                play(connection, message)
                            }
                        })
                }
                break
            case '=skip':
                var server = servers[message.guild.id]
                if (server.dispatcher) server.dispatcher.end()
                break
            case '=stop':
                execute(message, servers)
                break
            case '=clear':
                execute(message, servers)
                break
            case '=join':
                execute(message)
                break
            case '=out':
            case '=disconnect':
                execute(message)
                break
            default:
                message.channel.send('Invalid command!')
                break
        }
    }
    // COMMAND - =play
    async function play(connection, message) {
        // variables
        var server = servers[message.guild.id]
        const songInfo = await ytdl.getInfo(server.queue[0])
        const stream = ytdl(server.queue[0])

        // streaming
        server.dispatcher = connection.play(stream, {
            filter: "audioonly"
        })

        // song info
        message.channel.send(embedMessage({
            content: '=play',
            songInfo: {
                desc: songInfo.title,
            }
        }))


        // handleFinish
        server.dispatcher.on('finish', () => {
            //queue shift
            server.queue.shift()

            if (server.queue[0]) {
                play(connection, message)
            } else {
                // queue end
                message.channel.send("Playlist is clear ✅")
            }
        })
    }
})

function execute(message) {
    const args = message.content.split(' ')
    switch (args[0]) {
        case '=join':
            // ⚠ client.voice.connections.size == 0 => false 
            // bot greets when it comes to the first
            if (!client.voice.connections.size) {
                message.member.voice.channel.join()
                message.channel.send(embedMessage(message))
            } else return
            break

        case '=out':
        case '=disconnect':
            if (client.voice.connections.size) {
                message.member.voice.channel.leave()
                message.channel.send(embedMessage(message))
            } else return
            break
    }
}


function embedMessage(message) {
    const args = message.content.split(' ')
    switch (args[0]) {
        case '=play':
            const embedPlay = new MessageEmbed()
                .setTitle('You are listening to ...')
                .setColor(0x00ccff)
                .setDescription(`${message.songInfo.desc}`)
            return embedPlay
        case '=join':
            const embedJoin = new MessageEmbed()
                .setTitle('Hello! This is Inferno 🔥')
                .setColor(0x00ccff)
                .setDescription('You can check "=help" for commands')
            return embedJoin
        case '=out':
        case '=disconect':
            const embedOut = new MessageEmbed()
                .setTitle('Bye 😢')
                .setColor(0x00ccff)
                .setDescription('See you again')
            return embedOut
    }

}
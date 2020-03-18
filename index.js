// Import 
const {
    Client,
    MessageEmbed
} = require(`discord.js`)
const client = new Client()
const config = require('./config')
const ytdl = require('ytdl-core')

// Variables
const servers = {}

// Login
client.login(config.TOKEN)

// Server status
client.once('ready', () => {
    client.user.setActivity('Danteがバグ探し')
    console.log('Ready!')
})
client.once('reconneting', () => {
    client.user.setActivity('Infernoが布団から飛び出し')
    console.log('reconnecting!')
})
client.once('disconnect', () => {
    // meaningless
    client.user.setActivity('Inferno is sleeping')
    console.log('Disconnect!')
})

// Main 
client.on('message', message => {
    // Voice only works in guilds, if the message does not come from a guild,
    if (!message.guild) return

    // Command
    if (message.content.startsWith('=')) {
        const args = message.content.split(' ')

        switch (args[0]) {
            // COMMAND - =play
            // ⚠ play function needs to be idealized
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

                // set volume
            case '=volume':
                volume(message)
                break

                // skip one track
            case '=skip':
                skip(message)
                break

                // clear playlist 
            case '=clear':
                clear(message)
                break

                // join
            case '=join':
                join(message)
                break

                // out
            case '=out':
            case '=disconnect':
                out(message)
                break

                // qeue
            case '=queue':
                queue(message)
                break

                //help
            case '=help':
                help(message)
                break

                //default - invaild command
            default:
                message.channel.send(embedMessage(message))
                break
        }
    }

    // Below is COMMAND function
    // COMMAND - =play
    async function play(connection, message) {
        // variables
        var server = servers[message.guild.id]
        const songInfo = await ytdl.getBasicInfo(server.queue[0])
        const stream = ytdl(server.queue[0])

        // streaming
        server.dispatcher = connection.play(stream, {
            filter: "audioonly",
        })

        // default volume : 30
        server.dispatcher.setVolume(30 / 100)

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
                message.channel.send("Playlist end ✅")
                setTimeout(() => {
                    if (client.voice.connections.size) {
                        message.channel.send("Inferno is going to sleep 💤")
                        message.member.voice.channel.leave()
                    }
                }, 60000)
            }
        })
    }

    // COMMAND - =skip
    function skip(message) {
        if (servers[message.guild.id]) {
            var server = servers[message.guild.id]
            if (server.queue[0]) message.channel.send("Music Skipped...")
            if (server.dispatcher) server.dispatcher.end()
        }
    }

    // COMMAND - =clear
    function clear(message) {
        if (servers[message.guild.id]) {
            var server = servers[message.guild.id]
            if (server.queue[0]) {
                message.channel.send("Playlist clear ☑")
                server.queue = []
            }
        }
    }

    // COMMAND - =volume
    function volume(message) {
        if (servers[message.guild.id]) {
            const args = message.content.split(' ')
            if (server.queue[0]) {
                if (!(args[1]) || args[1] > 200 || args[1] < 0) {
                    message.reply("Hey 💥 Volume range: 0 ~ 200")
                    return
                }
                server.dispatcher.setVolume(args[1] / 100)
                message.channel.send(`Current Volume : ${args[1]} <0 ~ 200>`)
            }
        }
    }

    // COMMAND - =join
    function join(message) {
        if (message.member.voice.channel !== message.guild.me.voice.channel) {
            message.member.voice.channel.join()
            message.channel.send(embedMessage(message))
        } else return
    }

    // COMMAND - =queue
    async function queue(message) {
        if (servers[message.guild.id] && message.guild.me.voice.channel) {
            var server = servers[message.guild.id]
            const playlist = []
            let count = 1
            message.reply("Playlist Loading...")

            // async await loop
            for (const item of server.queue) {
                const musicInfo = await ytdl.getBasicInfo(item)
                playlist.push(`${count}. ${musicInfo.title}\n`)
                count++
            }

            // queue info
            message.channel.send(embedMessage({
                content: '=queue',
                queueInfo: {
                    desc: playlist,
                }
            }))
        } else {
            return
        }
    }
    // COMMAND - =out, =disconnect ⚠ this commands clear the queue
    function out(message) {
        if (message.member.voice.channel === message.guild.me.voice.channel) {
            if (servers[message.guild.id]) {
                var server = servers[message.guild.id]
                server.queue = []
                message.member.voice.channel.leave()
            } else {
                message.member.voice.channel.leave()
            }
        } else return
    }

    function help(message) {
        message.channel.send("```ini\n[Hello, This is Inferno.]```")
        message.channel.send("```css\n= is Inferno's command syntax\n[< > should be ignored]```")
        message.channel.send("```ini\n[1. =play <Youtube-link>]\n - It plays provided youtube link(audio-only)\n[2. =play <word>]\n 🔥 This function is still developing\n - it plays the most related search result on youtube if available\n[3. =skip]\n - it skips current music in the playlist.\n[4. =clear]\n - it clears the playlist.\n[5. =volume <0~200>]\n - it controls the currently playing music volume\n[6. =join]\n - Inferno joins your current voice channel.\n[7. =out, =disconnect]\n - Inferno leaves current voice channel.\n - This command is valid when you are on the same voice channel.\n[8. =queue]\n - This shows current playlist\n```")
        message.channel.send("```css\n[ Develper's note : https://github.com/TERADA-DANTE/Inferno ]\n [Feedback to Dante🔥]```")
    }

})

function embedMessage(message) {
    const args = message.content.split(' ')
    switch (args[0]) {
        case '=play':
            const embedPlay = new MessageEmbed()
                .setTitle('You are listening to ...')
                .setColor(0x00ccff)
                .setDescription(`▶ ${message.songInfo.desc}`)
            return embedPlay

        case '=join':
            const embedJoin = new MessageEmbed()
                .setTitle('Hello! This is Inferno')
                .setColor(0x00ccff)
                .setDescription('🔥 You can check "=help" for commands')
            return embedJoin

        case '=out':
        case '=disconect':
            const embedOut = new MessageEmbed()
                .setTitle('Bye...')
                .setColor(0x00ccff)
                .setDescription('☑ Playlist initialized')
            return embedOut

        case '=queue':
            const embedQueue = new MessageEmbed()
                .setTitle('Current Playlist 🎹')
                .setColor(0x00ccff)
                .setDescription(message.queueInfo.desc.length === 0 ? "Playlist is empty!" : message.queueInfo.desc)
            return embedQueue

        default:
            const embedDefault = new MessageEmbed()
                .setTitle('Invalid Command')
                .setColor(0x00ccff)
                .setDescription("✅ Check Inferno's command : =help")
            return embedDefault
    }

}
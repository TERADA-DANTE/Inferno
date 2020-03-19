// Require package
const ytdl = require('ytdl-core')
const {
    MessageEmbed
} = require(`discord.js`)
const search = require('./search.js')

// play function
exports.run = async (client, message, args, option) => {
    // check if user is in voice channel
    if (!message.member.voice.channel) return message.reply('You need to join to voice channel 📶')

    // check if args[1] exists
    if (!args[1]) return message.reply('=play WHAT TO PLAY 🔀')


    // check if youtube link available unless it is from search
    let validate = await ytdl.validateURL(args[1])
    if (!validate) {
        search.run(client, message, args, option)
        return
    }


    // Fetch option variable
    let {
        servers
    } = option

    // Server identity set
    if (!servers[message.guild.id]) {
        servers[message.guild.id] = {
            queue: []
        }
    }

    // variable for queue
    var server = servers[message.guild.id]

    // Run play function
    message.member.voice.channel.join()
        .then((connection) => {
            if (server.queue[0]) {
                server.queue.push(args[1])
                message.reply("Your music added to Playlist ⏏")
            } else {
                server.queue.push(args[1])
                play(connection, message)
            }
        })

    // Define play fucntion
    async function play(connection, message) {
        // Variables
        var server = servers[message.guild.id]
        const stream = ytdl(server.queue[0])

        // Streaming
        server.dispatcher = connection.play(stream, {
            filter: "audioonly",
        })

        // Default volume : 30
        server.dispatcher.setVolume(30 / 100)

        // Send message
        // songInfo variable has to be here for efficiency
        const songInfo = await ytdl.getBasicInfo(server.queue[0])
        const embed = new MessageEmbed()
            .setTitle('Now playing')
            .setColor(0x00ccff)
            .setDescription(`▶ ${songInfo.title} requested by ${message.author.username}`)
        message.channel.send(embed)


        // handleFinish
        server.dispatcher.on('finish', () => {
            //queue shift
            server.queue.shift()

            if (server.queue[0]) {
                play(connection, message)
            } else {

                // Send Message 
                const embed = new MessageEmbed()
                    .setTitle('Playlist end')
                    .setColor(0x00ccff)
                    .setDescription(`✅`)
                message.channel.send(embed)

                // Inferno will leave channel after 60 sec
                setTimeout(() => {
                    if (client.voice.connections.size === 0 && !server.queue[0]) {
                        message.channel.send("Inferno is going to sleep 💤")
                        message.member.voice.channel.leave()
                    }
                }, 60000)
            }
        })
    }
}
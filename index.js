// initial setting
const {
    Client,
    MessageEmbed
} = require(`discord.js`)
const client = new Client()
const ytdl = require('ytdl-core')
const queue = new Map()


const config = require('./config')

client.once('ready', () => {
    console.log('Ready!')
})
client.once('reconneting', () => {
    console.log('reconnecting!')
})
client.once('disconnect', () => {
    console.log('Disconnect!')
})

client.login(config.TOKEN)
// initial setting 

// get message from user
client.on('message', async message => {

    const serverQueue = queue.set(message.guild.id)
    // prevent direct message
    if (message.channel.type === 'dm') return false
    // only starts with prefix 
    // is this necessary? - no
    // if (!message.content.startsWith === config.prefix) console.log('ee')
    if (message.content.startsWith(`${config.prefix}play`)) {
        execute(message, serverQueue)
        return
    }

    if (message.content === config.prefix + 'help') {
        const embed = new MessageEmbed()
            .setTitle('Test Title')
            .setColor(0xff0000)
            .setDescription('Ipsem Lorem');
        message.channel.send(embed);
    }
})

async function execute(message, serverQueue) {
    const args = message.content.split(' ')
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send('You are not in voice channel 💥')
    // on permission
    // const permissions = voiceChannel.permissionsFor(message.client.user)
    // if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    //     return message.channel.send('You have no permission 🚫')
    // }
    const musicInfo = await ytdl.getInfo(args[1])
    const music = {
        title: musicInfo.title,
        url: musicInfo.video_url,
        length: `about ${Math.ceil(musicInfo.length_seconds/60)}min`
    }
    // Queue
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            musics: [],
            volume: 50,
            playing: true,
        }

        queue.set(message.guild.id, queueConstruct)

        queueConstruct.musics.push(music)

        try {
            queueConstruct.connection = await voiceChannel.join()
            play(message.guild, queueConstruct.musics[0])
        } catch (error) {
            console.log(error)
            queue.delete(message.guild.id)
            return message.channel.send(error)
        }
    } else {
        serverQueue.musics.push(music)
        console.log(serverQueue.musics)
        return message.channel.send(`${music.title} has been added to the queue !`)
    }
    // Queue
}
// get message from user

// function play
function play(guild, music) {
    const serverQueue = queue.get(guild.id);
    if (!music) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(music.url))
        .on('end', () => {
            console.log('Music ended!');
            serverQueue.musics.shift();
            play(guild, serverQueue.musics[0]);
        })
        .on('error', error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

// function play
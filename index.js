// initial setting
const Discord = require(`discord.js`)
const client = new Discord.Client()
const config = require('./config')

client.once('ready', () => {
    console.log('Dante is ready to login')
})

client.login(config.TOKEN)
// initial setting 

// get message from user
client.on('message', message => {
    // prevent direct message
    if (message.channel.type === 'dm') return false
    // only starts with prefix 
    // is this necessary? - no
    // if (!message.content.startsWith === config.prefix) console.log('ee')
    if (message.content === config.prefix + 'play') {
        message.channel.send("テスト１２３ 🔥")
    }
})
// get message from user
// Require package
const Discord = require('discord.js')

// Require local files
const config = require("./config.json")

// Global variables
const {
    token,
    prefix
} = config
const servers = {}
const COMMAND = ['play', 'skip', 'queue', 'leave', 'volume', 'help', 'clear']

// Configure package
const client = new Discord.Client()


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

// Listener event(message)

client.on('message', message => {
    // Variables
    // args separation 
    let args = message.content.split(' ')
    // command - =play => play
    let command = args[0].slice(prefix.length)

    // Return statement
    // if the message doesn't contain prefix
    if (!message.content.startsWith(prefix)) return

    // if the message comes from a bot
    if (message.author.bot) return

    // if Invalid command
    if (!COMMAND.includes(command)) message.reply("🔰 Invalid command! Check `=help`")

    // Command handle
    try {
        // Variables
        let option = {
            servers: servers
        }

        // Require import file - and clear cache
        delete require.cache[require.resolve(`./commands/${command}.js`)]
        let commandFile = require(`./commands/${command}.js`)

        // Run command
        commandFile.run(client, message, args, option)
    } catch (error) {
        console.log(error.message)
    } finally {
        console.log(`${message.author.tag} ran this command`)
    }
})

// login to Discord with the bot
client.login(token)
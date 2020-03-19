// Require package  
const search = require('yt-search')

// Search function
exports.run = (client, message, args, option) => {
    // for args with multiple words
    args.shift()
    const searchArg = args.join(' ')
    search(searchArg, (error, response) => {
        // Search error handle
        if (error) return message.channel.send("Sorry, Something went to wrong 🆖")

        // Get Response
        const videos = response.videos.slice(0, 5)

        // Make Selection list with response
        let result = ''
        for (const i in videos) {
            result += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`
        }

        // No serach Result
        if (result.length === 0) {
            message.channel.send("⏸ No result on YouTube")
            return
        }

        // Define result
        result += `\n > Select a number \`1-${videos.length}\` or \`0\` to cancel`
        message.channel.send(result)

        // Set string filter
        const filter = m => !isNaN(m.content) && m.content <= videos.length && m.content >= 0 && m.content.length === 1

        // createMessageCollector get the first arg as function which returns true
        const collector = message.channel.createMessageCollector(filter)

        // This should return as quickly as possible to prevent bugs

        collector.once('collect', (m) => {
            // 0 to cancel
            if (m.content == 0) {
                message.channel.send(`> Search cancelled `)
                return
            }
            // Require play function
            let commandFile = require('./play')

            // Need to set form
            commandFile.run(client, message, ["=play", videos[parseInt(m.content - 1)].url], option)
        })
    })
}
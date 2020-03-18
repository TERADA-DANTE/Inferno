// Require package
const search = require('yt-search')

// Search function
exports.run = (client, message, args, option) => {
    search(args[1], (error, response) => {
        // Search error handle
        if (error) return message.channel.send("Sorry, Something went to wrong 🆖")

        // Get Response
        const videos = response.videos.slice(0, 5)

        // Make Selection list with response
        let result = ''
        for (const i in videos) {
            result += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`
        }
        result += `\n > Select a number \`1-${videos.length}\``
        message.channel.send(result)

        // Set string filter
        const filter = m => !isNaN(m.content) && m.content <= videos.length && m.content > 0

        // createMessageCollector get the first arg as function which returns true
        const collector = message.channel.createMessageCollector(filter, {
            time: 60000
        })

        collector.on('collect', (m) => {
            let commandFile = require('./play')

            // prevent Infinite loop in play function
            option.isSearch = true

            // Need to set form
            commandFile.run(client, message, ["=play", videos[parseInt(m.content - 1)].url], option)
        })
    })
}
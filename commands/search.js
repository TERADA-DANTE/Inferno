// Require package
let search = require("yt-search")

// Require play function
let commandFile = require("./play")

// Search function
exports.run = async (client, message, args, option) => {
  search({ query: args.slice(1).join(" ") }, (error, response) => {
    // Search error handle
    if (error) {
      console.log(error)
      return message.channel.send("Sorry, Something went to wrong 🆖")
    }

    // Get Response
    let videos = response.videos.slice(0, 5)

    if (!videos.length) {
      message.channel.send("⏸ No result on YouTube")
      return
    }

    message.channel.send(
      videos.reduce(
        (pre, cur, idx, arr) =>
          pre + `**[${parseInt(idx) + 1}]:** \`${arr[idx].title}\`\n`,
        ""
      ) + `\n > Select a number \`1-${videos.length}\` or \`0\` to cancel`
    )

    // Set string filter
    const filter = (m) =>
      !isNaN(m.content) &&
      m.content <= videos.length &&
      m.content >= 0 &&
      m.content.length === 1

    // createMessageCollector get the first arg as function which returns true
    const collector = message.channel.createMessageCollector(filter)

    // This should return as quickly as possible to prevent bugs

    collector.once("collect", (m) => {
      // 0 to cancel
      if (m.content == 0) {
        message.channel.send(`> Search cancelled `)
        return
      }

      // Need to set form
      commandFile.run(
        client,
        message,
        ["=play", videos[parseInt(m.content - 1)].url],
        option
      )
    })
  })
}

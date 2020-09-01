// Require package
const { MessageEmbed } = require(`discord.js`)

// leave function
exports.run = (client, message, args, option) => {
  // Check if bot is in voice channel
  if (!message.guild.me.voice.channel) return

  // Check if user is in voice channel
  if (!message.member.voice.channel)
    return message.reply("You are not in voice channel📶")

  // Check if user is in "same" voice channel
  if (message.member.voice.channel !== message.guild.me.voice.channel) return
  //message.reply('Inferno is in another channel 📶')

  // clear queue
  option.servers[message.guild.id].queue = []

  // Leave channel
  message.guild.me.voice.channel.leave()

  // Send message
  message.channel.send(
    new MessageEmbed()
      .setTitle("Bye...")
      .setColor(0x00ccff)
      .setDescription(`⏹ See you again`)
  )
}

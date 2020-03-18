const {
    MessageEmbed
} = require(`discord.js`)

// Help function
exports.run = (client, message, args, option) => {
    // This function can always callable
    message.channel.send("```ini\n[Hello, This is Inferno.]```")
    message.channel.send("```css\n= is Inferno's command syntax\n[< > should be ignored]```")
    message.channel.send("```ini\n[1. =play <Youtube-link>]\n - It plays provided youtube link(audio-only)\n[2. =play <word>]\n - it plays the most related search result on youtube if available\n[3. =skip]\n - it skips current music in the playlist.\n[4. =clear]\n - it clears the playlist.\n[5. =volume <0~200>]\n - it controls the currently playing music volume\n[6. =leave]\n - Inferno leaves current voice channel.\n - This command is valid when you are on the same voice channel.\n[7. =queue]\n - This shows current playlist\n```")
    message.channel.send("```css\n[Develper's note : https://github.com/TERADA-DANTE/Inferno ]\n[Feedback to Dante🔥]```")
}
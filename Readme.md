![discord_badge](https://badgen.net/badge/icon/discord?icon=discord&label)
![npm](https://badgen.net/badge/npm/v6.13.4/green)
![version](https://badgen.net/badge/version/1.0.0/blue)


![Inferno comes from DMC Dante](https://p4.wallpaperbetter.com/wallpaper/492/428/886/dante-dmc-devil-may-cry-wallpaper-preview.jpg)

# Inferno
Dante's Original Discord Music bot

[☑ Click here to let Inferno join to your server!](https://discordapp.com/oauth2/authorize?&client_id=688762089485107241&scope=bot&permissions=8)

# Overview
Terada Dante's original discord youtube music bot. This is 100% free and open source. Feedbacks are always welcome.

# Installation for Developers
🔰 You should have your own discord bot
1. Clone this respository
2. Make `config.json` in root(Please refer to the .gitignore)
3. Deploy
4. Be Groovy with Inferno ❤

# Commands
✅ = is Inferno's command syntax
⚠ < > should be ignored.

## =play
1. =play <Youtube-link>
- This command plays provided youtube link(audio-only).

2. =play <word>
   
⚠ This command is still developing
- This command shows the list of searched results on youtube if available.
- You can pick this with number.

## =skip
- This command skips current music in the playlist.

## =clear
- This command clears the playlist.

## =volume
- This command controls the current music volume on scale of 0 to 200 which will be devided by 100 automatically.
- Default volume is 30

## =leaves
- Inferno leaves current voice channel.
- This clears current playlist

## =queue
- This shows current playlist

## =help
- Show above command description.

# Dependency
1. discord.js
2. @discordjs/opus || opusscript
3. ffmpeg-static
4. ytdl-core
5. yt-search

# .gitignore
config.json

~~~javascript
{
    "token": "<your discord bot token here>",
    "syntax": "<your syntax>" // Inferno uses =
}
~~~

# License 
MIT
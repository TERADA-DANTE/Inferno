![discord_badge](https://badgen.net/badge/icon/discord?icon=discord&label)
![npm](https://badgen.net/badge/npm/v6.13.4/green)
![version](https://badgen.net/badge/version/beta/blue)

![Inferno comes from DMC Dante](https://p4.wallpaperbetter.com/wallpaper/492/428/886/dante-dmc-devil-may-cry-wallpaper-preview.jpg)

# Inferno
Dante's Original Discord Music bot


# Overview
Terada Dante's original discord youtube music bot. This is 100% free and open source. Feedbacks are always welcome.

# Installation
🔰 You should have your own discord bot
1. git clone this respository
2. npm install
3. deploy on heroku
4. be Groovy with Inferno ❤
   
# Commands


✅ = is Inferno's command syntax

⚠ < > should be ignored.

## =play
1. =play <Youtube-link>
- This command plays provided youtube link(audio-only).

2. =play <word>
   
⚠ This command is still developing
- This command plays the most related search result on youtube if available.

## =skip
- This command skips current music in the playlist.

## =clear
- This command clears the playlist.

## =volume
- This command controls the current music volume on scale of 0 to 200 which will be devided by 100 automatically.
- Default volume is 30

## =join
- Inferno joins your current voice channel. 

## =out, disconnect
- Inferno leaves current voice channel.
- This command is valid when you are on the same voice channel.

## =queue
- This shows current playlist

## =help
- Show above command description.

# Dependency
1. discord.js
2. @discordjs/opus || opusscript
3. ffmpeg-static
4. ytdl-core

# .gitignore
/config.js/

~~~javascript
export.module = {
    TOKEN: <your discord bot token here>,
    syntax: '='
}
~~~
# License 
MIT
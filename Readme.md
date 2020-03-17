![discord_badge](https://badgen.net/badge/icon/discord?icon=discord&label)
![npm](https://badgen.net/badge/npm/v6.13.4/green)
![version](https://badgen.net/badge/version/beta/blue)

# Inferno
Dante's Original Discord Music bot

# Overview
Terada Dante's original discord youtube music bot. This is 100% free and open source. Feedbacks are always welcome.

# Commands


✅ = is Inferno's command syntax

⚠ < > should be ignored.

## =play
1. =play <Youtube-link>
- It plays provided youtube link(audio-only).

2. =play <word>
⚠ This function is still developing
- it plays the most related search result on youtube if available.


## =skip
- it skips current music in the playlist.

## =clear
- it clears the playlist.

## =volume
1. =volume 30
- it controls current music volume on scale of 30 which will be devided by 100 automatically.

2. =volume 500
- volume range is from 0 to 200.

## =join
- Inferno joins your current voice channel. 

## =out, disconnect
- Inferno leaves current voice channel.
- This command is valid when you are on the same voice channel.

## =help
- Show above command description.

# Dependency
1. discord.js
2. @discordjs/opus || opusscript
3. ffmpeg-static
4. ytdl-core

# .gitignore
/config.js/

# License 
MIT
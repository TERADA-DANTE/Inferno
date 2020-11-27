![discord_badge](https://badgen.net/badge/icon/discord?icon=discord&label)
![npm](https://badgen.net/badge/npm/v6.13.4/green)

![Inferno comes from DMC Dante](https://p4.wallpaperbetter.com/wallpaper/492/428/886/dante-dmc-devil-may-cry-wallpaper-preview.jpg)

# Inferno

Dante's Original Discord Music bot powered by Discord API

[☑ Click here to let Inferno join to your server!](https://discordapp.com/oauth2/authorize?&client_id=688762089485107241&scope=bot&permissions=8)

# Overview

Terada Dante's original discord youtube music bot. This is 100% free and open source. Feedbacks are always welcome.

# Installation for Developers

🔰 You should have your own discord bot by customizing Inferno

1. Clone this respository
2. Make `config.json` in root(Please refer to the .gitignore)
3. npm install
4. Deploy(Ubuntu Server 20.04 LTS (HVM), SSD Volume Type / Heroku is also fine)
5. Be Groovy with Inferno ❤

# Commands

✅ = is Inferno's command syntax
⚠ < > should be ignored.

## =play

1. =play <Youtube-link>

- This command plays provided youtube link(audio-only).

2. =play <word>

- This command shows the list of searched results on youtube if available.
- You can pick this with number or 0 to cancel.

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

"@discordjs/opus": "^0.1.0"

"discord.js": "^12.0.2"

"ffmpeg-static": "^4.0.1"

"yt-search": "^2.2.4"

"ytdl-core": "^3.2.2"

"NodeJS" : v12.18.3

"NPM" : v6.14.8

⚠ Make sure to use npm i package@latest

# .gitignore

config.json

```javascript
{
    "token": "<your discord bot token here>",
    "syntax": "<your syntax>" // Inferno uses =
}
```

# Update logs

- 2020-09-01 : Small fix, Playlist, play by ID needs to be added

# Error report
- FFMPEG error : try npm i @discordjs/opus

# License

MIT

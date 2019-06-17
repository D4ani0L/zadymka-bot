const Discord = require("discord.js");
const https = require('https');
const ytdl = require('ytdl-core');
require('dotenv').config();

// Import iamges
const images = require('./images.js');

const client = new Discord.Client();

// Inicializacja i ustawanie statusu
client.on("ready", () => {
  console.log(`Bot ${client.user.tag} is now online!`);
  client.user.setPresence({
    game: {
      name: 'twoją głupotę | !pomoc',
      type: "WATCHING" //Ogląda...
    }
  });
});

// reakcje na komendy
client.on("message", msg => {
  // !pomoc, !komendy, !help
  if (msg.content === "!pomoc" || msg.content === "!komendy" || msg.content === "!help") {
    const pomoc = new Discord.RichEmbed()
      .setColor('#36e272')
      .setTitle('Lista komend:')
      .setThumbnail(images.avatarImg)
      .addField('!jd', 'wiadomo ocb')
      .addField('!zadymka', 'robi zadymke a niby co innego')
      .addField('!outlast', 'dowód kiedy outlast')
      .addField('!leesin', 'xayoo obraża ślepego mnicha ***szok***')
      .addField('!wypierdalaj', 'xayoo grzecznie prosi abyś wyszedł z kanału')
      .setTimestamp()
      .setFooter('ZadymkaBot - Danieleqq', images.avatarImg);

    msg.channel.send(pomoc);
  }
  // !jd
  else if (msg.content === "!jd") {
    const emoteBT = client.emojis.find(emoji => emoji.name === "BloodTrail");
    msg.reply(`PROSTE ŻE TAK ${emoteBT}`);
  }
  // !zadymka
  else if (msg.content === "!zadymka") {
    let randBool = Math.random() >= 0.5;
    if (randBool) msg.channel.send("siu siu siu!")
    else msg.channel.send("fiu fiu fiu!")

    // Playing audio
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then((connection) => {
          console.log("connected..")
          const dispatcher = connection.playStream(ytdl("https://www.youtube.com/watch?v=G30CelGaSGA"));
          console.log("playing...")
          dispatcher.on('end', () => {
            console.log("END, disconecting...")
            connection.disconnect();
          });
        });
    }
  }
  // !wypierdalaj
  else if (msg.content === "!wypierdalaj") {
    msg.channel.send("Wypierdalaj kurwa!")

    // Playing audio
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then((connection) => {
          console.log("connected..")
          const dispatcher = connection.playStream(ytdl("https://www.youtube.com/watch?v=BsLpgeeV1jE", { filter: "audioonly" }));
          console.log("playing...")
          dispatcher.on('end', () => {
            console.log("END, disconecting...")
            connection.disconnect();
          });
        });
    }
  }
  // !outlast
  else if (msg.content === "!outlast") {
    msg.reply("https://www.twitch.tv/xayoo_/clip/CarefulTolerantFalconPanicVis");
  }
  // !leesin
  else if (msg.content === "!leesin") {
    msg.reply("https://www.twitch.tv/xayoo_/clip/TentativeCleverWatercressArgieB8");
  }
  // !kocham x
  else if (msg.content.search("!kocham") === 0) {
    let what = msg.content.slice(8)
    const randNumber = Math.floor(Math.random() * 100);
    msg.reply(`kochasz ${what} na ${randNumber}%`)
  }
});

client.login(process.env.DISCORD_TOKEN);

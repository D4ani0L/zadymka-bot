const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const { getMostActiveUsers } = require('./dbOperations');

const reactToCommands = (client, msg) => {
    // Get args & command
    const args = msg.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    // !pomoc, !komendy, !help
    if (command === 'pomoc' || command === 'help' || command === 'komendy') {
        const attachment = new Discord.Attachment('./img/avatar.png', 'avatar.png');
        const pomoc = new Discord.RichEmbed()
            .setColor('#36e272')
            .setTitle('Lista komend:')
            .attachFile(attachment)
            .setThumbnail('attachment://avatar.png')
            .addField('!jd', 'wiadomo ocb')
            .addField('!top', 'Wyświetla top 5 zadymiarzy!')
            .addField('!zadymka', 'robi zadymke a niby co innego')
            .addField('!jbl [link do yt]', 'odpala głośnik')
            .addField('!legia', 'to chuje a lech mistrz polski!')
            .addField('!outlast', 'dowód kiedy outlast')
            .addField('!leesin', 'xayoo obraża ślepego mnicha ***szok***')
            .addField('!kocham [coś tu wpisz]', 'przewiduje na ile kochasz to coś')
            .addField('!wypierdalaj', 'xayoo grzecznie prosi abyś wyszedł z kanału')
            .setTimestamp()
            .setFooter('ZadymkaBot - Danieleqq', 'attachment://avatar.png');

        msg.channel.send(pomoc);
    }
    // !jd
    else if (command === 'jd') {
        const emoteBT = client.emojis.find(emoji => emoji.name === 'BloodTrail');
        msg.reply(`PROSTE ŻE TAK ${emoteBT}`);
    }
    // !zadymka
    else if (command === 'zadymka') {
        let randBool = Math.random() >= 0.5;
        if (randBool) msg.channel.send('siu siu siu!');
        else msg.channel.send('fiu fiu fiu!');

        // Playing audio
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(
                    ytdl('https://www.youtube.com/watch?v=G30CelGaSGA', { filter: 'audioonly' })
                );
                dispatcher.on('end', () => {
                    connection.disconnect();
                });
            });
        }
    }
    // Most active users
    else if (command === 'top') {
        getMostActiveUsers(users => {
            const attachment = new Discord.Attachment('./img/avatar.png', 'avatar.png');
            const pomoc = new Discord.RichEmbed()
                .setColor('#36e272')
                .setTitle('TOP 5 ZADYMIARZY:')
                .attachFile(attachment)
                .setThumbnail('attachment://avatar.png')
                .addField('1) ' + users[0].name, 'Wysłanych wiadomości: ' + users[0].messages)
                .addField('2) ' + users[1].name, 'Wysłanych wiadomości: ' + users[1].messages)
                .addField('3) ' + users[2].name, 'Wysłanych wiadomości: ' + users[2].messages)
                .addField('4) ' + users[3].name, 'Wysłanych wiadomości: ' + users[3].messages)
                .addField('5) ' + users[4].name, 'Wysłanych wiadomości: ' + users[4].messages)
                .setTimestamp()
                .setFooter('ZadymkaBot - Danieleqq', 'attachment://avatar.png');

            msg.channel.send(pomoc);
        });
    }
    // !legia
    else if (command === 'legia') {
        msg.channel.send('to chuje a lech mistrz polski!');

        // Playing audio
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(
                    ytdl('https://www.youtube.com/watch?v=sV1DlnxbSYI', { filter: 'audioonly' })
                );
                dispatcher.on('end', () => {
                    connection.disconnect();
                });
            });
        }
    }
    // !wypierdalaj
    else if (command === 'wypierdalaj') {
        msg.channel.send('Wypierdalaj kurwa!');

        // Playing audio
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(
                    ytdl('https://www.youtube.com/watch?v=BsLpgeeV1jE', { filter: 'audioonly' })
                );
                dispatcher.on('end', () => {
                    connection.disconnect();
                });
            });
        }
    }
    // !outlast
    else if (command === 'outlast') {
        msg.reply('https://www.twitch.tv/xayoo_/clip/CarefulTolerantFalconPanicVis');
    }
    // !leesin
    else if (command === 'leesin') {
        msg.reply('https://www.twitch.tv/xayoo_/clip/TentativeCleverWatercressArgieB8');
    }
    // !kocham x
    else if (command === 'kocham') {
        let what = args[0];
        const randNumber = Math.floor(Math.random() * 100);
        msg.reply(`kochasz ${what} na ${randNumber}%`);
    }
    // !dawaj
    else if (command === 'jbl') {
        let url = args[0];

        // Playing audio
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(ytdl(url, { filter: 'audioonly' }));
                dispatcher.on('end', () => {
                    connection.disconnect();
                });
            });
        }
    }
};

module.exports = { reactToCommands };

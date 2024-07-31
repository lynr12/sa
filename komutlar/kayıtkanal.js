const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
let kanal = JSON.parse(fs.readFileSync('./ayarlar/kayit2.json', 'utf8'));

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!');
    }

    let channel = message.mentions.channels.first();
    if (!channel) {
        return message.channel.send(':x: | Kullanım: `? kanalayarla #kanal`');
    }

    if (!kanal[message.guild.id]) {
        kanal[message.guild.id] = {
            resim: channel.id,
        };
    } else {
        kanal[message.guild.id].resim = channel.id;
    }

    fs.writeFile('./ayarlar/kayit2.json', JSON.stringify(kanal), (err) => {
        if (err) console.log(err);
    });

    message.channel.send(`:white_check_mark: | Artık Kayıt Olan Kişilerin Bildirim Kanalı ${channel} olarak ayarlandı.`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'kanalayarla',
    description: 'Kayıt Olan Kişinin Bildiriminin Kanalını Ayarlar.',
    usage: 'kanalayarla <#kanal>',
};

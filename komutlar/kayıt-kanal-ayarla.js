const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
let kanal = JSON.parse(fs.readFileSync('./ayarlar/kayit1.json', 'utf8'));

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!');
    }

    let channel = message.mentions.channels.first();
    if (!channel) {
        return message.channel.send(':x: | Kullanım: `m!kayıt-kanal-ayarla #kanal`');
    }

    if (!kanal[message.guild.id]) {
        kanal[message.guild.id] = {
            resim: channel.id,
        };
    } else {
        kanal[message.guild.id].resim = channel.id;
    }

    fs.writeFile('./ayarlar/kayit1.json', JSON.stringify(kanal), (err) => {
        if (err) console.log(err);
    });

    message.channel.send(`:white_check_mark: | ** Üyelerin Kayıt Olacağı Kanal ${channel} Olarak Ayarlandı.**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2,
};

exports.help = {
    name: 'kayıt-kanal-ayarla',
    description: 'Giriş Çıkış Kanalını Ayarlar.',
    usage: 'kayit-kanal-ayarla #kanal',
};

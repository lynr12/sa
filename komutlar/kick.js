const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
        return message.reply("Bu komutu kullanma yetkin yok.");
    }

    const user = message.mentions.users.first();
    if (!user) {
        return message.reply('Atacak bir kullanıcı belirtmelisiniz.');
    }

    const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

    try {
        // Kullanıcıya DM göndermeye çalışın
        try {
            await user.send(`Sunucudan atıldınız. Sebep: ${reason}`);
        } catch (err) {
            console.error('Kullanıcıya DM gönderilirken bir hata oluştu:', err);
        }

        // 1 saniye bekleyin
        await new Promise(resolve => setTimeout(resolve, 1000));

        const member = message.guild.members.cache.get(user.id);
        if (member) {
            await member.kick(reason);
            await message.channel.send(`${user.tag} başarıyla sunucudan atıldı. Sebep: ${reason}`);
        } else {
            await message.channel.send('Kullanıcı bu sunucuda bulunmuyor.');
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        message.channel.send('Kullanıcıyı sunucudan atarken bir hata oluştu.');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'kick',
    description: 'Bir kullanıcıyı sunucudan atar.',
    usage: 'kick @kullanıcı [sebep]'
};

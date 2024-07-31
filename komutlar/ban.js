const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply("Bu komutu kullanma yetkin yok.");
    }

    const user = message.mentions.users.first();
    if (!user) {
        return message.reply('Banlayacak bir kullanıcı belirtmelisiniz.');
    }

    const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

    try {
        // Kullanıcıya DM göndermeye çalışın
        try {
            await user.send(`Sunucuda yasaklandınız. Sebep: ${reason}`);
        } catch (err) {
            console.error('Kullanıcıya DM gönderilirken bir hata oluştu:', err);
        }

        // 1 saniye bekleyin
        await new Promise(resolve => setTimeout(resolve, 1000));

        const member = message.guild.members.cache.get(user.id);
        if (member) {
            await member.ban({ reason });
            await message.channel.send(`${user.tag} başarıyla yasaklandı. Sebep: ${reason}`);
        } else {
            await message.guild.bans.create(user.id, { reason });
            await message.channel.send(`${user.tag} başarıyla yasaklandı. Sebep: ${reason}`);
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        message.channel.send('Kullanıcıyı yasaklarken bir hata oluştu.');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ban',
    description: 'Bir kullanıcıyı yasaklar.',
    usage: 'ban @kullanıcı [sebep]'
};

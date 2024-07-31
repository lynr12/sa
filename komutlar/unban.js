const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply("Bu komutu kullanma yetkin yok.");
    }

    const userID = args[0];
    const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

    if (!userID) {
        return message.reply('Yasaklamasını kaldırmak istediğiniz kullanıcının ID’sini belirtmelisiniz.');
    }

    try {
        // Kullanıcıyı ID ile fetch et
        const user = await bot.users.fetch(userID);
        await message.guild.members.unban(userID, reason);
        message.channel.send(`${user.tag} başarıyla yasaklamalardan çıkarıldı. Sebep: ${reason}`);
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        message.channel.send('Kullanıcının banını kaldırırken bir hata oluştu. Kullanıcı ID’si doğru olabilir.');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'unban',
    description: 'Bir kullanıcının banını kaldırır.',
    usage: 'unban <kullanıcıID> [sebep]'
};

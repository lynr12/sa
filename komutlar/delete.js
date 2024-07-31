const { PermissionsBitField } = require('discord.js'); // PermissionsBitField ekleyin

exports.run = (client, message, args) => {
    // İzin kontrolü yaparken PermissionsBitField.Flags kullanmalısınız
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        return message.reply("Bu komutu kullanmak için izniniz yok!");
    }
    
    if (!args[0]) {
        return message.channel.send("🚫 Lütfen silinecek mesaj miktarını yazın! 🚫");
    }

    const numberToDelete = parseInt(args[0]);
    if (isNaN(numberToDelete) || numberToDelete <= 0) {
        return message.channel.send("🚫 Geçerli bir sayı girin! 🚫");
    }

    // `bulkDelete` metodunu kullanmadan önce, geçerli bir sayı olup olmadığını kontrol edin
  

    message.channel.bulkDelete(numberToDelete).then(() => {
        message.channel.send(`**${numberToDelete}** adet mesaj başarıyla silindi. :rocket:`).then(msg => msg.delete({ timeout: 5000 }));
    }).catch(err => {
        console.error(err);
        message.channel.send("Mesajları silerken bir hata oluştu.");
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sil', 't', 's'],
    permLevel: 2
};

exports.help = {
    name: 'delete',
    description: 'Belirlenen miktarda mesajı siler.',
    usage: 'delete <silinecek mesaj sayısı>'
};

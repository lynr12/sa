const { EmbedBuilder } = require('discord.js');

exports.run = async function(client, message, args) {
    // Etiketlenen kullanıcıyı al
    const taggedUser = message.mentions.users.first();

    // Kullanıcıyı kontrol et
    let cm;
    if (taggedUser && taggedUser.id === '884047568735207464') {
        cm = 100 + Math.round(Math.random() * 1000);
    } else {
        cm = Math.round(Math.random() * 50);
    }

    // Embed oluştur
    const gayEmbed = new EmbedBuilder()
        .setColor('#f442d4')
        .setDescription(`<@${message.author.id}> Adlı Kullanıcının Malafatı **${cm}** Santimetre!`);

    // Mesajı gönder
    return message.channel.send({ embeds: [gayEmbed] });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'kaçcm',
    description: 'Acaba Kaç CM',
    usage: 'kaçcm [user]',
};

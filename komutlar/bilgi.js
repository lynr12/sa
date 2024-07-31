const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    const embed = new EmbedBuilder()
        .setColor('#00FF00')  // Renk belirleyebilirsiniz, örneğin yeşil (#00FF00)
        .setTitle('Bot Bilgi')
        .setTimestamp()
        .addFields(
            { name: 'Kuruluş Yılı', value: '2024', inline: true },
            { name: 'Neden Biz?', value: 'Gelişmiş Özellikli Botumuz Var', inline: false },
            { name: 'Hedefimiz Nedir?', value: 'Adam olmak. İnş Birgün oluruz. Amin', inline: false }
        )
        .setFooter({ text: ' Bot - Bilgi Komutu', iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL());

    message.channel.send({ embeds: [embed] });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'bilgi',
    description: 'Bot hakkında bilgi verir.',
    usage: 'bilgi'
};

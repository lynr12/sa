const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

exports.run = async function(client, message) {
    const cevaplar = [
        "YAZI-TURA: **__TURA__**",
        "YAZI-TURA: **__YAZI__**"
    ];

    // GIF URL'si
    const spinningGif = 'https://cdn.discordapp.com/attachments/1264665214222209025/1265341773064962119/436677458339823636.gif';

    // Başlangıçta "Para dönüyor..." mesajı gönder
    const spinningEmbed = new EmbedBuilder()
        .setColor(0xf4b942)
        .setDescription('Para dönüyor...')
        .setImage(spinningGif);

    const msg = await message.channel.send({ embeds: [spinningEmbed] });

    // 3 saniye sonra sonucu göster
    setTimeout(() => {
        const cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

        const resultEmbed = new EmbedBuilder()
            .setColor(0xf4b942)
            .setDescription(cevap)
            .setThumbnail(cevap.includes('YAZI') ? 
                "https://cdn.discordapp.com/attachments/535856082854084618/544505082854084618/bozuk-para-turk-liras-resmi.png" :
                "https://cdn.discordapp.com/attachments/535856082854084618/544505562201849896/1TL_reverse.png"
            );

        msg.edit({ embeds: [resultEmbed] });
    }, 3000); // 3 saniye bekler
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'yazıtura',
    description: 'Yazı-Tura atar.',
    usage: 'yazıtura'
};

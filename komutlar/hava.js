const { EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

exports.run = async (client, message, args) => {
    weather.find({ search: args.join(" "), degreeType: 'C' }, (err, result) => {
        if (err) return message.channel.send(`Bir hata oluştu: ${err}`);
        if (!result || result.length === 0) {
            const noLocationEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('🌍 **Lütfen geçerli bir yer girin.**')
                .setFooter({ text: 'Hava durumu komutunu kullanırken yer ismi girmeniz gerektiğini unutmayın.' });
            return message.channel.send({ embeds: [noLocationEmbed] });
        }

        const current = result[0].current;
        const location = result[0].location;

        const weatherEmbed = new EmbedBuilder()
            .setTitle(`🌦️ Hava Durumu: ${current.observationpoint}`)
            .setDescription(`**${current.skytext}**`)
            .setThumbnail(current.imageUrl)
            .setColor('#1E90FF')
            .addFields(
                { name: '⏰ Zaman Dilimi', value: `UTC${location.timezone}`, inline: true },
                { name: '🌡️ Derece Türü', value: location.degreetype, inline: true },
                { name: '🌡️ Sıcaklık', value: `${current.temperature}°C`, inline: true },
                { name: '🌬️ Hava', value: `${current.feelslike}°C`, inline: true },
                { name: '💨 Rüzgar', value: current.winddisplay, inline: true },
                { name: '💧 Nem', value: `${current.humidity}%`, inline: true }
            )
            .setFooter({ text: 'Hava durumu bilgileri Weather.js API\'sinden alınmıştır.' });

        message.channel.send({ embeds: [weatherEmbed] });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['weather', 'hava'],
    permLevel: "0"
};

exports.help = {
    name: "havadurumu",
    description: "Belirtilen yerdeki hava durumunu gösterir.",
    usage: "havadurumu [yer]"
};

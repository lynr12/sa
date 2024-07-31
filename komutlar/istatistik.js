const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

  const statsEmbed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('İstatistikler')
    .addFields(
      { name: 'Bellek kullanımı', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
      { name: 'Kullanıcılar', value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, inline: true },
      { name: 'Sunucular', value: `${client.guilds.cache.size.toLocaleString()}`, inline: true },
      { name: 'Kanallar', value: `${client.channels.cache.size.toLocaleString()}`, inline: true },
      { name: 'Ping', value: `${client.ws.ping} ms`, inline: true }
    )
    .setFooter({ text: `Uptime: ${duration}` })
    .setTimestamp();

  msg.channel.send({ embeds: [statsEmbed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistiklerini gösterir.',
  usage: 'istatistik'
};

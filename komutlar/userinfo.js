const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js'); // v14'te EmbedBuilder kullanılır
const moment = require('moment');
require('moment/locale/tr'); // Türkçe tarih formatı için

module.exports = {
  conf: {
    aliases: ['kb'], // Komutun kullanılabileceği diğer isimler
  },
  help: {
    name: 'kullanıcı-bilgi', // Komut adı
    description: 'İstediğiniz kullanıcının bilgilerini gösterir.', // Komut açıklaması
    usage: 'kullanıcı-bilgi [@kullanıcı]' // Komut kullanım şekli
  },
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);

    // Kullanıcı bilgileri
    const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    const status = user.presence?.status || 'Çevrimdışı';
    const game = user.presence?.activities[0]?.name || 'Oynadığı bir oyun yok';
    const isBot = user.bot ? 'Evet' : 'Hayır';
    const lastMessage = user.lastMessage || 'Son yazılan mesaj bulunamadı.';
    const accountCreationDate = moment.utc(user.createdAt).format('DD MMMM YYYY');
    const guildJoinDate = moment.utc(member.joinedAt).format('DD MMMM YYYY');

    // Kullanıcı embed
    const userInfoEmbed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: avatarURL })
      .setThumbnail(avatarURL)
      .setTitle('Kullanıcı Bilgisi')
      .setColor('#03f2df')
      .addFields(
        { name: 'Şu anda oynadığı oyun', value: game, inline: false },
        { name: 'Durum', value: status, inline: false },
        { name: 'Katılım Tarihi (Sunucu)', value: guildJoinDate, inline: false },
        { name: 'Hesap Oluşturulma Tarihi', value: accountCreationDate, inline: false },
        { name: 'Kimlik', value: user.id, inline: true },
        { name: 'Bot mu?', value: isBot, inline: true },
        { name: 'Roller', value: member.roles.cache.filter(r => r.name !== '@everyone').map(r => r.name).join(' | ') || 'Bu kullanıcıda hiçbir rol bulunmuyor', inline: false },
        { name: 'Son gönderdiği mesaj', value: lastMessage, inline: false }
      )
      .setFooter({ text: 'Botunuzun Adı || Kullanıcı Sistemi' });

    message.channel.send({ embeds: [userInfoEmbed] });
  }
};

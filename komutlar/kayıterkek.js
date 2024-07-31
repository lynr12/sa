const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (message.author.bot || message.channel.type === "dm") return;

  // Yönetici izni kontrolü
  const isAdmin = message.member.permissions.has('ADMINISTRATOR');

  // Eğer yönetici değilse, Kayıt Yetkilisi rolü kontrolü
  if (!isAdmin && !message.member.roles.cache.some(role => role.id === 'ROL_ID')) { // ROL_ID'yi güncelleyin
    return message.channel.send('Bu komutu kullanabilmek için `Kayıt Yetkilisi` rolüne sahip olmalısın veya yönetici iznine sahip olmalısın.');
  }

  // Kullanıcıyı bulma
  let user = message.mentions.members.first();
  if (!user) return message.reply('Kime erkek rolü vermek istersin?');

  // Roller
  let erkekRole = message.guild.roles.cache.get('1265371712971608215');
  let kızRole = message.guild.roles.cache.get('1265371734236991511');

  if (!erkekRole) return message.reply('Erkek rolü bulunamadı.');
  if (!kızRole) return message.reply('Kız rolü bulunamadı.');

  try {
    // Erkek rolünü ekleme
    await user.roles.add(erkekRole.id);
    console.log(`Erkek rolü ${user.user.tag} kullanıcısına verildi.`);
    
    // Kız rolünü kaldırma (varsa)
    if (user.roles.cache.has(kızRole.id)) {
      await user.roles.remove(kızRole.id);
      console.log(`Kız rolü ${user.user.tag} kullanıcısından kaldırıldı.`);
    }
    
    message.channel.send(`${user} adlı kullanıcıya erkek rolü verildi.`);
  } catch (error) {
    console.error('Rol ekleme/silme hatası:', error);
    message.channel.send('Bir hata oluştu.');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0,
};

exports.help = {
  name: 'kayıterkek',
  description: 'Kullanıcıya erkek rolü verir.',
  usage: 'kayıterkek <@kullanıcı>'
};

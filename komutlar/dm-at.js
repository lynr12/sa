const { EmbedBuilder } = require('discord.js');

exports.run = (client, message, args) => { 
  if (message.author.id !== "884047568735207464")
    return message.reply("❌ Bu Komutu Sadece Yapımcılar Kullanabilir!");

  if (!message.guild) {
    const ozelmesajuyari = new EmbedBuilder()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL()
      })
      .addFields({ name: "⚠ Uyarı ⚠", value: "Bu Komutu Özel Mesajlarda Kullanamazsın!" });
    return message.author.send({ embeds: [ozelmesajuyari] });
  } 

  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();

  if (reason.length < 1) return message.reply("❌ Bir Mesaj Yazmalısın!");
  if (!user)
    return message
      .reply("❌ Kime Mesaj Atmam Gerektiğini Etiketlemelisin!")
      .catch(console.error);

  message.delete();
  message.reply("✅ Mesaj Başarılı Bir Şekilde Gönderildi!");

  const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle(`**🎆 Yeni Mesaj 🎆**`)
    .setTimestamp()
    .setDescription(reason);

  return user.send({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dm"],
  permLevel: 0
};

exports.help = {
  name: "mesajat",
  description: "Bir kullanıcıya özel mesaj yollar.",
  usage: "mesajat <@kullanıcı> <mesaj>"
};

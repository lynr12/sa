const { EmbedBuilder } = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = '602024501710159882'; // Bu yere botun ID'sini yapıştırın

exports.run = (client, message, args) => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
        .setColor('#36393E') // Renk kodunu #HEX formatına dönüştürdük
        .setTitle(`${client.user.username} - Komutlar`)
        .setDescription(`!aşkölç - Etiketlediğiniz kişiyle aşkınızı ölçer
           !avatar - Etiketlediğiniz kişinin avatarını görürsünüz.
           !bilgi - Bot hakkında bilgi edinirsiniz.
           !kasaaç - cs kasası açarsınız.
           !davet - Davet sıralamasını görürsünüz.
           !delete - Mesaj silersiniz.
           !düello - Etiketlediğiniz Kişiyle Düello atarsınız.
           !havadurumu - Yazdığığnız Yerin hava durumunu Görürsünüz.
           !istatistik - Botun istatistiği görünür.
           !kayıt (adminler için) - Kullanıcıları erkek/kız olarak kaydedtmenizi sağlar.
           !kedi - Kedi gifi atar
           !köpek - Köpek Gifi Atar
           !ping - Botun Yanıt verme süresini test eder.
           !sayaç - Sunucya üye hedefi koyar.
           !katıl - Bot odanıza Katılır.
           !sunucu bilgi - Sunucunun Bilgilerini gösterir.
           !kullanıcı-bilgi - Etiketlenen Kullanıcını bilgilerini gösterir.
           !yazıtura - Yazıtura atar
           !türk - TÜRK bayrağı atar.
           !ban - etiketlenen Kullanıcıyı banlar
           !unban - etiketlenen Kullanıcının banını kaldırır.
           !kick - Etiketlenen Kullanıcıyı kickler.
           !reklamara - Sunucudaki reklamalrı arar.
           !steam - Steam profili vs. gösterir
           !yavaş-mod - Yavaş Modu Açar
           !davet - Davet kodu gönderir`)
        .setThumbnail(client.user.avatarURL())
        .setFooter({ text: `${message.author.username} Tarafından İstendi.`, iconURL: message.author.avatarURL() })
        .setImage("https://tenor.com/view/rias-gif-27585305");  

    return message.channel.send({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};

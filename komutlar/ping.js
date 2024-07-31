module.exports = {
    conf: {
      aliases: ['ping'] // Komutun kullanılabileceği diğer isimler
    },
    help: {
      name: 'ping', // Komut adı
      description: 'Botun yanıt süresini gösterir.', // Komut açıklaması
      usage: 'ping' // Komut kullanım şekli
    },
    run: async (client, message, args) => {
      const msg = await message.channel.send('Pinging...'); // Yanıt mesajı gönder
      const ping = msg.createdTimestamp - message.createdTimestamp; // Ping hesapla
      msg.edit(`Pong! Botun yanıt süresi: ${ping}ms`); // Yanıt süresini güncelle
    }
  };
  
const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

const client = require('../bot');

client.commands = new Collection();
client.aliases = new Collection();
client.guildData = new Collection(); // Burada da client.guildData'nın tanımlı olduğundan emin olun.

client.on('ready', () => {
    console.log('_________________________________________');
    console.log(`Kullanıcı İsmi     : ${client.user.username}`);
    console.log(`Sunucular          : ${client.guilds.cache.size}`);
    console.log(`Kullanıcılar       : ${client.users.cache.size}`);
    console.log(`Prefix             : ${prefix}`);
    console.log(`Toplam Komut       : ${client.commands.size}`);
    console.log(`Durum              : Bot Çevrimiçi!`);
    console.log('_________________________________________');

    // Komutları yükleme
    const commandFiles = fs.readdirSync('./komutlar/').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(__dirname, '../komutlar', file);
        const props = require(filePath);

        if (props.help && props.help.name) {
            client.commands.set(props.help.name, props);
            if (props.conf && props.conf.aliases) {
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            }
        } else {
            console.error(`Komut dosyasında 'name' özelliği bulunamadı: ${file}`);
        }
    }

    // Oynuyor kısmını ayarla
    client.user.setPresence({ activities: [{ name: 'Dünyanın ayarlarıylan' }], status: 'online' });
});

module.exports = client;

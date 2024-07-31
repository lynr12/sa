const { EmbedBuilder } = require("discord.js");
const ayarlar = require("../ayarlar.json");
const client = require("../bot");
const prefix = ayarlar.prefix;

client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Komutları kontrol et
  if (client.commands.has(command)) {
    const cmd = client.commands.get(command);
    cmd.run(client, message, args);
  } else if (client.aliases.has(command)) {
    const cmd = client.commands.get(client.aliases.get(command));
    cmd.run(client, message, args);
  }
});

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const ayarlar = require("./ayarlar.json");

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

client.guildData = new Collection();

module.exports = client;

require("./events/message.js");
require("./events/ready.js");

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

client.login(process.env.TOKEN || ayarlar.token);

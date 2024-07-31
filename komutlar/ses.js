const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    // Kullanıcının gerekli izne sahip olup olmadığını kontrol et
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        return message.channel.send('You need the `Manage Server` permission.');
    }

    // Kullanıcının sesli kanalda olup olmadığını kontrol et
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send('You need to be in a voice channel to use this command.');
    }

    // Botun sesli kanalda bağlantı ve konuşma izinlerine sahip olup olmadığını kontrol et
    const permissions = voiceChannel.permissionsFor(message.guild.members.me);
    if (!permissions.has(PermissionsBitField.Flags.Connect)) {
        return message.channel.send('I do not have permission to connect to this voice channel.');
    }
    if (!permissions.has(PermissionsBitField.Flags.Speak)) {
        return message.channel.send('I do not have permission to speak in this voice channel.');
    }

    try {
        // Sesli kanala katılma işlemini gerçekleştir
        await voiceChannel.join();
        message.channel.send('I have successfully joined the voice channel.');
    } catch (error) {
        console.error(error);
        message.channel.send('An error occurred while trying to join the voice channel.');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['join', 'katıl'],
    permLevel: 3
};

exports.help = {
    name: 'katıl',
    description: 'Join a voice channel.',
    usage: '&katıl'
};

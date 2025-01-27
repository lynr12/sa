const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replies = [
        "https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
        "https://media.giphy.com/media/ygCJ5Bul73NArGOSFN/giphy.gif",
        "https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif",
        "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
        "https://media.giphy.com/media/xTiTnf9SCIVk8HIvE4/giphy.gif",
        "https://media.giphy.com/media/sMaW02wUllmFi/giphy.gif",
        "https://media.giphy.com/media/ywltiPg8uQ11hLGmK4/giphy.gif",
        "https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif",
        "https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif",
        "https://media.giphy.com/media/VkIet63SWUJa0/giphy.gif"
    ];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new EmbedBuilder()
        .setTitle("Köpeğin;")
        .setColor("#FF69B4")
        .setFooter({ text: `Köpeğin ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        .setImage(replies[result]);

    await message.channel.send({ embeds: [gifembed] });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['gifs'],
    permLevel: 0
};

exports.help = {
    name: 'köpek',
    description: 'Rastgele köpek gif atar.',
    usage: 'köpek'
};

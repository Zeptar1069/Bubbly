const { Message, Client } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'test',
    aliases: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply('pong')
    },
};
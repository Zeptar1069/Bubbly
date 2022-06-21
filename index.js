const { Client, Collection } = require('discord.js');
const config = require('./config');
const client = new (require('discord.js').Client)({ intents: [32767, 32768] });

client.events = new Collection();
client.commands = new Collection();
client.slashes = new Collection();
client.aliases = new Collection();

['event', 'message', 'slash']
    .forEach((file) => require(`./handlers/${file}`)(client));

module.exports = { client };

client.login(config.token);
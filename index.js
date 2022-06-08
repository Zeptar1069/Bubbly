const client = new (require('./client'))();

['event', 'message', 'slash']
    .forEach((file) => require(`./handlers/${file}`)(client));

module.exports = { client };
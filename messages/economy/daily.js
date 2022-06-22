const { EmbedBuilder, Client, Message } = require('discord.js');
const balance = require('../../schemas/balance');
const daily = require('../../schemas/daily');
const ms = require('pretty-ms');

module.exports = {
    name: 'daily',
    description: 'Claim a bunch of money every day. Build a streak and increase the amount!',
    category: 'economy',
    aliases: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const timeout = 86400000;
        let profileBalance;
        let profileDaily;

        try {
            profileBalance = await balance.findOne({ userID: message.author.id });
            if(!profileBalance) {
                profileBalance = await balance.create({
                    userID: message.author.id,
                    wallet: 500,
                    bank: 500,
                });
                profileBalance.save();
            };

            profileDaily = await daily.findOne({ userID: message.author.id });
            if(!profileDaily) {
                profileDaily = await daily.create({
                    userID: message.author.id,
                    check: 0,
                });
                profileDaily.save();
            };

            if(profileDaily) {
                if(profileDaily.check !== null && timeout - (Date.now() - profileDaily.check) > 0) {
                    const timeleft = ms(timeout - (Date.now() - profileDaily.check), { verbose: true, secondsDecimalDigits: 0 });
                    const embedWait = new EmbedBuilder()
                        .setTitle('You\'ve already claimed your daily')
                        .setDescription(`Your next daily is ready in:\n**${timeleft}**`);
                    message.reply({ embeds: [embedWait] });
                } else {
                    const embedClaim = new EmbedBuilder()
                    message.reply('You claimed it! Come back after 1 day!')
                    await balance.findOneAndUpdate({ userID: message.author.id, wallet: profileBalance.wallet + 300 });
                    await daily.findOneAndUpdate({ userID: message.author.id, check: Date.now() });
                };
            };
        } catch(error) {
            console.error(error);
        };
    },
};
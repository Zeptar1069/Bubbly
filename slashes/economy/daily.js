const { EmbedBuilder, Client, interaction, CommandInteraction, ApplicationCommandType } = require('discord.js');
const balance = require('../../schemas/balance');
const daily = require('../../schemas/daily');
const ms = require('pretty-ms');

module.exports = {
    name: 'daily',
    description: 'Claim a stack of money every day',
    type: ApplicationCommandType.ChatInput,
    aliases: [],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const timeout = 86400000;
        let profileBalance;
        let profileDaily;

        try {
            profileBalance = await balance.findOne({ userID: interaction.user.id });
            if(!profileBalance) {
                profileBalance = await balance.create({
                    userID: interaction.user.id,
                    wallet: 500,
                    bank: 500,
                });
                profileBalance.save();
            };

            profileDaily = await daily.findOne({ userID: interaction.user.id });
            if(!profileDaily) {
                profileDaily = await daily.create({
                    userID: interaction.author.id,
                    check: 0,
                });
                profileDaily.save();
            };

            if(profileDaily) {
                if(profileDaily.check !== null && timeout - (Date.now() - profileDaily.check) > 0) {
                    const timeleft = ms(timeout - (Date.now() - profileDaily.check), { verbose: true, secondsDecimalDigits: 0 });
                    const embedWait = new EmbedBuilder()
                        .setTitle('Your daily is already claimed')
                        .setDescription(`Your next daily is ready in:\n**${timeleft}**`)
                        .setColor(0xFF7F7F);
                    interaction.editReply({ embeds: [embedWait] });
                } else {
                    const embedClaim = new EmbedBuilder()
                        .setTitle(`${interaction.user.username}'s Daily Coins`)
                        .setDescription(`*⌾ 300* was added into your wallet!\n\nBuild a streak and gain more money!\n\nYour next daily is ready in:\n*23 hours 59 minutes 59 seconds*`)
                        .setColor(0x53a1f5);
                    interaction.editReply('You claimed it! Come back after 1 day!')
                    await balance.findOneAndUpdate({ userID: interaction.user.id, wallet: profileBalance.wallet + 300 });
                    await daily.findOneAndUpdate({ userID: interaction.user.id, check: Date.now() });
                };
            };
        } catch(error) {
            console.error(error);
        };
    },
};
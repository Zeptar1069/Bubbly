const { EmbedBuilder, Client, Message } = require('discord.js');
const balance = require('../../schemas/balance');

module.exports = {
  name: 'balance',
  description: 'Get to view your rich balance!',
  category: 'economy',
  aliases: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let member = message.author;
    let profile;

    try {
      profile = await balance.findOne({ userID: member.id });
      if(!profile) {
        profile = await balance.create({
          userID: member.id,
          wallet: 500,
          bank: 500,
        });
        profile.save();
      };
    } catch(error) {
      console.error(error);
    };

    if(profile) {
      let embedBalance = new EmbedBuilder()
      .setTitle(`${member.username}'s balance`)
      .setDescription(`Net: \`⌾ ${profile.wallet + profile.bank}\``)
      .addFields(
        { name: 'Wallet', value: `\`\`\`⌾ ${profile.wallet.toString()}\`\`\``, inline: true },
        { name: 'Bank', value: `\`\`\`⌾ ${profile.bank.toString()}\`\`\``, inline: true },
      )
      .setColor(0x53a1f5);

      message.reply({ embeds: [embedBalance] });
    };
  },
};
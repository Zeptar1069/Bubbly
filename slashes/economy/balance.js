const { EmbedBuilder, Client, CommandInteraction, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const balance = require('../../schemas/balance');

module.exports = {
  name: 'balance',
  description: 'View your total balance',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'user',
      description: 'View other people\'s total balance',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    let user = client.users.cache.get(args[0]) ?? interaction.user;
    let profile;

    try {
      profile = await balance.findOne({ userID: user.id });
      if(!profile) {
        profile = await balance.create({
          userID: user.id,
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
        .setTitle(`${user.username}'s balance`)
        .setDescription(`Net: \`⌾ ${profile.wallet + profile.bank}\``)
        .addFields(
          { name: 'Wallet', value: `\`\`\`⌾ ${profile.wallet.toString()}\`\`\``, inline: true },
          { name: 'Bank', value: `\`\`\`⌾ ${profile.bank.toString()}\`\`\``, inline: true },
      )
      .setColor(0x53a1f5);

      await interaction.editReply({ embeds: [embedBalance] });
    };
  },
};
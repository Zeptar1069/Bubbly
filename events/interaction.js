const { client } = require('../index');

client.on('interactionCreate', async (interaction) => {
  if(interaction.isChatInputCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(console.error);

    const command = client.slashes.get(interaction.commandName);
    const args = [];

    if(!command) return interaction.followUp({ content: 'An error occured!' });

    for(let option of interaction.options.data) {
      if(option.type === 'SUB_COMMAND') {
        if(option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if(x.value) args.push(x.value);
        });
      } else if(option.value) args.push(option.value);
    };

    interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    await command.run(client, interaction, args).catch(console.error);
  };

  if(interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashes.get(interaction.commandName);
    if(command) await command.run(client, interaction).catch(console.error);
  };
});

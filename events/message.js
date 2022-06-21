const { client } = require('../index');

client.on('messageCreate', async (message) => {
  if(message.author.bot ||
     !message.content.startsWith('.') ||
     !message.guild
  ) return;

  const [cmd, ...args] = message.content
    .slice(1)
    .trim()
    .split(/ +/g);

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd));

  if(!command) return;
  if(command.owner && message.author.id !== '893211748767768606') return;
  
  await command.run(client, message, args);
});
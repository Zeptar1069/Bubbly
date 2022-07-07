const { EmbedBuilder, Client, Message, ActionRow, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Stuck on something? Get help!',
    category: 'utility',
    aliases: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) =>
            str[0].toUpperCase() + str.slice(1).toLowerCase();

        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter(
                (cmd) => cmd.directory === dir
            ).map((cmd) => {
                return {
                    name: cmd.name,
                    description: cmd.description ?? 'Nothing here',
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const comp = new ActionRow().addComponents(
            new ButtonBuilder()
                .setCustomId('adv')
                .setLabel('Test')
                .setCustomId('primary')
        );

        console.log(comp)

        message.channel.send({ content: 'Test', components: [comp] });
    },
};
const { EmbedBuilder, Client, Message, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'The official help menu of Ali The Detective',
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

        let categories = directories.map((dir) => {
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

        const embedHelp = new EmbedBuilder()
            .setTitle('Ali The Detective')
            .setDescription('Welcome to Ali The Detective\'s help menu!\nMy prefix for the serer is ` . ` (default)')
            .setThumbnail('https://i.ibb.co/wyKC7k4/av.png')
            .setColor(0x53a1f5);

        categories = categories.slice(1);

        const comp = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId('help-menu')
                .setPlaceholder('Select a category')
                .addOptions(
                    categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands from ${cmd.directory} category`,
                        };
                    }),
                ),
        );

        const msg = await message.channel.send({embeds: [embedHelp], components: [comp] });

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.SelectMenu, time: 30000 });

        collector.on('collect', async (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find((x) => x.directory.toLowerCase() === directory);

            await interaction.deferUpdate();

            const collectorEmbed = new EmbedBuilder()
                .setTitle(directory[0].toUpperCase() + directory.slice(1) + ' Commands')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: cmd.name,
                            value: cmd.description,
                        };
                    }),
                )
                .setColor(0x53a1f5);

            await interaction.editReply({ embeds: [collectorEmbed] });
        });

        collector.on('end', async (interaction) => {
            comp.components[0].setDisabled(true);
            await msg.edit({ components: [comp] });
        });
    },
};
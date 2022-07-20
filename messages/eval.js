const { EmbedBuilder } = require('@discordjs/builders');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: 'Evaluate the given code',
    category: 'developer',
    aliases: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const input = message.content.split(' ').slice(1).join(' ');
  
        const embedInput = new EmbedBuilder()
            .setTitle('Missing code')
            .setColor(0x53a1f5)
            .setDescription('There is no code given to evaluate.');
        
        if(!input) return message.reply({ embeds: [embedInput] });
        
        try {
            const result = await eval(input);
            let output = result;
            
            if(typeof result !== 'string') output = inspect(result);
            if(output.includes(client.token.slice(3)) ?? output.includes(client.token.slice(0, -3))) output = undefined;
            
            const embedEval = new EmbedBuilder()
                .setTitle('Evaluated code')
                .setDescription('```ini\n[ Successful evaluation ]```')
                .setColor(0x53a1f5)
                .addFields({ name: 'Output', value: `\`\`\`js\n${output}\`\`\`` });
            
            message.reply({ embeds: [embedEval] });
        } catch(error) {
            const embedError = new EmbedBuilder()
                .setTitle('Evaluated code')
                .setDescription('```css\n[ Evaluation error ]```')
                .setColor(0x53a1f5)
                .addFields({ name: 'Output', value: `\`\`\`js\n${error}\`\`\`` });
        
            message.reply({ embeds: [embedError] });
        };
    },
};
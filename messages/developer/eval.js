const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: '',
    category: 'developer',
    aliases: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const input = message.content.split(' ').slice(1).join(' ');
  
        const embedInput = {
            description: `give me something to eval`
        };
        
        if(!input) return message.reply({ embeds: [embedInput] });
        
        try {
            const result = await eval(input);
            let output = result;
            
            if(typeof result !== 'string') output = inspect(result);
            if(output.includes(client.token.slice(3))) output = undefined;
            
            const embedEval = {
                title: 'Output',
                description: `\`\`\`js\n${output}\`\`\``,
            };
            
            message.reply({ embeds: [embedEval] });
        } catch(error) {
            const embedError = {
                title: 'Output',
                description: `\`\`\`js\n${error}\`\`\``,

            };
        
            message.reply({ embeds: [embedError] });
        };
    },
};
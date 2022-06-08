const { glob } = require('glob');
const { Client } = require('discord.js');
const globPromise = require('util').promisify(glob);

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const commands = await globPromise(
    `${process.cwd()}/slashes/*/*.js`
  );

  const commandArray = [];

  commands.map((value) => {
    const file = require(value);
    if(!file.name) return;  
    client.slashes.set(file.name, file);
    commandArray.push(file);
  });

  client.on('ready', async () => {
    await client.application.commands.set(commandArray);
  });
};

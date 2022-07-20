const { glob } = require('glob');
const { Client } = require('discord.js');
const globPromise = require('util').promisify(glob);

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const commandFiles = await globPromise(`${process.cwd()}/messages/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split('/');
    const directory = splitted[splitted.length - 2];
    const properties = { directory, ...file };

    if(file.aliases) file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
    
    client.commands.set(file.name, properties);
  });
};
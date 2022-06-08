const { glob } = require('glob');
const { Client } = require('discord.js');
const globPromise = require('util').promisify(glob);

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
  const events = await globPromise(`${process.cwd()}/events/*.js`);
  events.forEach((value) => require(value));
  client.events.set(events)
};

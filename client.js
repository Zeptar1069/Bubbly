const { Client, Collection } = require('discord.js');
const config = require('./config');

module.exports = class BaseClient extends Client {
  constructor() {
    super({ intents: [32767, 32768] });
    this.login('OTMzMTMzMTc2MTQ1MDgwMzQw.GlDIZq.NTUqL2WZX_LumsaBEVJ4VnZDsri0hAL8zDU654');
    this.owner = this.users.fetch('893211748767768606');
    this.prefix = '.';
    this.events = new Collection();
    this.commands = new Collection();
    this.slashes = new Collection();
    this.aliases = new Collection();
  };
};
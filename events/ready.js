const { client } = require('../index');
const { mongoKey } = require('../config');
const mongoose = require('mongoose');

client.on('ready', async () => {
  console.log('Ali The Detective is up!');
  mongoose.connect(mongoKey, { keepAlive: true });
  client.user.setActivity('/help');
});
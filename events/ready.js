const { client } = require('../index')

client.on('ready', async () => {
  console.log('Bubbly up!');
  client.user.setActivity('/help');
});
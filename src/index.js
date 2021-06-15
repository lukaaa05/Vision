const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./src/utils/registry');
const Discord = require('discord.js');
const config = require('./slappey.json');
require('dotenv').config();
const client = new Discord.Client();
client.snipes = new Map();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();


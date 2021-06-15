const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class DeleteCommand extends BaseCommand {
  constructor() {
    super('delete', 'moderation', []);
  }

  async run(client, message, args) {
      if  (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Nemas dozvolu da koristis ovu komandu.');
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Meni treba:  \` MANAGE_MESSAGES\` dozvola da bih brisao poruke.");
      if (!args[0]) return message.channel.send(" Moras navesti broj poruka koliko hoces da obrises. \`<delete broj \`");
      const amountToDelete = Number(args[0], 10);

      if (isNaN(amountToDelete)) return message.channel.send("Navedeni broj nije validan.");
      if (!Number.isInteger(amountToDelete)) return message.channel.send("Navedeni broj mora da bude celi broj.");
      if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send("Navedeni broj mora biti izmedju 2 i 100.");
      const fetched = await message.channel.messages.fetch({
        limit: amountToDelete
      }); 

      try {
        await message.channel.bulkDelete(fetched)
          .then(messages =>  message.channel.send(`Obrisano ${messages.size} poruka!`));
      } catch (err) {
        console.log(err);
        message.channel.send('Ne mogu da obrisem navedeni broj poruka, budi siguran da poruke nisu starije od 14 dana.');
      };
  }
}
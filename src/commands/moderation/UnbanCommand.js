const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    // Permission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Meni treba: \`BAN_MEMBERS\` dozvola da bih mogao unbanovati.");

    // Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    // Input Checkings:
    if (!reason) reason = 'Nepoznat razlog.';
    if (!args[0]) return message.channel.send('Moras navesti nekog za unbanovanje.\`<unban memberID razlog\`');
    if (isNaN(args[0])) return message.channel.send('Navedei ID nije ceo broj. \`<unban memberID razlog\`');

    // Executing: 
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send('Ovaj server nema nikog banovanog.');
      let bUser = bans.find(b => b.user.id == userID); 
      if (!bUser) return message.channel.send('Navedeni memberID nije banovan.');
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send('Nesto je krenulo naopako.');
      }).then(() => {
        message.channel.send(`Uspesno je unbanovan: ${args[0]}`);
      });
    });
  }
}
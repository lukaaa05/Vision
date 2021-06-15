const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given";
    const kickEmbed  = new Discord.MessageEmbed()
      .setTitle(`You were kicked ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#0a5569")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    // <kick @user dm ads
    if (!args[0])  return message.channel.send("Moras tagovati membera kojeg zelis da kickujes. \`<kick @member razlog\`");
    if (!mentionedMember) return message.channel.send("Tagovani member nije na serveru.");
    if (!mentionedMember.kickable) return message.channel.send('Ne mogu da kickujem tog membera.');
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log(`Nisam uspeo da posaljem poruku tom memberu.`);
    }

    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      return message.channel.send("Nisam uspeo da kickujem tagovanog membera.");
    }
  }
}
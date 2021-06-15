const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    // Permission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Meni treba: \`BAN_MEMBERS\` dozvola da bih bonavao membera.");
    
    // Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    // Input Checkings:
    if (!reason) reason = 'Nepoznat razlog.';
    if (!args[0]) return message.channel.send('Moras tagovati nekog da banujes.\`<ban @member razlog\`');
    if (!mentionedMember) return message.channel.send('Tagovani member nije na servereru.')
    if (!mentionedMember.bannable) return message.channel.send('Ja ne mogu da banujem tog membera.');

    // Executing:
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`Ti si banovan sa: ${message.guild.name}`)
      .setDescription(`Razlog banovanja je: ${reason}`)
      .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("Uspesno je banovan: " + mentionedMember.user.tag));
  }
}
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Meni treb \`MANAGE_ROLES\` da bih mute-ovao.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('837619663629975552');
    const memberRole = message.guild.roles.cache.get('837619654238142514');
    const mentionedMember = message.mentions.members.first();
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("#0a5569")
      .setTimestamp();

    if (!args[0]) return message.channel.send('\`<mute @member razlog\`');
    if (!mentionedMember) return message.channel.send("Navedeni member nije na serveru.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("Ne mozes samog sebe da mute-as.");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("Ne mozes da me mute-as sa mojom sopstvenom komandom.");
    if (!reason) reason = 'Nepoznat razlog';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send("Ovaj member je vec mute-ovan.");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("Ne mozes da mute-as membera koji ima isti ili veci role od tebe.");

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send("Nastala je greska davajuci mute role.")));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send("Nastala je greska uklanjajuci member role.")));

  }
}
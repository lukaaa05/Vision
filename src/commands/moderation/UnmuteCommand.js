const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Meni treba: \`MANAGE_ROLES\`da bih mute-ovao.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('837619663629975552');
    const memberRole = message.guild.roles.cache.get('837619654238142514');
    const mentionedMember = message.mentions.members.first();
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`Unmute-ovan si sa: ${message.guild.name}`)
      .setDescription(`Razlog unmute-ovanja: ${reason}.`)
      .setColor("#0a5569")
      .setTimestamp();

    if (!args[0]) return message.channel.send('\`<unmute @member razlog\`');
    if (!mentionedMember) return message.channel.send("Navedeni member nije na serveru.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("Ne mozes mote-ovati samog sebe");
    if (mentionedMember.user.id == client.user.id) return message.channel.send("Ne mozes me mute-ovati mojom sopstvenom komandom.");
    if (!reason) reason = 'Nepoznat razlog';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send("Ovaj member je vec unmute-ovan");
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("Ne mozes da unmute-as membera koji ima isti ili veci role od tebe.");

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send("Nastala je greska pri davanju member role-a.")));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send("Nastala je greska pri sklanjanju mute role-a.")));
  }
}
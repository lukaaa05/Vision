const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AddroleCommand extends BaseCommand {
  constructor() {
    super('addrole', 'moderation', []);
  }

  async run(client, message, args) {
    // <addrole @member @role
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel("Meni treba: \`MANAGE_ROLES\` dozvola da bih menjao rolove.");

    const mentionedMember = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!args[0]) return message.channel.send("Moras tagovati membera kome zelis da das role, takodje ne zaboravi da tagujes role koji zelis da mu das.");
    if(!mentionedMember) return message.channel.send("Tagovani member nije na serveru.");
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Ne mozes da das role ovom memberu jer je njegov role isti ili veci od tvog.");
    if (!args[1]) return message.channel.send("Moras tagovati role koji zelis da das memberu.");
    if(!role) return message.channel.send("Tagovani role ne postoji.");
    if (message.member.roles.highest.position <= role.position) return message.channel.send("Ne mozes da das role ovom memberu jer je njegov role isti ili veci od tvog najviseg role-a.");

    await mentionedMember.roles.add(role.id).catch(err => console.log(err));
  }
}
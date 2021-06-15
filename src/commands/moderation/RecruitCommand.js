const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RecruitCommand extends BaseCommand {
  constructor() {
    super('recruit', 'moderation', []);
  }

  async run(client, message, args) {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Nemas dozvolu da koristis ovu komandu."); 
   if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Meni treba: \`MANAGE_ROLES\` dozvola da bih mogao nekoga da preobrazim u staff-a.");

   const pingRole = message.guild.roles.cache.get('837619652192108565');
   const staffRole = message.guild.roles.cache.get('837619650850062347');
   const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);  
   const staffPrefix = 'Vision™️ Staff | '

   if (!pingRole) return message.channel.send("Nema staff team role za dati.");
   if (!staffRole) return message.channel.send("Nema staff role za dati.");
   if (!args[0]) return message.channel.send("\`<recruit @member\` ili \`<recruit memberID\`");
   if (!mentionedMember) return message.channel.send("Navedeni member nije na serveru.");

   await mentionedMember.roles.add(pingRole.id).catch(err => message.channel.send(`Nisam mogao da dam Staff Team role: ${err}`));
   await mentionedMember.roles.add(staffRole.id).catch(err => message.channel.send(`Nisam mogao da dam Staff role: ${err}`));
   await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);
  }
}
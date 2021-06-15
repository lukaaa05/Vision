const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Meni treba \`BAN_MEMBERS\` dozvola da bih mogao tempbanovatgi.");

   const mentionedMember = message.mentions.members.first();
   let reason = args.slice(2).join(" ");
   let time = args[1];
   const banEmbed = new Discord.MessageEmbed()
    .setTitle(`Banovan si sa: ${message.guild.name}`)
    .addField(`Razlog: ${reason}`, `Vreme: ${time}`)
    .setTimestamp();

  if (!args[0]) return message.channel.send("Moras navesti membera kojeg hoces tempban-ati.\`<tempban @member razlog\`");
  if (!mentionedMember) return message.channel.send("Navedeni member nije na serveru.");
  if (!mentionedMember.bannable) return message.channel.send("Ovaj member ne moze da se banuje.");
  if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Ne mozes da tempban-ujes membera koji ima isti ili veci role od tebe.");
  if (!reason) reason = "Nepoznati razlog.";
  if (!time) return message.channel.send("Moras navesti vreme za tempban. \`<tempban @member 5min\`");

  await mentionedMember.send(banEmbed).catch(err => console.log(err));
  await mentionedMember.ban({
    days: 7,
    reason: reason
  }).catch(err => console.log(err));

    setTimeout(async function () {
      await message.guild.fetchBan().then(async bans => {
        if (bans.size == 0) return message.channel.send("Ovaj server nema ni 1 ban.");
        let bannedUser = bans.find(b => b.user.id  == mentionedMember.id);
        if (!bannedUser) return console.log("Member je unbanovan");
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
      });
    }, ms(time));
}
}
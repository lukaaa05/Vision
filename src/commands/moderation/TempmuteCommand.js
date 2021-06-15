const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const ms = require("ms");

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super("tempmute", "moderation", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))return message.channel.send("Meni treba: \`MANAGE_ROLES\` dozvola da bih tempmute-ovao." );

    const muteRole = message.guild.roles.cache.get("837619663629975552");
    const memberRole = message.guild.roles.cache.get("837619654238142514");
    const mentionedMember = message.mentions.members.first();
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`Ti si mute-ovan na: ${message.guild.name}.`)
      .addField(`Vreme: ${time}`, `Razlog : ${reason}`)
      .setTimestamp();

    if (!args[0])
      return message.channel.send(
        "Moras navesti membera za tempmute kao i vreme istog. `<tempmute @member vreme razlog`"
      );
    if (!mentionedMember)
      return message.channel.send("Navedeni member nije na serveru.");
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Ne mozes da tempmute-as membera koji ima isti ili veci role od tebe.");
    if (!time) return message.channel.send("Moras navesti vreme za tempmute. `<tempmute @member vreme razlog`");
    if (!reason) reason = "Nepoznat razlog.";

    await mentionedMember.roles.add(muteRole.id).catch((err) => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch((err) => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch((err) => console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch((err) => console.log(err));
      await mentionedMember.roles.remove(muteRole.id).catch((err) => console.log(err));
      await mentionedMember.send(`Dobio si tempmute na: ${message.guild.name} `).catch((err) => console.log(err));
    }, ms(time));
  }
};

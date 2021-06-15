const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {
    // <nuke reason
    // Permission Checking 
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Nemas dozvolu da koristis ovu komandu.");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Meni treba: \`MANAGE_CHANNELS\` dozvola da bih klonirao i obrisao ovaj kanal.");

    // Variables 
    let reason = args.join(" ");
    const nukeChannel = message.channel;

    // Input Checking
    if (!reason) reason = "Nepoznat razlog.";
    if(!nukeChannel.deleteable) message.channel.send("Ovaj kanal ne moze da se obrise.");

    //Executing 
    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));

  }
}
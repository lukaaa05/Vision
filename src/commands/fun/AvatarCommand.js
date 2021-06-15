const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'fun', ['av']);
  }

  async run(client, message, args) {
    let mentionedMember = message.mentions.members.first();
    if (!mentionedMember) mentionedMember = message.member;

    const embed = new Discord.MessageEmbed()
      .setTitle(mentionedMember.user.tag + "ovo je tvoj avatar.")
      .setImage(mentionedMember.user.displayAvatarURL());

    message.channel.send(embed);
  }
}
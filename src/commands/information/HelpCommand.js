const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'tool', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
   .setTitle('Bot Help Sekcije')
   .setDescription('Koristi <help [ime sekcije] \nSekcije:\ninformacije\nzabava\nadministracija')
   .addField('Komande za zabavu.', 'Komande koji svi memberi mogu da koriste i nemaju neku korist sem zabave.')
   .addField('Komande za informacije.', 'Komande koje prikazu informacije za server.')
   .addField('Komande za administraciju', 'Komande za administraciju servera.')
   .setFooter(client.user.tag, client.user.displayAvatarURL());
 
const infoEmbed = new Discord.MessageEmbed()  
   .setTitle('Komande za informacije.')
   .addField('Help Komanda', 'Ova komanda prikazuje sve komande bota.');
 
const funEmbed = new Discord.MessageEmbed()
   .setTitle('Komande za zabavu')
   .addField('Avatar Komanda', 'Prikaze avatar tagovanog membera.')
   .addField('Meme Komanda', 'Komanda koja u chatu u kome je iskoristena salje memove.')
   .addField('Predlog Komanda', 'Komanda kaze sama za sebe, ako imate neki predlog za server.');
 
const moderationEmbed = new Discord.MessageEmbed()
   .setTitle('Komande za administraciju.')
   .addField('Ban Komanda', 'Bans komanda banuje tagovanog membera sa servera.')
   .addField('Kick Komanda', 'Kicks komanda kickuje tagovanog membera sa servera.')
   .addField('Lock Komanda', 'Lock komanda zakljucava kanal u kome je iskoristena.')
   .addField('Mute Komanda', 'Mute komanda ne dozvoljava tagovanom memberu da pise u chatu sve dok ga neko od staff tima ne unmute.')
   .addField('Nickname Komanda', 'Nickname komanda ti menja nickname (nadimak) na serveru.')
   .addField('Nuke Komanda', 'Nuke komanda klonira kanal u kome je iskoristena i izbrise stari.')
   .addField('Delete Komanda', 'Delete komanda sluzi za brisanje poruka u kanalu u kome je iskoristena.')
   .addField('Recruit Komanda', 'Recruit komanda sluzi da tagovanog membera ubaci u staff tim.')
   .addField('Tempban Komanda', 'Tempban komanda banuje tagovanog membera na odredjeno vreme.')
   .addField('Tempmute Komanda', 'Tempmute komanda ne dozvoljava memberu da pise u chatu sve dok ne istekne odredjeno vreme.')
   .addField('Unban Komanda', 'Unban komanda unbanuje tagovanog membera koji je banovan.')
   .addField('Unlock Komanda', 'Unlock komanda otkljucava kanal u kome je iskoristena.')
   .addField('Unmute Komanda', 'Unmute komanda dozvoljava tagovanom memberu koji je bio mute-ovan da opet pise u chatu.')
   .addField('AddRole Komanda', 'AddRole komanda daje tagovanom memberu odredjeni role.')

if (!args[0]) return message.channel.send(sectionEmbed);
if (args[0] == 'informacije') return message.channel.send(infoEmbed);
else if (args[0] == 'zabava') return message.channel.send(funEmbed);
else if (args[0] == 'adminstracija') return message.channel.send(moderationEmbed);
  }
}
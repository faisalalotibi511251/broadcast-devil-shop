if(!Discord) var Discord = require('discord.js');
if(!client) var client = new Discord.Client();
if(!prefix) var prefix = "-";

client.on('message', message => {
const adminprefix = "-";
const devs = ['195088897234042880','482506893969981440'];
	var command = message.content.split(" ")[0];
	if(command == adminprefix + 'bc') {
		var args = message.content.split(' ').slice(1).join(' ');
		if(message.author.bot) return;
		if(!args) return message.channel.send(`**:x: | Please write something to sumbit broadcast to all members**`).then(msg => msg.delete(5000));
		
		let bcSure = new Discord.RichEmbed()
		.setTitle(`**Are you sure to sumbit your broadcast to ( ** ${message.guild.memberCount} ** ) Members?**`)
		.setColor('RANDOM')
		.setDescription(`**\n:envelope: | ➥ Your Message : **\n\n${args}`)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(bcSure).then(msg => {
			msg.react('✅').then(() => msg.react('❎'));
			message.delete();
			
			
			let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
			let noEmoji = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
			
			let sendBC = msg.createReactionCollector(yesEmoji);
			let dontSendBC = msg.createReactionCollector(noEmoji);
			
			sendBC.on('collect', r => {
				message.guild.members.forEach(member => {
					member.send(args.replace(`[user]`, member)).catch();
					if(message.attachments.first()){
						member.sendFile(message.attachments.first().url).catch();
					}
				})
				message.channel.send(`:timer: | **Broadcast Message send to** \`\`${message.guild.memberCount}\`\` **Message**`).then(msg => msg.delete(5000));
				msg.delete();
			})
			dontSendBC.on('collect', r => {
				msg.delete();
				message.reply(':white_check_mark: | **Broadcast Message cancel**').then(msg => msg.delete(7000));
			});
		})
	}
});

const adminprefix = "-";
const devs = ['195088897234042880','482506893969981440'];
client.on('message', message => {
  var argresult = message.content.split(` `).slice(1).join(' ');
    if (!devs.includes(message.author.id)) return;
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark: | i am Watching now : ${argresult}**`).then(message => {message.delete(6000)})
}
});

client.login(process.env.BOT_TOKEN);

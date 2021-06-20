const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Hackathon is online!');
    memberCounter(client);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ding'){
        message.channel.send('dong');
    }
    if(command === 'ping'){
        if(message.member.roles.cache.has('855829396703150080')){
            message.channel.send('pong!');
        }
          else {
              message.channel.send('Ask your mommy if you can play ping pong');
          }
    }
    if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
    if(command === 'hi'){
        client.commands.get('greeting').execute(message, args);
    }
    if (command === 'punish'){
        client.commands.get('mute').execute(message, args);
      }
    if (command === 'unpunish'){
        client.commands.get('unmute').execute(message, args);
    }
    if(command === 'hi'){
        message.channel.send('How are you doing today?');
        client.commands.get('greeting').execute(message, args);
    }

})


client.login('ODU1ODA5ODIzNDY3MzcyNTU1.YM35Ag.y1yC32EhCrJpDggTzm0exN5qnBs');
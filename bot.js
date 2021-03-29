const Discord = require('discord.js');
const fs = require('fs');
const World = require('./world/world.js');
const filePath = "config.json";
const client = new Discord.Client();
const token = 'ODI0NTU5NDE2MTA3MjA0NjU4.YFxIzA.G-RgFQ9-82msxTFDKGBehUROlZA';
var worlds = new Object();
var worldsIds = [];
var triger = loadConfig();

function loadConfig(){
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        triger = JSON.parse(data.toString());
    });
}

client.once('ready', () => {
    console.log('Bot Discord OK');
    client.channels.cache.filter(channel => channel.name === triger.salon).forEach(channel => {
        console.log(channel.id);
    })
});

client.on("message", message => {
    var id = message.channel.id;
    var author = message.author;
    var msg = message.content.split(' ');
    
    if (msg[0] !== triger.cmd || message.channel.name !== triger.salon || msg.length <= 1)return 0;

    if (!worldsIds.includes(id))
    {
        worldsIds.push(id);
        worlds.id = new World(message.channel);
    }
    worlds.id.action(msg,author,triger.cmd);
  })

client.login(token);
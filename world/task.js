const Discord = require('discord.js');
const delay = require('delay');

class TaskTimer{
    constructor(task, hourDuration) {
        this.count = 0; 
        this.name = task.name;
        this.duration = task.duration;
        this.hourDuration = hourDuration;
    }

    async start(data,callback){
        while(this.count < this.duration)
        {
            ++ this.count;
            await delay(this.hourDuration)
        }
        return callback(data);
    }

    countDown(){return this.duration - this.count}

    time(author){
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Camarade " + author.username, author.displayAvatarURL())
            .addFields(
                { name: this.name, value: 'fin de tache dans `'+ this.countDown() +'` heure(s)'},
            );
    }

    time(){
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .addFields(
                { name: this.name, value: 'fin de tache dans `'+ this.countDown() +'` heure(s)'},
            );
    }
}

module.exports = TaskTimer;
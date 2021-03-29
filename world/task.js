const Discord = require('discord.js');
const delay = require('delay');

class TaskTimer{
    constructor(task, dayDuration) {
        this.count = 0; 
        this.name = task.name;
        this.duration = task.duration;
        this.dayDuration = dayDuration;
    }

    async start(data,callback){
        while(this.count < this.duration)
        {
            ++ this.count;
            console.log(this.count + ' ' + this.duration)
            await delay(this.dayDuration)
        }
        return callback(data);
    }

    countDown(){return this.duration - this.count}

    time(author){
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Camarade " + author.username, author.displayAvatarURL())
            .addFields(
                { name: this.name, value: 'fin de tache dans `'+ this.countDown() +'` jour(s)'},
            );
    }
}

module.exports = TaskTimer;
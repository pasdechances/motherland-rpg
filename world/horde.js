const Discord = require('discord.js');

class Horde{
    constructor(lvl,numberHordes) {
        this.lvl = lvl;
        this.maxDay = 5 + numberHordes;
        this.minDay = 2;
        this.maxHordeSize = 5 + numberHordes * lvl;
        this.minHordeSize = 2 + numberHordes * lvl;
        this.count = 0;
        this.setHordeCount();
    }

    setHordeCount(){
        this.count = this.random(this.minDay,this.maxDay);
    }

    number(fullMoonProximity){
        return fullMoonProximity * this.lvl + this.random(this.minHordeSize,this.maxHordeSize);
    }
    
    rush(fullMoonProximity){
        //hordePower
        //hordeDamage
        //number = (this.cptFM - 10) * townLvl
        return 0;
    }

    random(min, max){
        return Math.round(Math.random() * (max - min) + min);
    }

    embedInfoRush(){
        var embed = new Discord.MessageEmbed();
        return embed.setColor('#0099ff')
            .setTitle('La horde attaquera ce soir !!')    
    }
}

module.exports = Horde;
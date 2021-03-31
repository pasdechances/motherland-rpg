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

    random(min, max){
        return Math.round(Math.random() * (max - min) + min);
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

    embedInfoRush(){
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setTitle('La horde attaquera ce soir !!');
    }

    embedRush(){
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setTitle('La horde attaque !!') 
            .description("test");  
    }
}

module.exports = Horde;
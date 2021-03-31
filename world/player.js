const Discord = require('discord.js');
const Inventory = require('./inventory.js');
const TaskTimer = require('./task.js');

class Palyer {
    constructor(user) {
        this.id = user.id;
        this.name = "Camarade " + user.username;
        this.avatar = user.displayAvatarURL()
        this.lvl = 1;
        this.maxHordesSurvived = 0;
        this.hordesSurvived = 0;
        this.maxLife = 98;
        this.currentLife = 98;
        this.power = 1;
        this.out = false;
        this.alive = false;
        this.occuped = false;
        this.inventory = new Inventory(10);
        this.glove = new Inventory(1,'glove');
        this.jacket = new Inventory(1,'jacket');
        this.trousers = new Inventory(1,'trousers');
        this.shield = new Inventory(1,'shield');
        this.shoe = new Inventory(1,'shoe');
        this.hat = new Inventory(1,'hat');
        this.weapon = new Inventory(1,'weapon');
        this.tool = new Inventory(1,'tool');
        this.task = null;
    }

    init()
    {
        this.maxLife = this.maxLife + (this.lvl * 2);
        this.currentLife = this.maxLife;
        this.power = this.power + this.lvl;
        this.alive = true;
    }

    save(){
        if(this.maxHordesSurvived <= this.hordesSurvived)this.maxHordesSurvived = this.hordesSurvived;
        return {
            "id": this.id,
            "lvl": this.lvl,
            "maxHordesSurvived": this.maxHordesSurvived,
            "alive": this.alive
        }
    }

    lvlUp (){
        ++ this.lvl;
        this.power = this.power + this.lvl;
        this.maxLife = this.maxLife + (this.lvl * 2);
        this.currentLife = this.currentLife + (this.lvl * 2)
    }

    eat(meal){
        if (this.currentLife + meal.life > this.maxLife) this.currentLife = this.maxLife
        else this.currentLife = this.currentLife + meal.life
    }

    display(){
        return new Discord.MessageEmbed().setColor('#0099ff')
        .setAuthor(this.name, this.avatar)
        .setThumbnail(this.avatar)
        .addFields(
            { 
                name: 'Progression', 
                value: 
                    "Rang de Cammarade : " + this.lvl + "\n\
                    Max Hordes survécue : " + this.maxHordesSurvived + "\n\
                    Hordes survécue : " + this.hordesSurvived
            },
            { 
                name: 'Stats', 
                value: 
                    "Vie : " + this.currentLife + "/" + this.maxLife + "\n\
                    Attaque : " + this.power
            },
            { 
                name: 'Tenue', 
                value: 
                    "veste : " + (this.jacket ? this.jacket : "Nope") +"\n\
                    pantalon : " + this.trousers ? this.trousers : "none"  +"\n\
                    chaussures : " + this.shoe ? this.shoe : "none"  +"\n\
                    gant : " + this.glove ? this.glove : "none"  +"\n\
                    chapeau : " + this.hat ? this.hat : "none" ,
                inline : true
            },
            { 
                name: 'Equipement', 
                value: 
                    "bouclier : " + this.shield ? this.shield : "none"  +"\n\
                    arme : " + this.weapon ? this.weapon : "none"  +"\n\
                    outil : " + this.tool ? this.tool : "none" ,
                inline : true
            },
        )
    }

    beginHarvest(zone, world)
    {
        var task = {name : 'récolte', duration : 9};
        if(!world.zones.includes(zone))return world.broadcast(world.cmd.help('harvest')); // zone inconnue
        this.task = new TaskTimer(task, world.hoursDuration);
        this.occuped = true;
        this.task.start({world:world, author:this, zone:zone}, function (data){
            data.author.finishHarvest(data.author.id, data.zone, data.world);
        })
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setAuthor(this.name, this.avatar)
            .setTitle("Tu es parti récolter");
    }
    finishHarvest(id, zone, world){
        var harvestedItems = [];
        for (let index = 0; index < world.community.lvl; index++) {
            var rand = world.random(0, 100);
            if(rand <= 0) world.random(0, world.community.lvl+1); // combat
            else if(rand >= 0) harvestedItems.push(world.items.harvested(zone));
        }
        world.community.findPlayerById(id).inventory.addItems(harvestedItems);
        world.community.findPlayerById(id).occuped = false;
        console.log(harvestedItems);
        world.broadcast(
            new Discord.MessageEmbed().setColor('#0099ff')
            .setAuthor(world.community.findPlayerById(id).name, world.community.findPlayerById(id).avatar)
            .setTitle("Tu as fini la récolte")
            .setDescription("")
        );
    }
}

module.exports = Palyer
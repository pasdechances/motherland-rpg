const Discord = require('discord.js');
const delay = require('delay');

const Community = require('./community.js');
const Commandes = require('./commandes.js');
const Monster = require('./monster.js');
const TaskTimer = require('./task.js');
const Horde = require('./horde.js');
const Items = require('./items.js');
const Moon = require('./moon.js');

class World {
    constructor(channel) {
        this.channel = channel;
        this.dayDuration = 100000;
        this.numberHordes = 0;
        this.start = false;
        this.firstHorde = true;
        this.cmd = new Commandes();
        this.community = new Community();
        this.zombie = new Monster(this.community.lvl);
        this.horde = new Horde(this.community.lvl,this.numberHordes);
        this.moon = new Moon();
        this.items = new Items();
        this.taskList = new Object();
        this.zones = ['town', 'forest', 'fields', 'hills', 'river'];
    }

    broadcast(msg){this.channel.send(msg)}
    random(min, max){return Math.round(Math.random() * (max - min) + min)}

    async worldTimer(){
        this.time()
        while(this.start)
        {
            -- this.horde.count;
            -- this.moon.count;
            if(this.horde.count === 0)
            {
                this.broadcast(this.horde.embedInfoRush())
            }
            await delay(this.dayDuration)
            if(this.horde.count === 0)
            {
                console.log("attaque");
                ++ this.numberHordes;
                this.firstHorde = false;
                this.horde.rush(this.moon.getProximity())
                this.horde.setHordeCount();
                //attaque : 
                // ville attaque
                // horde attaque
                //  si ville plus point de vie 
                //   choisir alea joueur qui perd de la vie
                delete this.horde;
                this.horde = new Horde(this.community.lvl,this.numberHordes);
                if(this.community.playerAlive === 0) this.destruct();
            }
            if(this.moon.count === 0)this.moon.setMoonCount();
        } 
    }

    create(){
        this.start = true;
        this.firstHorde = true;
        this.worldTimer();
        this.broadcast(new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('**Survivez camarades !**')
        );
    }

    destruct(){
        this.start = false;
        this.community.save();
        this.broadcast(new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(':skull_crossbones: La partie est finie:skull_crossbones:')
            .setDescription('Tous les camarades sont mort')
        );
    }

    addUser(user){
        this.community.addUser(user.id);
        this.broadcast(new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor("Camarade " + user.username, user.displayAvatarURL())
            .setTitle('Au travail camarade !')
        );
    }

    inParty(id){
        var player = this.community.findPlayerById(id)
        if (!player) return false;
        if (player.alive) return true;
        else {
            this.broadcast("tu as été retouvé mort");
            return false;
        }
    }
    
    time(){
        this.broadcast(new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Time')
            .addFields(
                { name: 'Prochaine horde', value: 'dans `'+ this.horde.count +'` jour(s)', inline: true },
                { name: 'Prochaine pleine lune', value: 'dans `'+ this.moon.count +'` jour(s)', inline: true },
            )
        );       
    }

    travel(){
        ++ this.community.lvl;
        this.community.lvlUpAlive();
        this.zombie = new Monster(this.community.lvl);
        this.horde = new Horde(this.community.lvl,this.numberHordes);
    }

    embedRush(description){
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setTitle('La horde attaque !!') 
            .description(description);
    }

    embedStatus(name,status){
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setAuthor(message.author.username)
            .setTitle(name)
            .setDescription(status);
    }

    beginHarvest(author, zone)
    {
        if(!this.zones.includes(zone))return this.broadcast(this.cmd.help('harvest')); // zone inconnue
        this.broadcast(
            new Discord.MessageEmbed().setColor('#0099ff')
            .setAuthor("Camarade " + author.username, author.displayAvatarURL())
            .setTitle("Tu es parti récolter")
        );
        this.community.findPlayerById(author.id).task = new TaskTimer({name:'récolte', duration:1}, 1000);
        this.community.findPlayerById(author.id).occuped = true;
        this.community.findPlayerById(author.id).task.start({world:this, author:author, zone:zone}, function (data){
            data.world.finisHarvest(data.author, data.zone);
        })
    }
    finisHarvest(author, zone){
        var harvestedItems = [];
        for (let index = 0; index < (this.community.findPlayerById(author.id).lvl - this.community.lvl + 1); index++) {
            var rand = this.random(0, 100);
            if(rand <= 10) continue; // rand ennemi => 0 - community.lvl 
            else if(rand >= 70) harvestedItems.push(this.items.harvested(zone));
        }
        this.community.findPlayerById(author.id).inventory.addItems(harvestedItems);
        this.community.findPlayerById(author.id).occuped = false;
        console.log(harvestedItems);
        this.broadcast(
            new Discord.MessageEmbed().setColor('#0099ff')
            .setAuthor("Camarade " + author.username, author.displayAvatarURL())
            .setTitle("Tu as fini la récolte")
            .setDescription()
        );
    }

    action(msg,author,mainCmd){

        if (!this.start){
            if (msg[1] === "start")this.create();
            else this.broadcast('Pour créer une nouvelle MotherLand, tapez : `'+ mainCmd +' start`');
            return 0;
        }

        if(msg[1] === "play"){
            if(this.firstHorde) this.addUser(author);
            else this.broadcast("Vous n'avez pas rejoint les camarades à temps, vous etes mort");
            return 0;
        }

        if(this.inParty(author.id)){
            if(msg[1] === "help" || msg[1] === "h") return this.broadcast(this.cmd.main());
            else if(msg[1] === "profile" || msg[1] === "p") return this.broadcast(this.community.findPlayerById(author.id).displayProfile());
            else if(msg[1] === "inventory" || msg[1] === "i") return this.broadcast(this.community.findPlayerById(author.id).displayInventory());
            else if(msg[1] === "community-inventory" || msg[1] === "ci") return this.broadcast(this.community.displayInventory());
            else if(msg[1] === "community" || msg[1] === "c") return this.broadcast(this.community().displayCommunity());
            else if(msg[1] === "time" || msg[1] === "t") return this.time();
            else if(msg[1] === "harvest" || msg[1] === "craft" || msg[1] === "raid"){
                if (this.community.findPlayerById(author.id).occuped)
                {
                    this.broadcast(this.community.findPlayerById(author.id).task.time(author));
                    return 0;
                }
                if(msg[1] === "craft") return 0 //
                else if(msg[1] === "raid") return 0 //
                else if(msg[1] === "harvest") return this.beginHarvest(author, msg[2]) //
            }
            else if(msg[1] === "build") return 0 //
            else if(msg[1] === "stock") return 0 //
            else if(msg[1] === "destock") return 0 //
            //else if(msg[1] === "travel")return 0 //
        }else if(msg[1] === "play"){
            if(this.firstHorde && !userHere) this.addUser(author);
            else this.broadcast("Vous n'avez pas rejoint les camarades à temps, vous etes mort");
        }
        else{
            this.broadcast('Pour rejoindre les camarades, tapez : `'+ mainCmd +' play`');
        }
        return 0;
    }
}

module.exports = World
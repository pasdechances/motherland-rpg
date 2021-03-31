const fs = require('fs');
const Discord = require('discord.js');
const filePath = "data/Players.json";

const Player = require('./player.js');
const Inventory = require('./inventory.js');

class Community {
    constructor(){
        this.players = []
        this.lvl = 1
        this.playerAlive = 0;
        this.inventory = new Inventory(30);
        this.houses = new Inventory(0,'house');
    }

    addUser(user){
        var playerSaved = this.load(user.id);
        var player = new Player(user);
        if(playerSaved)player = playerSaved;
        player.init();
        this.players.push(player);
        ++ this.playerAlive;
        ++ this.houses.size;
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor("Camarade " + user.username, user.displayAvatarURL())
            .setTitle('Au travail camarade !');
        //this.save(); //pour eviter les conflicts interserveur 1 vie pour tout les serveur
    }

    save(){
        var data = []
        this.players.forEach(player => {
            data.push(player.save());
        });
        
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                throw err;
            }
            return 0;
        });
    }
    
    load(id){
        var player = null;
        var savedPlayers = null;
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            savedPlayers = JSON.parse(data.toString());
        });
        if(!savedPlayers) return null;
        savedPlayers.forEach(savedPlayer => {
            if(savedPlayer.id === id)player = savedPlayer
        });
        return player ? player : null;
    }

    lvlUpAlive(){
       return 0// players.find(isPlayer)
    }

    findPlayerById(id) {
        var playerSearched = null;
        this.players.forEach(player => {
            if(player.id === id)playerSearched = player;
        });
        return playerSearched;
    }
}

module.exports = Community
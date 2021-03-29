const fs = require('fs');
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

    addUser(id){
        var playerSaved = this.load(id);
        var player = new Player(id);
        if(playerSaved)player = playerSaved;
        player.init();
        this.players.push(player);
        ++ this.playerAlive;
        ++ this.houses.size;
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
        if (player) return player;
        else return null;
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
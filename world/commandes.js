const Discord = require('discord.js');

class Commandes{
    constructor() {
        this.global = [
            { name: 'Main commandes', value: '`harvest` `build` `craft` `recipes` `hunt` `raid` `travel` `profile` `inventory` `stock` `destock` `town` `zone` `map` `time`' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Profile', value: '`profile` or `p`' , inline: true },
            { name: 'Inventory', value: '`inventory` or `i`' , inline: true },
            { name: 'Exchange', value: '`give [destination] [item]`' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Building', value: '`build`' , inline: true },
            { name: 'Craft', value: '`craft`' , inline: true },
            { name: 'Recipes', value: '`recipes craft` `recipes build`' },
            { name: 'Stock', value: '`stock [item]`' },
            { name: 'Destock', value: '`destock [item]`' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Harvest', value: '`harvest [place] [resources]`' },
            { name: 'Hunting', value: '`hunt [place]`' , inline: true },
            { name: 'Group hunting', value: '`raid [place]`' , inline: true },
            { name: 'Travel', value: '`travel [town]`' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Town', value: '`town`' , inline: true },
            { name: 'Zone', value: '`zone`' , inline: true },
            { name: 'World Map', value: '`map`' , inline: true },
            { name: 'World Time', value: '`time` or `t`' , inline: true },
        ]

        this.harvest = [
            { name: 'Commande', value: '`harvest [place] [resources]`'},
            { name: 'Place', value: '`town` `forest` `fields` `hills` `river`' },
            { name: 'Resources', value: '`wood` `stone` `vegetal` `water` `meat` `jumble`'},
            { name: '\u200B', value: '\u200B' },
            { name: 'Notice', value: "chance de butin plus faible \n chance de d'attirer l'attention faible" },
        ]

        this.raid = [
            { name: 'Commande', value: '`raid [place]`' },
            { name: 'Place', value: '`town` `forest` `fields` `hills` `river`' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Notice', value: "chance de butin plus elevee \n chance de d'attirer l'attention elevee" },
        ]

        this.build = [
            { name: 'Commande', value: '`build [construction]`'},
            { name: 'building', value: '`tent` `hut` `house` `villa` `castle`'},
            { name: 'warehouse', value: '`build` `stone` `vegetal` `water` `amunition`'},
            { name: 'defense', value: '`trap` `barricade` `wall` `door` `drawbridge` `turret`'},
            { name: 'extension', value: '`watchtower` `campfire` `turbine` `radar` `radio` `mortar` `well` `garden` `henhouses`'},
            { name: 'transport', value: '`bag` `wheelbarrow` `cart` `pedaltruck`' },
            { name: 'transport-protection', value: '`bullbar` `roof` `reinforcement` `turret`' },
        ]

        this.craft = [
            { name: 'Commande', value: '`craft [item]`'},
            { name: 'tool', value: '`axe` `pickaxe` `sickle` `bottle`' },
            { name: 'weapon', value: '`butterknife` `knife` `plasticgun` `gun`' },
            { name: 'protection', value: '`glove` `jacket` `trousers` `shield` `shoe` `hat`' },
            { name: 'consumable', value: '`flashlight` `meal` `vodka` `ammunition`' },
        ]

        this.travel = [
            { name: 'Next town to save', value: '`ville`' },
            { name: 'Commande', value: '`travel [town]`' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Status for the nex travel', value: 'need 1 \n need 2 \n need 3 \n need 4' },
        ]

        this.stock = [
            { name: 'Commande', value: '`stock [item]`' },
        ]

        this.destock = [
            { name: 'Commande', value: '`destock [item]`' },
        ]

        this.recipes = [
            { name: 'Commande', value: '`recipes []`' },
        ]
    }

    main(){
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setTitle('Help')
            .addFields(this.global)     
    }

    help(commandes){
        return new Discord.MessageEmbed().setColor('#0099ff')
            .setTitle('Help')
            .addFields(this[commandes])     
    }
}

module.exports = Commandes
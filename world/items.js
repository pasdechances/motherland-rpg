const fs = require('fs');
const filePath = "data/Items.json";

class Items{
    constructor(){
        this.items = [];
        this.load();
    }

    random(min, max){return Math.round(Math.random() * (max - min) + min)}
    randomItem(items){
        var item = items[Math.floor(Math.random()*items.length)];
        return item;
    }
    rangeItem(zone){
        var rand = this.random(0,100);
        return this.items.filter(item => item.findProba[zone] > rand);
    }

    load(){
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            this.items = JSON.parse(data.toString());
        });
    }

    harvested(zone){
        var item = this.randomItem(this.rangeItem(zone));
        return item;
    }

    canCraft(inventory){
        return false;//list item
    }

    craft(inventory){
        return false; //inventory
    }

    canBuild(inventory){
        return false;//list item
    }

    build(inventory){
        return false; //inventory
    }
    
}
module.exports = Items;
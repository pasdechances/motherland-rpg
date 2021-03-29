const Inventory = require('./inventory.js');

class Palyer {
    constructor(id) {
        this.id = id;
        this.lvl = 1;
        this.maxHordesSurvived = 0;

        this.maxLife = 100;
        this.currentLife = 100;
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
        this.currentLife = this.maxLife + (this.lvl * 2);
        this.power = this.power + this.lvl;
        this.alive = true;
    }

    save(){
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

    displayProfile(){
        return 0;
    }
}

module.exports = Palyer
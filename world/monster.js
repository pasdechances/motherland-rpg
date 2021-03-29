
class Monster {
    constructor(lvl) {
        this.life = 100 * lvl;
        this.power = 5 * lvl;
    }
}

module.exports = Monster
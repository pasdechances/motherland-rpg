class Moon{
    constructor(lvl) {
        this.maxDay = 21;
        this.minDay = 19;
        this.maxDistance = 0;
        this.fullMoon = this.random(this.minDay,this.maxDay);
        this.maxDistance = Math.round((this.maxDay + this.minDay) / 4);
        this.count = this.fullMoon - this.maxDistance;
    }

    setMoonCount(){
        this.count = this.fullMoon;
    }

    getProximity(){
        var calc = Math.abs(this.count - this.maxDistance);
        return calc * calc;
    }

    random(min, max){
        return Math.round(Math.random() * (max - min) + min);
    }
}

module.exports = Moon;
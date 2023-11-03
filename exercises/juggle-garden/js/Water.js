class Water {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 1;
        this.speed = 3;
        this.shrinkRate = 1;
        this.minSize = 1;
        this.fill = {
            r: 0,
            g: 0,
            b: 150,
        };
        this.touch = true;
    }

    watering(flower, water, droplets) {
        let d = dist(this.x, this.y, flower.x, flower.y);
        if (d < this.size / 2 + flower.size / 2 + 10) {
            flower.pollinate();
            //let waterIndex = droplets.indexOf(water);
            //droplets.splice(waterIndex, 1);
        }
    }

    scare(bee, bees, water, droplets) {
        let d = dist(this.x, this.y, bee.x, bee.y);
        if (d < this.size / 2 + bee.size / 2) {
            let beesIndex = bees.indexOf(bee);
            bees.splice(beesIndex, 1);
        }
    }

    shrink() {

        this.size = this.size - this.shrinkRate;

        if (this.size < this.minSize) {
            this.touch = false;
        }

    }

    move() {
        this.y += this.vy;
        this.vy += this.speed;
    }

    display() {
        fill(this.fill.r, this.fill.g, this.fill.b);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
}
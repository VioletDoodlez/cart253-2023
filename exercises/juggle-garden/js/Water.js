class Water {
    constructor(x, y, waterImage) { //water properties
        this.x = x;
        this.y = y;
        this.size = 40;
        this.vx = 0;
        this.vy = 1;
        this.speed = 3;
        this.shrinkRate = 1;
        this.minSize = 1;
        this.touch = true;
        this.image = waterImage; //calls image in preload()
    }

    watering(flower, water, droplets) {
        let d = dist(this.x, this.y, flower.x, flower.y);
        if (d < this.size / 2 + flower.size / 2 + 10) {
            flower.pollinate(); //makes the flower grow when colliding
        }
    }

    scare(bee, bees, water, droplets) {
        let d = dist(this.x, this.y, bee.x, bee.y);
        if (d < this.size / 2 + bee.size / 2) {
            let beesIndex = bees.indexOf(bee);
            bees.splice(beesIndex, 1); //makes bee disappear when colliding
        }
    }

    shrink() { //shrinks the drop when it falls

        this.size = this.size - this.shrinkRate;

        if (this.size < this.minSize) {
            this.touch = false;
        }

    }

    move() {
        this.y += this.vy;
        this.vy += this.speed; //increases speed when falling
    }

    display() { //displays image
        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.size, this.size);
        pop();
    }
}
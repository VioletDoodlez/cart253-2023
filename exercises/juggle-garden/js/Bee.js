class Bee {
    constructor(x, y) { //bee properties
        this.x = x;
        this.y = y;
        this.size = 40;
        this.minSize = 10;
        this.maxSize = 40;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.growRate = 0.1;
        this.jitteriness = 0.1;
        this.alive = true;
    }

    tryToPollinate(flower) {
        let d = dist(this.x, this.y, flower.x, flower.y);
        if (d < this.size / 2 + flower.size / 2) { // when the flower and bee touch...
            this.grow(); // the bee grows...
            flower.pollinate(); // and the flower grows!
        }
    }

    grow() {
        this.size = this.size + this.growRate;
        this.size = constrain(this.size, 0, this.maxSize); // bees are a certain size
    }

    move() { // bee moves at random
        let r = random(0, 1);
        if (r < this.jitteriness) {
            this.vx = random(-this.speed, this.speed);
            this.vy = random(-this.speed, this.speed);
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // makes it stay within the parameter
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() { //display bee
        //wings
        push();
        fill(255, 255, 255);
        noStroke();
        ellipse(this.x - this.size / 2, this.y, this.size / 2);
        ellipse(this.x + this.size / 2, this.y, this.size / 2);
        pop();

        // body
        push();
        fill(255, 255, 50);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();

        // eyes
        push();
        fill(0, 0, 0);
        noStroke();
        ellipse(this.x - this.size / 10, this.y, this.size / 10);
        ellipse(this.x + this.size / 10, this.y, this.size / 10);
        pop();
    }
}
class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.fill = {
            r: random(200, 255),
            g: random(200, 255),
            b: random(200, 255),
        }
        this.vx = random(-this.speed, this.speed);
        this.vy = random(-this.speed, this.speed);
        this.speed = 3;
    }

    move() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    bounce() {
        if (this.x < 0 || this.x > width) {
            this.vx = -this.vx;
        }

        if (this.y < 0 || this.y > height) {
            this.vy = -this.vy;
        }

    }

    display() {
        fill(this.fill.r, this.fill.g, this.fill.b);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
}
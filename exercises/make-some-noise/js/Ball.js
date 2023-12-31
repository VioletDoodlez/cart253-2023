class Ball {
    constructor(x, y, note) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.fill = {
            r: random(200, 255),
            g: random(200, 255),
            b: random(200, 255),
        }
        this.speed = 3;
        this.vx = random(-this.speed, this.speed);
        this.vy = random(-this.speed, this.speed);

        this.note = note;
        this.synth = new p5.PolySynth();

    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    //bounce off walls
    bounce() {
        if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
            this.vx = -this.vx;
            this.playNote(); //play note when bouncing
        }

        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
            this.vy = -this.vy;
            this.playNote(); //play note when bouncing
        }

    }

    //play synth note
    playNote() {
        this.synth.play(this.note, 0.4, 0, 0.1);
    }

    //display ball
    display() {
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}
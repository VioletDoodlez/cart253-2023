class Rectangle {
    constructor(x, y, note) {
        this.x = x;
        this.y = y;
        this.w = 90;
        this.h = 50;
        this.fill = {
            r: random(200, 255),
            g: random(200, 255),
            b: random(200, 255),
        }
        this.speed = 3;
        this.vx = random(-this.speed, this.speed);
        this.vy = random(-this.speed, this.speed);

        //oscillator
        this.oscillator = new p5.Oscillator();
        this.nearFreq = 220;
        this.farFreq = 440;
        this.oscillator.amp(0.025);
        this.oscillator.start();

        //synth
        this.note = note;
        this.synth = new p5.PolySynth();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        //change frequency depending on position
        let d = dist(this.x, this.y, width / 2, height / 2);
        let maxDist = dist(0, 0, width / 2, height / 2);
        let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
        this.oscillator.freq(newFreq);

    }

    //makes balls disappear when they touch
    cleanBalls(ball, balls, rect, rectangles) {
        let db = dist(this.x, this.y, ball.x, ball.y);

        if (db < this.w / 2 + ball.size / 2 || db < this.h / 2 + ball.size / 2) {
            let ballsIndex = balls.indexOf(ball);
            balls.splice(ballsIndex, 1);
        }

    }

    //makes squares disappear when they touch
    cleanSquares(square, squares, rect, rectangles) {
        let ds = dist(this.x, this.y, square.x, square.y);

        if (ds < this.w / 2 + square.w / 2 || ds < this.h / 2 + square.h / 2 || ds < this.w / 2 + square.h / 2 || ds < this.h / 2 + square.w / 2) {
            let squaresIndex = squares.indexOf(square);
            squares.splice(squaresIndex, 1);
        }
    }

    //bounce off walls
    bounce() {
        if (this.x - this.w / 2 < 0 || this.x + this.w / 2 > width) {
            this.vx = -this.vx;
            this.playNote(); //play note when bouncing

        }

        if (this.y - this.h / 2 < 0 || this.y + this.h / 2 > height) {
            this.vy = -this.vy;
            this.playNote(); //play note when bouncing
        }

    }

    //play note
    playNote() {
        this.synth.play(this.note, 0.5, 0, 0.2);
    }

    //display rectangles
    display() {
        push();
        noStroke();
        rectMode(CENTER); //x and y are the center
        fill(this.fill.r, this.fill.g, this.fill.b);
        rect(this.x, this.y, this.w, this.h);
    }
}
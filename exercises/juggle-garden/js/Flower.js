class Flower {
    constructor(x, y, size, maxSize, stemLength, petalColor) { //flower properties
        //position and size
        this.x = x;
        this.y = y;
        this.size = size;
        this.maxSize = maxSize;
        this.stemLength = stemLength;
        this.stemThickness = 20;
        this.petalThickness = 10;
        this.maxPetalThickness = 30;
        //colour
        this.stemColor = {
            r: 50,
            g: 150,
            b: 50
        };
        this.petalColor = petalColor;
        this.centreColor = {
            r: 50,
            g: 0,
            b: 0
        };
        this.alive = true;
    }

    shrink() {
        //flower will shrink continuously if not tended to
        let shrinkage = random(0, 0.1);
        this.petalThickness = this.petalThickness - shrinkage / 10;
        this.size = this.size - shrinkage;

        if (this.petalThickness <= 0 || this.size <= 0) {
            this.alive = false;
        }
    }

    pollinate() {
        //allows flower to grow
        let growth = random(0.5, 1);
        this.petalThickness = this.petalThickness + growth / 5;
        this.size = this.size + growth;

        this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
        this.size = constrain(this.size, 0, this.maxSize)
    }

    display() {
        push();
        strokeWeight(this.stemThickness);
        stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
        line(this.x, this.y, this.x, this.y + this.stemLength);

        strokeWeight(this.petalThickness);
        fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
        stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}
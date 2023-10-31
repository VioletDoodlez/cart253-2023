/**
 * Juggle Garden
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let garden = {
    flowers: [],
    numFlowers: 20,
    bees: [],
    numBees: 5,
    grassColor: {
        r: 120,
        g: 180,
        b: 120
    }
};

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < garden.numFlowers; i++) {
        let x = random(0, width);
        let y = random(0, height);
        let size = random(50, 80);
        let stemLength = random(50, 100);
        let petalColor = {
            r: random(100, 255),
            g: random(100, 255),
            b: random(100, 255)
        }

        let flower = new Flower(x, y, size, stemLength, petalColor);
        garden.flowers.push(flower);
    }

    for (let i = 0; i < garden.numBees; i++) {
        let x = random(0, width);
        let y = random(0, height);
        let bee = new Bee(x, y);
        garden.bees.push(bee);
    }
}


/**
 * Description of draw()
*/
function draw() {
    background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

    for (let i = 0; i < garden.flowers.length; i++) {
        let flower = garden.flowers[i];

        if (flower.alive) {
            flower.shrink();
            flower.display();
        }
    }

    for (let i = 0; i < garden.bees.length; i++) {
        let bee = garden.bees[i];

        if (bee.alive) {
            bee.shrink();
            bee.move();

            for (let j = 0; j < garden.flowers.length; j++) {
                let flower = garden.flowers[j];
                bee.tryToPollinate(flower);
            }

            bee.display();
        }

    }
}

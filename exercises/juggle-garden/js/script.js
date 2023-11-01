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
    numFlowers: 30,
    bees: [],
    numBees: 10,
    grassColor: {
        r: 120,
        g: 180,
        b: 120
    }
};

let droplets = [];

let state = `title`;

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < garden.numFlowers; i++) {
        let x = random(0, width);
        let y = random(0, height);
        let size = random(50, 100);
        let stemLength = random(50, 150);
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
    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === 'gone') {
        gone();
    }
    else if (state === `wilt`) {
        wilt();
    }
}

function title() {
    push();
    background(0);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Garden`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Water your flowers before they wilt! Don't wet the bees!`, width / 2, 2 * height / 3);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to start/water the flowers`, width / 2, 2 * height / 3 + 50);
    pop();
}

function simulation() {
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
            //bee.shrink();
            bee.move();

            for (let j = 0; j < garden.flowers.length; j++) {
                let flower = garden.flowers[j];
                bee.tryToPollinate(flower);
            }

            bee.display();
        }

    }

    for (let i = 0; i < droplets.length; i++) {
        let water = droplets[i];

        if (water.touch) {
            water.shrink();
            water.move();
            for (let f = 0; f < garden.flowers.length; f++) {
                let flower = garden.flowers[f];
                water.watering(flower, water, droplets);

                for (let b = 0; b < garden.bees.length; b++) {
                    let bee = garden.bees[b];
                    water.scare(bee, garden.bees, water, droplets);
                    // water.falling(flower, bee);
                    console.log(droplets[0].x);
                }
            }
            water.display();
        }
    }
    checkFlowers();
    checkBees();
}

function gone() {
    push();
    background(0);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Game Over`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You scared off the bees!`, width / 2, 2 * height / 3);
    pop();
}
function wilt() { //all of the flowers have shrunk
    push();
    background(0);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Game Over`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your flowers wilted!`, width / 2, 2 * height / 3);
    pop();
}

//function bloom() //flowers are still blooming when timer runs out

function checkFlowers() {
    let flowersWilt = true;
    for (let i = 0; i < garden.bees.length; i++) {
        if (garden.flowers[i].alive) {
            flowersWilt = false;
            break;
        }
    }

    if (flowersWilt) {
        state = `wilt`;
    }
}

function checkBees() {
    let beesGone = true;
    for (let i = 0; i < garden.bees.length; i++) {
        if (garden.bees[i].alive) {
            beesGone = false;
            break;
        }
    }

    if (beesGone) {
        state = `gone`;
    }
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }

    let water = new Water(mouseX, mouseY);
    droplets.push(water);
}
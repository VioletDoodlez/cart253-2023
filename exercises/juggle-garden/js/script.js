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
};

let droplets = [];

let titleImage;
let grassImage;
let bloomImage;
let goneImage;
let wiltImage;
let waterImage;

let state = `title`;

/**
 * Description of preload
*/
function preload() {
    //title screen, end screen and water images
    titleImage = loadImage("assets/images/title.jpg");
    grassImage = loadImage("assets/images/grass.jpg");
    bloomImage = loadImage("assets/images/bloom.jpg");
    goneImage = loadImage("assets/images/gone.jpg");
    wiltImage = loadImage("assets/images/wilt.jpg");
    waterImage = loadImage("assets/images/water.jpg");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < garden.numFlowers; i++) {
        // randomizes position
        let x = random(0, width);
        let y = random(0, height);
        // randomizes properties
        let size = random(50, 100);
        let maxSize = random(80, 100);
        let stemLength = random(50, 150);
        let petalColor = {
            r: random(100, 255),
            g: random(100, 255),
            b: random(100, 255)
        }

        // creates new flower with the array with randomized protperties
        let flower = new Flower(x, y, size, maxSize, stemLength, petalColor);
        garden.flowers.push(flower);
    }

    for (let i = 0; i < garden.numBees; i++) {
        // spawns a bee in a random area of the canvas
        let x = random(0, width);
        let y = random(0, height);
        let bee = new Bee(x, y);
        garden.bees.push(bee);
    }

    let water = new Water(width / 10, height / 10, waterImage); //allows image to be used
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
    else if (state === `bloom`) {
        bloom();
    }
}

function title() { //title screen
    push();
    background(titleImage);
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
    text(`Click (and drag) to start/water the flowers`, width / 2, 2 * height / 3 + 50);
    pop();
}

function simulation() {
    background(grassImage);

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
                    console.log(droplets[0].x);
                }
            }
            water.display();
        }
    }
    checkFlowers();
    checkBees();
}

function checkFlowers() {
    // displays wilt ending if all flowers are gone from the array
    let flowersWilt = true;
    for (let i = 0; i < garden.flowers.length; i++) {
        if (garden.flowers[i].alive) {
            flowersWilt = false;
            break;
        }
    }

    if (flowersWilt) {
        state = `wilt`;
    }

    // displays bloom ending is flower size is higher than 70
    let flowersBloom = true;
    for (let i = 0; i < garden.flowers.length; i++) {
        if (garden.flowers[i].size < 70) {
            flowersBloom = false;
            break;
        }
    }

    if (flowersBloom) {
        state = `bloom`;
    }
}


function checkBees() { // displays gone ending when all bees are gone from the array
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

function gone() { //all the bees are gone
    push();
    background(goneImage);
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
    background(wiltImage);
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

function bloom() { //flowers are still blooming when timer runs out
    push();
    background(bloomImage);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You win!`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your garden is in full bloom! Great job!`, width / 2, 2 * height / 3);
    pop();
}

function mousePressed() {
    // starts simulation when clicked
    if (state === `title`) {
        state = `simulation`;
    }

    // summons water from mouse
    let water = new Water(mouseX, mouseY, waterImage);
    droplets.push(water);
}

function mouseDragged() {
    // allows a continuous stream of water if player clicks and drags
    let water = new Water(mouseX, mouseY, waterImage);
    droplets.push(water);
}
/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let fish = {
    x: 0,
    y: 0,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5,
    target: undefined
};

let diet = [];
let dietSize = 4;

let state = `title`

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

    frameRate(30);

    fish.x = random(0, width);
    fish.y = random(0, height);

    for (let i = 0; i < dietSize; i++) {
        diet[i] = createFood(random(0, width), random(0, height));
    }

    fish.target = random(diet);
}


function createFood(x, y) {
    let food = {
        x: x,
        y: y,
        size: 50,
        vx: 0,
        vy: 0,
        speed: 2,
    };
    return food;
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
    else if (state === `full`) {
        full();
    }
    else if (state === `hungry`) {
        hungry();
    }
}

function title() {
    push();
    background(0);
    textSize(94);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Aquarium`, width / 2, height / 2);

    textSize(54);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your fish is hungry! Feed him before the frame rate reaches 350`, width / 2, 2 * height / 3);

    textSize(54);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to start/feed your fish`, width / 2, 2 * height / 3 + 50);
    pop();
}

function simulation() {
    background(0);

    for (let i = 0; i < diet.length; i++) {
        moveFood(diet[i]);
        displayFood(diet[i]);
        checkFood(diet[i]);
    }

    moveFish();
    checkFishSize();
    checkTime();
    displayFish();
    displayTime();
}

function full() {
    push();
    background(0);
    textSize(94);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your fish is full!`, width / 2, height / 2);

    textSize(54);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`He seems happy :)`, width / 2, 2 * height / 3);
}

function hungry() {
    push();
    background(0);
    textSize(94);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Time's up!`, width / 2, height / 2);

    textSize(54);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your fish is still hungry!`, width / 2, 2 * height / 3);
}

function moveFish() {
    if (fish.target === undefined) {
        let change = random(0, 1);
        if (change < 0.05) {
            fish.vx = random(-fish.speed, fish.speed);
            fish.vy = random(-fish.speed, fish.speed);
        }
    }
    else {
        let dx = fish.x - fish.target.x;
        let dy = fish.y - fish.target.y;

        if (dx < 0) {
            fish.vx = fish.speed;
        }
        else if (dx > 0) {
            fish.vx = -fish.speed;
        }

        if (dy < 0) {
            fish.vy = fish.speed;
        }
        else if (dy > 0) {
            fish.vy = -fish.speed;
        }
    }

    fish.x = fish.x + fish.vx;
    fish.y = fish.y + fish.vy;

    fish.x = constrain(fish.x, 0, width);
    fish.y = constrain(fish.y, 0, height);
}

function moveFood(food) {
    let change = random(0, 1);
    if (change < 0.05) {
        food.vx = random(-food.speed, food.speed);
        food.vy = random(-food.speed, food.speed);
    }

    food.x = food.x + food.vx;
    food.y = food.y + food.vy;

    food.x = constrain(food.x, 0, width);
    food.y = constrain(food.y, 0, height);
}

function checkFood(food) {

    let d = dist(fish.x, fish.y, food.x, food.y);
    if (d < fish.size / 2 + food.size / 2) {
        let foodIndex = diet.indexOf(food);
        diet.splice(foodIndex, 1);
        fish.size = fish.size + 5;
        fish.speed = fish.speed - 0.;
        fish.target = random(diet);
    }

}

function checkFishSize() {
    if (fish.size > 200) {
        state = 'full';
    }
}

function checkTime() {
    if (frameCount > 350) {
        state = `hungry`;
    }
}

function displayFish() {
    push();
    fill(255, 150, 0);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
}

function displayFood(food) {
    push();
    fill(200, 100, 100);
    noStroke();
    ellipse(food.x, food.y, food.size);
    pop();
}

function displayTime() {
    textSize(100);
    fill(255);
    textAlign(RIGHT, TOP);
    text(frameCount, 200, 20);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }

    let food = createFood(mouseX, mouseY);
    diet.push(food);

    if (fish.target === undefined) {
        fish.target = food;
    }
}
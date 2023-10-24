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
    speed: 2,
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
    background(0);



    for (let i = 0; i < diet.length; i++) {
        moveFood(diet[i]);
        displayFood(diet[i]);
        checkFood(diet[i]);
    }

    displayFish();
    moveFish();
}


//function title()
//function simulation()
//function full()
//funtion hungry()

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

function checkFood(food) {

    let d = dist(fish.x, fish.y, food.x, food.y);
    if (d < fish.size / 2 + food.size / 2) {
        let foodIndex = diet.indexOf(food);
        diet.splice(foodIndex, 1);
        fish.size = fish.size + 5;
        fish.target = random(diet);
    }

}

function mousePressed() {
    let food = createFood(mouseX, mouseY);
    diet.push(food);

    if (fish.target === undefined) {
        fish.target = food;
    }
}
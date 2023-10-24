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
    speed: 2
};

let diet = [];
let dietSize = 4;

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
}


function createFood(x,y) {
    let food = {
        x: x,
        y: y,
        size: 50,
        vx: 0,
        vy: 0,
        speed: 2,
        eaten: false
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
    //moveFish();
}

function moveFish() {
    let dx = fish.x - food.x;
    let dy = fish.y - food.y;

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
    if (!food.eaten) {    push();
        fill(200, 100, 100);
        noStroke();
        ellipse(food.x, food.y, food.size);
        pop();
    }
}

function checkFood(food) {
    if (!food.eaten) {
        let d = dist (fish.x, fish.y, food.x, food.y);
        if (d < fish.size / 2 + food.size / 2) {
            food.eaten = true;
            fish.size = fish.size + 4;
        }
    }
}

function mousePressed() {
    let food = createFood(mouseX,mouseY);
    diet.push(food);
}
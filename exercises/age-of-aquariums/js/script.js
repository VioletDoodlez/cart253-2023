/**
 * Age of Aquariums
 * Nicole Covaliu
 * 
 * A simulation where you need to feed the fish before time runs out
 */

"use strict";

let fish = {
    x: 0,
    y: 0,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5,
    target: undefined,
    image: undefined
};

//generates the food
let diet = [];
let dietSize = 4;

let aquariumImage;
let titleImage;
let fullImage;
let hungryImage;

let state = `title`

/**
 * Description of preload
*/
function preload() {
    fish.image = loadImage("assets/images/fish.png");
    aquariumImage = loadImage("assets/images/background.png");
    titleImage = loadImage("assets/images/title.png");
    fullImage = loadImage("assets/images/full.png");
    hungryImage = loadImage("assets/images/hungry.png");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    frameRate(30);

    //the fish's starting point starts anywhere on the canvas
    fish.x = random(0, width);
    fish.y = random(0, height);

    //creates food within the array deending on it's size
    for (let i = 0; i < dietSize; i++) {
        diet[i] = createFood(random(0, width), random(0, height));
    }
    //makes the fish follow a random piece of food from the array
    fish.target = random(diet);
}


function createFood(x, y) {
    //helps create food
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
    //title screen
    push();
    background(titleImage);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Aquarium`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your fish is hungry! Feed him before the frame count reaches 350`, width / 2, 2 * height / 3);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to start/feed your fish`, width / 2, 2 * height / 3 + 50);
    pop();
}

function simulation() {
    background(aquariumImage);
    //displays, moves and removes food inside the array
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
    //displays full ending screen
    push();
    background(fullImage);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your fish is full!`, width / 2, height / 2);

    textSize(54);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`He seems happy :)`, width / 2, 2 * height / 3);
}

function hungry() {
    //displays hungry ending screen
    push();
    background(hungryImage);
    textSize(200);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Time's up!`, width / 2, height / 2);

    textSize(54);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Your fish is still hungry!`, width / 2, 2 * height / 3);
}

function moveFish() {
    //makes fish move at random if there is no more food in the array
    if (fish.target === undefined) {
        let change = random(0, 1);
        if (change < 0.05) {
            fish.vx = random(-fish.speed, fish.speed);
            fish.vy = random(-fish.speed, fish.speed);
        }
    }
    //makes fish follow food
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

    //makes fish stay within canvas
    fish.x = constrain(fish.x, 0, width);
    fish.y = constrain(fish.y, 0, height);
}

function moveFood(food) {
    //makes food move at random
    let change = random(0, 1);
    if (change < 0.05) {
        food.vx = random(-food.speed, food.speed);
        food.vy = random(-food.speed, food.speed);
    }

    food.x = food.x + food.vx;
    food.y = food.y + food.vy;

    //makes food stay within the canvas
    food.x = constrain(food.x, 0, width);
    food.y = constrain(food.y, 0, height);
}

function checkFood(food) {

    let d = dist(fish.x, fish.y, food.x, food.y);
    if (d < fish.size / 2 + food.size / 2) {
        let foodIndex = diet.indexOf(food);
        diet.splice(foodIndex, 1); //removes food from index when food and fish overlap
        fish.size = fish.size + 5; //increases fish's size when eaten
        fish.target = random(diet); //fish targets any food within the array
    }

}

function checkFishSize() {
    //displays full ending if fish is bigger than 200
    if (fish.size > 200) {
        state = 'full';
    }
}

function checkTime() {
    //displays hungry ending if frame count reaches 350
    if (frameCount === 350) {
        state = `hungry`;
    }
}

function displayFish() {
    //displays fish
    push();
    imageMode(CENTER);
    //makes fish image flip depending on position
    translate(fish.x, fish.y);
    if (fish.vx > 0) {
        scale(-1, 1);
    }
    image(fish.image, 0, 0, fish.size, fish.size);
    pop();
}

function displayFood(food) {
    //displays food
    push();
    fill(200, 100, 100);
    noStroke();
    ellipse(food.x, food.y, food.size);
    pop();
}

function displayTime() {
    //displays frame count
    textSize(100);
    fill(255);
    textAlign(RIGHT, TOP);
    text(frameCount, 200, 20);
}

function mousePressed() {
    //starts simulation
    if (state === `title`) {
        state = `simulation`;
    }

    //creates more food if user clicks mouse
    let food = createFood(mouseX, mouseY);
    diet.push(food);

    //makes fish target food when visible
    if (fish.target === undefined) {
        fish.target = food;
    }
}
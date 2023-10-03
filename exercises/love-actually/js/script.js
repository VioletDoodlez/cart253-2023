/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let circle1 = {
    x: 200,
    y: 300,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
}

let circle2 = {
    x: 400,
    y: 300,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
}

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
    createCanvas(600, 600);
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle1.vy = random(-circle1.speed, circle1.speed);
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === `love`) {
        love();
    }
    else if (state === `sadness`) {
        sadness();
    }
}

function title() {
    push();
    textSize(64);
    fill(200,100,100);
    textAlign(CENTER,CENTER);
    text(`LOVE?`,width/2,height/2);
    pop();
}

function simulation() {
    move();
    checkOffScreen();
    checkOverlap();
    display();
}

function love() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`LOVE!`,width/2,height/2);
    pop();
}

function sadness() {
    push();
    textSize(64);
    fill(150,150,255);
    textAlign(CENTER,CENTER);
    text(`:(`,width/2,height/2);
    pop();
}

function move() {
    //circle1 speed
    circle1.x = circle1.x + circle1.vx;
    circle1.y = circle1.y + circle1.vy;

    //circle2 speed
    circle2.x = circle2.x + circle2.vx;
    circle2.y = circle2.y + circle2.vy;
}

function checkOffScreen() {
    if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
        state = `sadness`;
    }
    
}

function checkOverlap() {
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    if (d < circle1.size/2 +circle2.size/2) {
        state = `love`;
    }
}

function display() {
    //circle1
    fill(255);
    ellipse(circle1.x, circle1.y, circle1.size);

    //circle2
    fill(255);
    ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}

/**function reset() {
    circle.x = circle.x;
    circle.y = circle.y;
    circle.vx = random(-10,10);
    circle.vy = random(-10,10);
}*/
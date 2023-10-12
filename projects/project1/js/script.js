/**
 * Project 1
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let bug = {
    x: 250,
    y: 250,
    size: 50,
    fill: 255,
    vx: 0,
    vy: 0,
    speed: 3
}

let spider = {
    x: 250,
    y: 0,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
}

//let state = `title`


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

    bug.vx = random(-bug.speed, bug.speed);
    bug.vy = random(-bug.speed, bug.speed);
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
    else if (state === `eat`) {
        eat();
    }
    else if (state === `flee`) {
        flee();
    }
    else if (state === `fall`) {
        fall();
    }
}

function simulation() {
    move();
    checkOffScreen();
    checkOverlap();
    display();
}



function checkOverlap() {
    let d = dist(spider.x, spider.y, bug.x, bug.y)

    if (d < spider.size/2 + bug.size/2) {
        state = `eat`;
    }
}

function checkOffScreen() {
    if (bug.x < 0 || bug.x > width || bug.y < 0 || bug.y > height) {
        state = `flee`;
    }

    if (spider.x < 0 || spider.x > width || spider.y < 0 || spider.y > height) {
        state = `fall`;
    }
}

function move() {
    // bug mouvement
    let dx = bug.x - spider.x;
    let dy = bug.y - spider.y;

    if (dx < 0) {
        bug.vx = -bug.speed;
    }
    else if (dx > 0) {
        bug.vx = bug.speed;
    }

    if (dy < 0) {
        bug.vy = -bug.speed;
    }
    else if (dy > 0) {
        bug.vy = bug.speed;
    }

    // spider mouvement
    if (keyIsDown (LEFT_ARROW)) {
        spider.vx = -spider.speed;
    }
    else if (keyIsDown (RIGHT_ARROW)) {
        spider.vx = spider.speed;
    }
    else {
        spider.vx = 0;
    }
 
    if (keyIsDown (UP_ARROW)) {
        spider.vy = -spider.speed;
    }
    else if (keyIsDown (DOWN_ARROW)) {
        spider.vy = spider.speed;
    }
    else {
        spider.vy = 0;
    }
 
    spider.x = spider.x + spider.vx;
    spider.y = spider.y + spider.vy;    
}

function display() {
     //displays spider
     fill(100, 200, 100);
     ellipse(spider.x, spider.y, spider.size);
     //displays bug
     fill(bug.fill);
     ellipse(bug.x, bug.y, bug.size);
}

/**
 * Love Actually
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let user = {
    x: 200,
    y: 300,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5
}

let monster = {
    x: 400,
    y: 300,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
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
    
    monster.x = random(0, width);
    monster.y = random(0, height);
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
    else if (state === `caught`) {
        caught();
    }
    else if (state === `escape`) {
        escape();
    }
}

function title() { //displays title screen until clicked
    push();
    textSize(64);
    fill(200,100,100);
    textAlign(CENTER,CENTER);
    text(`Can You Escape?`,width/2,height/2);
    pop();
}

function simulation() {
    move();
    checkOffScreen();
    checkOverlap();
    display();
}

function caught() { //end simulation when circles collide
    push();
    textSize(64);
    fill(150,150,255);
    textAlign(CENTER,CENTER);
    text(`CAUGHT.`,width/2,height/2);
    pop();
}

function escape() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`FREEDOM!`,width/2,height/2);
    pop();
}

function move() {
    //allows user move with arrow keys
    if (keyIsDown (LEFT_ARROW)) {
        user.vx = -user.speed;
    }
    else if (keyIsDown (RIGHT_ARROW)) {
        user.vx = user.speed;
    }
    else {
        user.vx = 0
    }

    if (keyIsDown(UP_ARROW)) {
        user.vy = -user.speed;
    }
    else if (keyIsDown (DOWN_ARROW)) {
        user.vy = user.speed;
    }
    else {
        user.vy = 0;
    }

    user.x = user.x + user.vx;
    user.y = user.y + user.vy;

    //allows monster to follow user

    let dx = monster.x - user.x;
    let dy = monster.y - user.y;

    if (dx < 0) {
        monster.vx = monster.speed;
    }
    else if (dx > 0) {
        monster.vx = -monster.speed;
    }

    if (dy < 0) {
        monster.vy = monster.speed;
    }
    else if (dy > 0) {
        monster.vy = -monster.speed;
    }

    monster.x = monster.x + monster.vx;
    monster.y = monster.y + monster.vy;
}

function checkOffScreen() {
    if (user.x < 0 || user.x > width || user.y < 0 || user.y > height || monster.x < 0 || monster.x > width || monster.y < 0 || monster.y > height) {
        state = `escape`;
    }
    
}

function checkOverlap() {
    let d = dist(user.x, user.y, monster.x, monster.y); //makes sure the circles collide before showing ending
    if (d < user.size/2 +monster.size/2) {
        state = `caught`;
    }
}

function display() {
    //user
    fill(255);
    ellipse(user.x, user.y, user.size);

    //monster
    fill(255);
    ellipse(monster.x, monster.y, monster.size);
}

function keyPressed() { //starts simulation when key is pressed
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
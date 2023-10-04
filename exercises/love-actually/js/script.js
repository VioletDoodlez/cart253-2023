/**
 * Love Actually
 * Nicole Covaliu
 * 
 * Escape game where a monster (green circle) follows the user.
 * the objective is the escape by making it offscreen.
 */

"use strict";

let user = {
    x: 200,
    y: 300,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 4
}

let monster = {
    x: 400,
    y: 300,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 2.5
}

let secret = {
    x: undefined,
    y: undefined,
    size: 5
}

let state = `title`;

/**
 * Description of preload
*/
function preload() {
    //spookyImage = loadImage("assets/images/alternate.png")
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(600, 600);
    
    monster.x = random(0, width);
    monster.y = random(0, height);

    secret.x = random(0, width);
    secret.y = random(0, height);

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

    textSize(24);
    fill(200,100,100);
    textAlign(CENTER,CENTER);
    text(`Use the arrow keys to escape the monster`,width/2,360);

    textSize(24);
    fill(200,100,100);
    textAlign(CENTER,CENTER);
    text(`Press any key to start`,width/2,390);
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

    textSize(24);
    fill(150,150,255);
    textAlign(CENTER,CENTER);
    text(`Press any key to restart`,width/2,360);
    pop();
}

function escape() { //victory screen when user is offscreen
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`FREEDOM!`,width/2,height/2);

    textSize(24);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`Press any key to continue`,width/2,360);
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

    push();
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

    //change secret location every round
    pop();
}

function checkOffScreen() { //allows the simulation the end when the user moves offscreen
    if (user.x < 0 || user.x > width || user.y < 0 || user.y > height || monster.x < 0 || monster.x > width || monster.y < 0 || monster.y > height) {
        state = `escape`;
    }
    
}

function checkOverlap() { //allows the circles collide before showing ending
    let d = dist(user.x, user.y, monster.x, monster.y); //distance between circles
    if (d < user.size/2 +monster.size/2) {
        state = `caught`; //end simulation
    }
}

function display() { //displays shapes
    //user
    fill(255);
    ellipse(user.x, user.y, user.size);

    //monster
    fill(0,255,0);
    ellipse(monster.x, monster.y, monster.size);

    //secret
    fill(255,0,0);
    ellipse(secret.x,secret.y,secret.size);
}

function keyPressed() { //starts simulation when key is pressed
    if (state === `title`) {
        state = `simulation`;
    }
    else if (state === `escape`) { //continue simulation if escaped
        reset();
        state = `simulation`;
    }
    else if (state === `caught`) { //return to title screen if caught
        reset();
        state = `title`;
    }
}

function reset() {
    //user position resets to a random location after every game
    user.x = random(0, width);
    user.y = random(0, height);
    //monster position resets to a random location after every game 
    monster.x = random(0, width);
    monster.y = random(0, height);

    //secret position resets to a random location after every game
    secret.x = random(0, width);
    secret.y = random(0, height);


    let sd = dist(user.x, user.y, monster.x, monster.y); //determines the spawning distance

    while (sd < user.size + monster.size) { //if the diameter of both circles combined is bigger than the spawning distance, the monster is moved elsewhere
        monster.x = random(0, width);
        monster.y = random(0, height);

        sd = dist(user.x, user.y, monster.x, monster.y);
    }
}
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
    size: 80,
    fill: 255,
    vx: 0,
    vy: 0,
    speed: 1,
    image: undefined,
    state: `calm` //calm or scared
}

let spider = {
    x: 250,
    y: 0,
    size: 130,
    vx: 0,
    vy: 0,
    speed: 4,
    image: undefined
}

let spiderwebImage;

let state = `title`


/**
 * Description of preload
*/
function preload() {
    //inserts images
    bug.image = loadImage("assets/images/bug.png");
    spider.image = loadImage("assets/images/spider.png");
    spiderwebImage = loadImage("assets/images/spiderweb.jpeg");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    //random starting position for bug
    bug.vx = random(-bug.speed, bug.speed);
    bug.vy = random(-bug.speed, bug.speed);

    //random starting position for spider
    spider.vx = random(-spider.speed, spider.speed);
    spider.vy = random(-spider.speed, spider.speed);
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


function title() { //displays title screen when before simulation starts
    push();
    background (0);
    textSize(94);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`Spider Web`,width/2,height/2);

    textSize(54);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`You have a fly in your web. Don't let it escape!`,width/2, 2*height/3);

    textSize(54);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`Press any button to start`,width/2, 2*height/3 + 50);
    pop();
}


function simulation() {
    background(spiderwebImage, 0, 0);
    move();
    checkOffScreen();
    checkOverlap();
    display();
}


function eat() { //displays end screen when spider and bug overlap
    push();
    background (0);
    textSize(94);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`You ate the bug!`,width/2,height/2);

    textSize(54);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`Press any key to restart`,width/2, 2*height/3);
    pop();
}

function flee() { //displays end screen when bug is offscreen
    push();
    background (0);
    textSize(94);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`The bug flew away`,width/2,height/2);

    textSize(54);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`Press any key to restart`,width/2, 2*height/3);
    pop();
}

function fall() { //displays end screen when spider of offscreen
    push();
    background (0);
    textSize(94);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`You fell off the web!`,width/2,height/2);

    textSize(54);
    fill(255,100,0);
    textAlign(CENTER,CENTER);
    text(`Press any key to restart`,width/2, 2*height/3);
    pop();
}

function move() {
    // bug mouvement

    let bd = dist(spider.x, spider.y, bug.x, bug.y); //check bug state
    if (bd > width/2) {
        bug.state = `calm`;
    }
    else {
       bug.state = `scared`; 
    }

    push();
    //bug runs from spider when scared
    if (bug.state === `scared`) {
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
        bug.x = bug.x + bug.vx;
        bug.y = bug.y + bug.vy;
    }
    else if (bug.state === `calm`) { //bug moves at random when scared
        let change = random();

        if(change < 0.01) {
            bug.vx = random(-bug.speed, bug.speed);
            bug.vy = random(-bug.speed, bug.speed);
        }
        bug.x = bug.x + bug.vx;
        bug.y = bug.y + bug.vy;
    }    
    pop();

    // spider mouvement, moves with arrow keys
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


function checkOverlap() {
    //ends simulation when spider and bug overlap
    let d = dist(spider.x, spider.y, bug.x, bug.y)

    if (d < spider.size/2 + bug.size/2) {
        state = `eat`;
    }
}

function checkOffScreen() {
    //ends simulation when bug is offscreen
    if (bug.x < 0 || bug.x > width || bug.y < 0 || bug.y > height) {
        state = `flee`;
    }

    //ends simulation when spider is offscreen
    if (spider.x < 0 || spider.x > width || spider.y < 0 || spider.y > height) {
        state = `fall`;
    }
}

function display() {
     //displays spider
     push();
     imageMode(CENTER);
     translate(spider.x, spider.y);
     if (spider.vx > 0) {
        scale(-1, 1);
     }
     image(spider.image, 0, 0, spider.size, spider.size);
     pop();
     //displays bug
     //imageMode(CENTER);
     push();
     imageMode(CENTER);
     translate(bug.x, bug.y);
     if (bug.vx > 0) {
        scale(-1, 1);
     }
     image(bug.image, 0, 0, bug.size, bug.size);
     pop();
}


function keyPressed() {
    //brings player from title screens back to simulation
    if (state === `title`) {
        state = `simulation`;
    }
    else if (state === `eat`) {
        reset();
        state = `simulation`;
    }
    else if (state === `flee`) {
        reset();
        state = `simulation`;
    }
    else if (state === `fall`) {
        reset();
        state = `simulation`;
    }
}

function reset() {
    //random starting point for spider each reset
    spider.x = random(0, width);
    spider.y = random(0, height);
    //random starting point for spider each reset
    bug.x = random(0, width);
    bug.y = random(0, height);
}
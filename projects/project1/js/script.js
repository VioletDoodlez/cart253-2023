/**
 * Project 1
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/*let user = {
    x: 250,
    y: 250,
    size: 150,
    fill: 255,
    vx: 0,
    vy: 0,
    speed: 2
}*/

let caterpillar = {
    x: 100,
    y: 250,
    totalSegments: 10,
    segmentSize: 100,
    segmentSpacing: 70,
}



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
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    let x = caterpillar.x;

    let segmentsDrawn = 0;

    while (segmentsDrawn < caterpillar.totalSegments) {
        noStroke();
        fill(100, 200, 100);
        ellipse(x, caterpillar.y, caterpillar.segmentSize);

        x = x + caterpillar.segmentSpacing;

        segmentsDrawn = segmentsDrawn + 1;
    }
    //move ();
    //display();
}



/*function move() {
    // user mouvement
    if (keyIsDown (LEFT_ARROW)) {
        user.vx = -user.speed;
    }
    else if (keyIsDown (RIGHT_ARROW)) {
        user.vx = user.speed;
    }
    else {
        user.vx = 0;
    }

    if (keyIsDown (UP_ARROW)) {
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

    // caterpillar mouvement
    if (keyIsDown (LEFT_ARROW)) {
        user.vx = -user.speed;
    }
    else if (keyIsDown (RIGHT_ARROW)) {
        user.vx = user.speed;
    }
    else {
        user.vx = 0;
    }

    if (keyIsDown (UP_ARROW)) {
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
}

function display() {
    //displays user
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
}*/

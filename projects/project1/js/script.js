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
    speed: 2
}

let caterpillar = {
    x: 250,
    y: 250,
    totalSegments: 10,
    segmentSize: 100,
    segmentSpacing: 70,
    vx: 0,
    vy: 0,
    segmentSpeed: 3
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
    move ();
    display();
}



function move() {
    // bug mouvement
    let dx = bug.x - caterpillar.x;
    let dy = bug.y - caterpillar.y;

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

    // caterpillar mouvement
    if (keyIsDown (LEFT_ARROW)) {
        caterpillar.vx = -caterpillar.segmentSpeed;
    }
    else if (keyIsDown (RIGHT_ARROW)) {
        caterpillar.vx = caterpillar.segmentSpeed;
    }
    else {
        caterpillar.vx = 0;
    }

    if (keyIsDown (UP_ARROW)) {
        caterpillar.vy = -caterpillar.segmentSpeed;
    }
    else if (keyIsDown (DOWN_ARROW)) {
        caterpillar.vy = caterpillar.segmentSpeed;
    }
    else {
        caterpillar.vy = 0;
    }

    caterpillar.x = caterpillar.x + caterpillar.vx;
    caterpillar.y = caterpillar.y + caterpillar.vy;
}

function display() {
    //displays bug
    fill(bug.fill);
    ellipse(bug.x, bug.y, bug.size);
}

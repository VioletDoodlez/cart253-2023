/**
 * Project 2
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let staticGif;
let tvImage;

/**
 * Description of preload
*/
function preload() {
    staticGif = loadImage("assets/images/static.gif");
    tvImage = loadImage("assets/images/tv.gif");
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

    imageMode(CENTER);
    image(tvImage, width / 2, height / 2, 500, 500);
    imageMode(CENTER);
    image(staticGif, width / 2, height / 2, 500, 500,);
    tint(255, 100);
}

function keyPressed() {
    if (keyCode === UP_ARROWS) {

    }
    else if (keyCode === DOWN_ARROWS) {

    }
}
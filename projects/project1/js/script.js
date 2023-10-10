/**
 * Project 1
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let circle1 = {
    x: 250,
    y: 250,
    size: 150,
    fill: 255,
    vx: 0,
    vy: 0,
    speed: 2
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

}


/**
 * Description of draw()
*/
function draw() {
    background();
    display();
}

function display() {
    fill(circle1.fill);
    ellipse(circle1.x, circle1.y, circle1.size);
}

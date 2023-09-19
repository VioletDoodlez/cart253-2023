/**
 * I Like To Move It
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let bg = {
    r: 0,
    g: 0,
    b: 0
}

let circle1 = {
    x: 250,
    y: 0,
    size: 50,
    fill: {
        r: 255,
        g: 0,
        b: 0,
    },
    alpha: 140
}

let circle2 = {
    x: 0,
    y: 500,
    size: 50,
    fill: {
        r: 255,
        g: 255,
        b: 0,
    },
    alpha: 160
}

let circle3 = {
    x: 500,
    y: 500,
    size: 50,
    fill: {
        r: 0,
        g: 0,
        b: 255,
    },
    alpha: 150
}

/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);
    noStroke();
}


/**
 * Description of draw()
*/
function draw() {
    //Background
    background(bg.r,bg.g,bg.b);
    
    //Circle 1
    circle1.y = circle1.y + 1;
    circle1.y = constrain(circle1.y, 0, 210);
    circle1.size = circle1.size + 0.25;
    circle1.size = constrain(circle1.size, 0, 150);
    circle1.fill.b = map(mouseX,0,width,0,255);
    fill(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.alpha);
    ellipse(circle1.x, circle1.y, circle1.size);
    
    //Circle 2
    circle2.x = circle2.x + 1;
    circle2.y = circle2.y - 1;
    circle2.x = constrain(circle2.x, 0, 200);
    circle2.y = constrain(circle2.y, 300, 500);
    circle2.size = circle2.size + 0.25;
    circle2.size = constrain(circle2.size, 0, 150);
    circle2.fill.r = map(mouseY,0,width,0,255);
    fill(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.alpha);
    ellipse(circle2.x, circle2.y, circle2.size);

    //Circle 3
    circle3.x = circle3.x - 1;
    circle3.y = circle3.y - 1;
    circle3.x = constrain(circle3.x, 300, 500);
    circle3.y = constrain(circle3.y, 300, 500);
    circle3.size = circle3.size + 0.25;
    circle3.size = constrain(circle3.size, 0, 150);
    circle3.fill.g = map(mouseX+mouseY,0,width,0,255);
    fill(circle3.fill.r, circle3.fill.g, circle3.fill.b, circle3.alpha);
    ellipse(circle3.x, circle3.y, circle3.size);

}  
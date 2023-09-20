/**
 * I Like To Move It
 * Nicole Covaliu
 * 
 * A short animation of three circles converging at the center of the
   canvas to form a Venn Diagram. The colours of the circle change when
   the mouse moves.
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}
//Background object+properties
let bg = {
    r: 0,
    g: 0,
    b: 0
}

//Circle 1 object+properties
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

//Circle 2 object+properties
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

//Circle 3 object+properties
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
    //moves the circle vertically downwards
    circle1.y = circle1.y + 1;
    circle1.y = constrain(circle1.y, 0, 210); //makes the circle stop near the center of the canvas
    //enlarges the circle
    circle1.size = circle1.size + 0.25;
    circle1.size = constrain(circle1.size, 0, 150);
    circle1.fill.b = map(mouseX,0,width,0,255); //changes the shade of the circle when the mouse moves
    fill(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.alpha);
    ellipse(circle1.x, circle1.y, circle1.size);
    
    //Circle 2
    //moves the circle diagonally from bottom left to center
    circle2.x = circle2.x + 1;
    circle2.y = circle2.y - 1;
    circle2.x = constrain(circle2.x, 0, 200); //makes the circle stop near the center of the canvas
    circle2.y = constrain(circle2.y, 300, 500);
    //enlarges the circle
    circle2.size = circle2.size + 0.25;
    circle2.size = constrain(circle2.size, 0, 150);
    circle2.fill.r = map(mouseY,0,width,0,255); //changes the shade of the circle when the mouse moves
    fill(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.alpha);
    ellipse(circle2.x, circle2.y, circle2.size);

    //Circle 3
    //moves the circle diagonally from bottom right to center
    circle3.x = circle3.x - 1;
    circle3.y = circle3.y - 1;
    circle3.x = constrain(circle3.x, 300, 500); //makes the circle stop near the center of the canvas
    circle3.y = constrain(circle3.y, 300, 500);
    //enlarges the circle
    circle3.size = circle3.size + 0.25;
    circle3.size = constrain(circle3.size, 0, 150);
    circle3.fill.g = map(mouseX+mouseY,0,width,0,255); //changes the shade of the circle when the mouse moves
    fill(circle3.fill.r, circle3.fill.g, circle3.fill.b, circle3.alpha);
    ellipse(circle3.x, circle3.y, circle3.size);

}  
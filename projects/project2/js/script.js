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
//let toneSFX;

let transparency = 100; //make my transparency a variable to trigger an ending easily;

let state = `title`;

/**
 * Description of preload
*/
function preload() {
    staticGif = loadImage("assets/images/static.gif");
    tvImage = loadImage("assets/images/tv.gif");

    //toneSFX = loadSound("assets/sounds/tone.wav");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    userStartAudio();

    //toneSFX.addCue(0.1, 1);
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
    else if (state === `tuned`) {
        tuned();
    }

}

function title() { //title screen
    push();
    background(0);
    textSize(150);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Tuning In`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Use your arrow keys to get rid of the static on your screen`, width / 2, 2 * height / 3);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to start`, width / 2, 2 * height / 3 + 50);
}

function simulation() {
    display();
    tune();
    checkStatic();
}

function display() { // display gifs, with static gif superimposed with a lower opacity
    background(0);

    imageMode(CENTER);
    image(tvImage, width / 2, height / 2, 700, 700);

    push();
    tint(255, transparency);
    imageMode(CENTER);
    image(staticGif, width / 2, height / 2, 700, 700,);
    pop();
}

function tune() { // change the opacity of the static gif 
    if (keyIsDown(UP_ARROW)) { // background image gets clearer
        transparency = transparency - 1;
        transparency = constrain(transparency, 0, 255);
    }
    else if (keyIsDown(DOWN_ARROW)) { // static takes over
        transparency = transparency + 1;
        transparency = constrain(transparency, 0, 255);

    }

    console.log(transparency); // make sure the transparency is changing
}

function checkStatic() {
    if (transparency === 0) {
        state = `tuned`; // triggers ending if staticGif reaches 0 transparency
    }
}

function tuned() { // ending "screen"
    //toneSFX.play();

    push();
    textSize(150);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Tuned!`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You got a clear image!`, width / 2, 2 * height / 3);
}

function mousePressed() { //starts simulation
    if (state === `title`) {
        state = `simulation`;
    }
}
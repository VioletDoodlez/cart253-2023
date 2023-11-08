/**
 * Project 2
 * Nicole Covaliu
 * 
 * A prototype allowing the player to control the alpha of a gif
 * to remove the 
 */

"use strict";

let button = {
    x: undefined,
    y: undefined,
    size: 30
}

let staticGif;
let tvImage;
let toneSFX;
let buttonSFX;

let transparency = undefined; //make my transparency a variable to trigger an ending easily;

let state = `title`;
let tvstate = `off`; // allows me to turn my tv on if i press the red button

/**
 * Description of preload
*/
function preload() {
    staticGif = loadImage("assets/images/static.gif");
    tvImage = loadImage("assets/images/tv.gif");

    toneSFX = loadSound("assets/sounds/tone.wav");
    buttonSFX = loadSound("assets/sounds/switch.wav");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    //sets up button position
    button.x = width / 4 + 650;
    button.y = height / 4 + 490;

    transparency = random(50, 500); //alpha of static is randomized everytime the page is refreshed
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
        noLoop(); //prevents toneSFX from looping
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
    text(`Turn on your tv and use your arrow keys to get rid of the static on your screen`, width / 2, 2 * height / 3);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to start`, width / 2, 2 * height / 3 + 50);
}

function simulation() { // simulation
    display();
    tune();
    checkStatic();
}

function display() {
    background(0);

    // tvbox
    push();
    rectMode(CENTER);
    noStroke();
    fill(127, 127, 127);
    rect(width / 2, height / 2, 720, 720, 20);
    pop();

    //tv screen
    push();
    rectMode(CENTER);
    noStroke();
    fill(0);
    rect(width / 2, height / 2 - 20, 600, 600, 20);
    pop();

    if (tvstate === `on`) { // display gifs, with static gif superimposed with a lower opacity (when red button is clicked)
        // vhs program
        push();
        imageMode(CENTER);
        image(tvImage, width / 2, height / 2 - 20, 550, 550);
        pop();

        // static
        push();
        tint(255, transparency);
        imageMode(CENTER);
        image(staticGif, width / 2, height / 2 - 20, 550, 550,);
        pop();
    }

    // button
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(button.x, button.y, button.size);
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
    toneSFX.play(); // plays sound effect

    textSize(150);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Tuned!`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You got a clear image!`, width / 2, 2 * height / 3);
}

function mousePressed() {
    //starts simulation
    if (state === `title`) {
        state = `simulation`;
    }

    // allows player to turn on the tv
    let d = dist(button.x, button.y, mouseX, mouseY);
    if (d < button.size / 2) {
        tvstate = `on`;
        console.log("hello");
        buttonSFX.play();
    }
}
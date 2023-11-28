/**
 * Project 2
 * Nicole Covaliu
 * 
 * 
 */

"use strict";

let button = {
    x: undefined,
    y: undefined,
    size: 20
}


let vhsIcon;
let cartoonIcon;
let filmIcon;
let infoIcon;
let musicIcon;
let newsIcon;
let weatherIcon;

let staticGif;
let vhsGif;
let cartoonGif;
let filmGif;
let infoGif;
let musicGif;
let newsGif;
let weatherGif;

let backgroundImage;
let tvImage;
let tableImage;

let program = [];
let category = [];

let channel;
let icon;

let toneSFX;
let buttonSFX;

let transparency = undefined; //make my transparency a variable to trigger an ending easily;

let state = `title`;
let tvstate = `off`; // allows me to turn my tv on if i press the red button

/**
 * Description of preload
*/
function preload() {
    vhsIcon = loadImage("assets/images/icon_vhs.png");
    cartoonIcon = loadImage("assets/images/icon_cartoon.png");
    filmIcon = loadImage("assets/images/icon_film.png");
    infoIcon = loadImage("assets/images/icon_info.png");
    musicIcon = loadImage("assets/images/icon_music.png");
    newsIcon = loadImage("assets/images/icon_news.png");
    weatherIcon = loadImage("assets/images/icon_weather.png");

    category.push(vhsIcon, filmIcon, musicIcon, newsIcon, weatherIcon);

    staticGif = loadImage("assets/images/static.gif");
    vhsGif = loadImage("assets/images/vhs.gif");
    cartoonGif = loadImage("assets/images/cartoon.gif");
    filmGif = loadImage("assets/images/film.gif");
    infoGif = loadImage("assets/images/infomercial.gif");
    musicGif = loadImage("assets/images/music.gif");
    newsGif = loadImage("assets/images/news.gif");
    weatherGif = loadImage("assets/images/weather.gif");

    program.push(vhsGif, cartoonGif, filmGif, infoGif, musicGif, newsGif, weatherGif);

    backgroundImage = loadImage("assets/images/backgroundblur.png");
    tvImage = loadImage("assets/images/tv.jpg");
    tableImage = loadImage("assets/images/table.png");

    toneSFX = loadSound("assets/sounds/tone.wav");
    buttonSFX = loadSound("assets/sounds/switch.wav");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    //sets up button position
    button.x = width / 4 + 680;
    button.y = height / 4 + 350;

    transparency = random(50, 230); //alpha of static is randomized everytime the page is refreshed

    channel = random(program);

    icon = random(category);
}


/**
 * Description of draw()
*/
function draw() {
    if (state === `title`) {
        title();
    }
    else if (state === `controls`) {
        controls();
    }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === `tuned`) {
        tuned();
        //noLoop(); //prevents toneSFX from looping
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
    text(`You want to watch TV but the storm outside is messing up the signal!`, width / 2, 2 * height / 3);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to see controls`, width / 2, 2 * height / 3 + 50);
}

function controls() {
    push();
    background(0);
    textSize(80);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Controls`, width / 2, height - 680);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click on the red button to turn your tv on`, width / 2, height - 570);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Use the left and right arrow keys to switch between channels`, width / 2, height - 500);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Use the up and down arrow keys to tune your tv and get rid of the static`, width / 2, height - 430);

    textSize(50);
    fill(255, 0, 136);
    textAlign(CENTER, CENTER);
    text(`You can't just tune any channel!`, width / 2, height - 330);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Match the channel with the icon at the top left corner of your screen.`, width / 2, height - 230);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Fail to get a match, and it's game over`, width / 2, height - 160);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Click to start`, width / 2, height - 80);
    pop();
}

function simulation() { // simulation
    display();
    tune();
    checkStatic();
}

function display() {
    background(backgroundImage);

    push();
    image(icon, 0, 0, 150, 150);
    pop();

    push();
    imageMode(CENTER);
    image(tableImage, width / 2, height + 200, 1500, 700);
    pop();

    push();
    rectMode(CENTER);
    noStroke();
    fill(0);
    rect(width / 2, height / 2, 800, 500);
    pop();

    if (tvstate === `on`) { // display gifs, with static gif superimposed with a lower opacity (when red button is clicked)
        // vhs program
        push();
        imageMode(CENTER);
        image(channel, width / 2 - 75, height / 2, 600, 500);
        pop();

        // static
        push();
        tint(255, transparency);
        imageMode(CENTER);
        image(staticGif, width / 2 - 75, height / 2, 600, 500);
        pop();
    }

    push();
    imageMode(CENTER);
    image(tvImage, width / 2, height / 2, 900, 600);
    pop();

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
    //toneSFX.play(); // plays sound effect

    textSize(150);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Tuned!`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You got a clear image!`, width / 2, 2 * height / 3);
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        if (channel === cartoonGif) {
            channel = filmGif;
        }
        else if (channel === filmGif) {
            channel = infoGif;
        }
        else if (channel === infoGif) {
            channel = musicGif;
        }
        else if (channel === musicGif) {
            channel = newsGif;
        }
        else if (channel === newsGif) {
            channel = weatherGif;
        }
        else if (channel === weatherGif) {
            channel = vhsGif;
        }
        else if (channel === vhsGif) {
            channel = cartoonGif;
        }

        transparency = random(50, 230);
        buttonSFX.play();
    }
    if (keyCode === LEFT_ARROW) {
        if (channel === cartoonGif) {
            channel = vhsGif;
        }
        else if (channel === vhsGif) {
            channel = weatherGif;
        }
        else if (channel === weatherGif) {
            channel = newsGif;
        }
        else if (channel === newsGif) {
            channel = musicGif;
        }
        else if (channel === musicGif) {
            channel = infoGif;
        }
        else if (channel === infoGif) {
            channel = filmGif;
        }
        else if (channel === filmGif) {
            channel = cartoonGif;
        }

        transparency = random(50, 230);
        buttonSFX.play();
    }
}

function mousePressed() {
    //starts simulation
    if (state === `title`) {
        state = `controls`;
    }

    else if (state === `controls`) {
        state = `simulation`;
    }

    else if (state === `tuned`) {
        reset();
        state = `simulation`;
    }


    // allows player to turn on the tv
    let d = dist(button.x, button.y, mouseX, mouseY);
    if (d < button.size / 2) {
        tvstate = `on`;
        console.log("hello");
        buttonSFX.play();
    }

    function reset() {
        tvstate = `off`; // allows me to turn my tv on if i press the red button

        //sets up button position
        button.x = width / 4 + 680;
        button.y = height / 4 + 350;

        transparency = random(50, 500); //alpha of static is randomized everytime the page is refreshed

        channel = random(program);

        icon = random(category);
    }
}

function reset() {
    tvstate = `off`; // allows me to turn my tv on if i press the red button

    //sets up button position
    button.x = width / 4 + 680;
    button.y = height / 4 + 350;

    transparency = random(50, 500); //alpha of static is randomized everytime the page is refreshed

    channel = random(program);

    icon = random(category);
}
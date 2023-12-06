/**
 * Project 2
 * Nicole Covaliu
 * 
 * Game where players need to tune a tv and switch channels, making
 * sure that the channel corresponds with the correct icon at the top corner,
 * indicating a channel category
 */

"use strict";

let button = {
    x: undefined,
    y: undefined,
    size: 20
}

let menu = {
    x: undefined,
    y: undefined,
    w: 250,
    h: 100
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

let stormSFX;
let fireplaceSFX;
let staticSFX;
let vhsSFX;
let cartoonSFX;
let filmSFX;
let infoSFX;
let musicSFX;
let newsSFX;
let weatherSFX;

let buttonSFX;

let backgroundImage;
let tvImage;
let tableImage;

let program = [];
let category = [];
let audio = [];
let idx; // current channel

let channel;
let icon;

let transparency = undefined; //make my transparency a variable to trigger an ending easily;
let tvvolume = undefined;
let staticvolume = undefined;

let state = `title`;
let tvstate = `off`; // allows me to turn my tv on if i press the red button
let menustate = `down`;

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

    category.push(vhsIcon, cartoonIcon, filmIcon, infoIcon, musicIcon, newsIcon, weatherIcon); // puts all of the icons in the "category" array

    staticGif = loadImage("assets/images/static.gif");
    vhsGif = loadImage("assets/images/vhs.gif");
    cartoonGif = loadImage("assets/images/cartoon.gif");
    filmGif = loadImage("assets/images/film.gif");
    infoGif = loadImage("assets/images/infomercial.gif");
    musicGif = loadImage("assets/images/music.gif");
    newsGif = loadImage("assets/images/news.gif");
    weatherGif = loadImage("assets/images/weather.gif");

    program.push(vhsGif, cartoonGif, filmGif, infoGif, musicGif, newsGif, weatherGif); // puts all of the gifs in the "program" array

    backgroundImage = loadImage("assets/images/backgroundblur.png");
    tvImage = loadImage("assets/images/tv.jpg");
    tableImage = loadImage("assets/images/table.png");


    stormSFX = loadSound("assets/sounds/stormSFX.mp3"); // plays storm ambience
    fireplaceSFX = loadSound("assets/sounds/fireplaceSFX.mp3"); // plays fireplace ambience
    staticSFX = loadSound("assets/sounds/staticSFX.mp3"); // plays static
    vhsSFX = loadSound("assets/sounds/LadyBlue.mp3"); // plays Lady Blue by Epoch
    cartoonSFX = loadSound("assets/sounds/Jem.mp3"); // plays the extended version of the Jem and the Holograms theme song
    filmSFX = loadSound("assets/sounds/BloodDragon.mp3"); // plays Blood Dragon Theme by Power Glove
    infoSFX = loadSound("assets/sounds/SundayShopping.mp3"); // plays sunday shopping by vcr-classique
    musicSFX = loadSound("assets/sounds/MaterialGirl.mp3"); // plays Material Girl by Madonna
    newsSFX = loadSound("assets/sounds/LonesomeCity.mp3"); // plays lonesome city by vcr-classique
    weatherSFX = loadSound("assets/sounds/LocalTime.mp3"); // plays local time by vcr-classique

    audio.push(vhsSFX, cartoonSFX, filmSFX, infoSFX, musicSFX, newsSFX, weatherSFX); // puts all of the music in the "audio" array

    buttonSFX = loadSound("assets/sounds/switch.wav");
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // sets button position
    button.x = width / 4 + 680; //laptop view
    button.y = height / 4 + 350; //laptop view

    // sets menu position
    menu.x = width - 150;
    menu.y = height - 50;

    transparency = random(50, 230); // alpha of static is randomized everytime the page is refreshed
    tvvolume = random(0.01, 0.05); // music is randomized everytime the page is refreshed
    staticvolume = random(0.1, 0.5); // alpha of static is randomized everytime the page is refreshed

    channel = random(program); // channel variable generates random gif inside of program array
    idx = program.indexOf(channel); // searches gif index

    icon = random(category); // icon variable generates random icon inside of category array

    userStartAudio();
}


/**
 * Description of draw()
*/
function draw() {
    if (state === `title`) {
        title();
    }
    // else if (state === `controls`) {
    //     controls();
    // }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === `tuned`) {
        tuned();
    }
    else if (state === `wrong`) {
        wrong();
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
    text(`Click to start`, width / 2, 2 * height / 3 + 50);
}


function simulation() { // simulation
    display();
    tune();
    checkStatic();
    staticSFX.setVolume(staticvolume);
    vhsSFX.setVolume(tvvolume);
    cartoonSFX.setVolume(tvvolume);
    filmSFX.setVolume(tvvolume);
    infoSFX.setVolume(tvvolume);
    musicSFX.setVolume(tvvolume);
    newsSFX.setVolume(tvvolume);
    weatherSFX.setVolume(tvvolume);
}

function display() { // displays shapes and images
    background(backgroundImage);

    // icon
    push();
    image(icon, 0, 0, 150, 150);
    pop();

    // table
    push();
    imageMode(CENTER);
    image(tableImage, width / 2, height + 200, 1500, 700);
    pop();

    // blank screen
    push();
    rectMode(CENTER);
    noStroke();
    fill(0);
    rect(width / 2, height / 2 - 20, 800, 500);
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
    //tv
    push();
    imageMode(CENTER);
    image(tvImage, width / 2, height / 2, 900, 600); //laptop view
    pop();

    // button
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(button.x, button.y, button.size);
    pop();

    // menu
    push();
    rectMode(CENTER);
    stroke(255);
    fill(0);
    rect(menu.x, menu.y, menu.w, menu.h);
    pop();

    // arrow
    push();
    fill(255);
    triangle(width - 150, height - 90, width - 255, height - 10, width - 40, height - 10);
    pop();

    if (menustate === `up`) { // displays controls

        push();
        rectMode(CENTER);
        stroke(255);
        fill(0);
        rect(menu.x, menu.y, menu.w, menu.h + 800);
        pop();

        push();
        fill(255);
        triangle(width - 150, height - 90, width - 255, height - 10, width - 40, height - 10);
        pop();


        textSize(30);
        fill(255);
        textAlign(CENTER, CENTER);
        text(`Controls`, width - 150, height - 480);

        textSize(14);
        fill(255);
        textAlign(CENTER, CENTER);
        text(`Click on the red button to`, width - 150, height - 440);
        text(`turn your tv on.`, width - 150, height - 420);

        textSize(14);
        fill(255);
        textAlign(CENTER, CENTER);
        text(`Surf the channels with`, width - 150, height - 380);
        text(`the left and right arrow keys.`, width - 150, height - 360);

        textSize(14);
        fill(255);
        textAlign(CENTER, CENTER);
        text(`Tune your tv with `, width - 150, height - 320);
        text(`the up and down arrow keys.`, width - 150, height - 300);

        textSize(17);
        fill(255, 0, 136);
        textAlign(CENTER, CENTER);
        text(`You can't just tune any channel!`, width - 150, height - 260);

        textSize(14);
        fill(255);
        textAlign(CENTER, CENTER);
        text(`The icon at the top left corner of your`, width - 150, height - 210);
        text(`screen indicates a channel theme`, width - 150, height - 190);

        textSize(14);
        fill(255);
        textAlign(CENTER, CENTER);
        text(`Match the channel with`, width - 150, height - 140);
        text(`the corresponding icon.`, width - 150, height - 120);

        pop();
    }
}

function tune() { // change the opacity of the static gif 
    if (keyIsDown(UP_ARROW)) { // background image gets clearer
        staticvolume = staticvolume - 0.005;
        tvvolume = tvvolume + 0.005;
        transparency = transparency - 1;
    }
    else if (keyIsDown(DOWN_ARROW)) { // static takes over
        staticvolume = staticvolume + 0.005;
        tvvolume = tvvolume - 0.005;
        transparency = transparency + 1;
    }

    staticvolume = constrain(staticvolume, 0, 1);
    tvvolume = constrain(tvvolume, 0, 0.9);
    transparency = constrain(transparency, 0, 255);
}

function checkStatic() { // makes sure the correct screen is displayed

    if (transparency === 0) {
        if (icon === vhsIcon && channel === vhsGif || icon === cartoonIcon && channel === cartoonGif || icon === filmIcon && channel === filmGif || icon === infoIcon && channel === infoGif || icon === musicIcon && channel === musicGif || icon === newsIcon && channel === newsGif || icon === weatherIcon && channel === weatherGif) {
            state = `tuned`; // triggers win if staticGif reaches 0 transparency when icon and channel match
        }
        else {
            state = `wrong`; // triggers lose if staticGif reaches 0 transparency with wrong icons
            staticSFX.stop();
            vhsSFX.stop();
            cartoonSFX.stop();
            filmSFX.stop();
            infoSFX.stop();
            musicSFX.stop();
            newsSFX.stop();
            weatherSFX.stop();
        }
    }
}

function checkSound() { // plays audio
    // loops ambience (without it sounding weird)
    if (state === `simulation`) {
        stormSFX.loop();
        fireplaceSFX.loop();
    }

    if (tvstate === `on`) {
        staticSFX.play(); // static plays when tv is on
        staticSFX.loop(); // loops static sound

        // plays corresponding music
        audio[idx].play();
    }
}

function tuned() { // win "screen"
    textSize(150);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Tuned!`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You got a clear image!`, width / 2, 2 * height / 3);
}

function wrong() { // lose "screen"
    push();
    textSize(150);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Oops! Wrong channel!`, width / 2, height / 2);

    textSize(34);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Try again?`, width / 2, 2 * height / 3);
    pop();
}

function keyPressed() {
    // cycles through the channels in order rather than generating a random channel everytime a key is pressed
    if (tvstate === `on`) {
        if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
            let nextidx;
            if (keyCode === RIGHT_ARROW) {
                nextidx = (idx + 1) % program.length; // modulo arithmetic introduced by my dad
            }
            // reverses the order of the images
            if (keyCode === LEFT_ARROW) {
                if (idx === 0) {
                    nextidx = program.length - 1;
                }
                else {
                    nextidx = idx - 1;
                }

            }
            channel = program[nextidx]; // change channel to nextidx
            audio[idx].stop(); // stop prev audio
            idx = program.indexOf(channel); // load new index of current channel
            transparency = random(50, 230); //changes the transparency every time the buttons are pressed
            tvvolume = random(0.001, 0.005); // changes the music's volume every time the buttons are pressed
            staticvolume = random(0.1, 0.5); // changes the static's volume every time the buttons are pressed
            buttonSFX.play(); // plays sound when channel surfing
            checkSound(); // plays audio for current channel
            idx = nextidx; //
        }
    }
}

function mousePressed() {
    // starts simulation
    if (state === `title`) {
        stormSFX.play();
        stormSFX.setVolume(0.1);
        fireplaceSFX.play();
        fireplaceSFX.setVolume(0.5);
        state = `simulation`;
    }
    // resets the program
    else if (state === `tuned`) {
        reset();
        state = `simulation`;
    }
    else if (state === `wrong`) {
        reset();
        state = `simulation`;
    }


    // allows player to turn on the tv
    let d = dist(button.x, button.y, mouseX, mouseY);
    if (d < button.size / 2) {
        tvstate = `on`;
        checkSound(); // plays the audio, depending on the channel
        console.log("power on");
        buttonSFX.play(); // plays sound when button is pressed
    }

    // brings up controls menu
    let cd = dist(menu.x, menu.y, mouseX, mouseY);
    if (cd < menu.w / 2 || cd < menu.h / 2) {
        menustate = `up`;
        console.log("up");
    }

    function reset() {
        tvstate = `off`; // resets tv to off
        menustate = `down`; // brings down the controls menu

        // stops any sound when reset
        staticSFX.stop();
        vhsSFX.stop();
        cartoonSFX.stop();
        filmSFX.stop();
        infoSFX.stop();
        musicSFX.stop();
        newsSFX.stop();
        weatherSFX.stop();

        //sets up button position
        button.x = width / 4 + 680; //laptop view
        button.y = height / 4 + 350; //laptop view
        menu.x = width - 150;
        menu.y = height - 50;

        transparency = random(50, 500); //alpha of static is randomized everytime the program resets
        tvvolume = random(0.1, 0.5); //music is randomized everytime the program resets
        staticvolume = random(0.1, 0.5); // static sound is randomized everytime the program resets

        channel = random(program); // channel is randomized everytime the program resets
        idx = program.indexOf(channel);

        icon = random(category); // icon is randomized everytime the program resets
    }
}
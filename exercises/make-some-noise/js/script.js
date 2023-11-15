/**
 * Make Some Noise
 * Nicole Covaliu
 * 
 * Musical toy activity with added shapes and mouse input
 */

"use strict";

let balls = [];
let squares = [];
let rectangles = [];

let ballNotes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`]; //notes that can be played by balls
let squareNotes = [`F4`, `G4`, `Ab5`, `Bb5`, `C5`, `Db5`, `Eb5`, `F5`]; //notes that can be played by squares
let rectNotes = [`F2`, `G2`, `Ab3`, `Bb3`, `C3`, `Db3`, `Eb3`, `F3`]; //notes that can be played by rectangles

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

    userStartAudio();
}

/**
 * Description of draw()
*/
function draw() {
    background(0);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.move();
        ball.bounce();
        ball.display();
    }

    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.move();
        square.bounce();
        square.display();
    }

    for (let i = 0; i < rectangles.length; i++) {
        let rect = rectangles[i];
        rect.move();
        rect.bounce();
        for (let j = 0; j < balls.length; j++) {
            let ball = balls[j];
            rect.cleanBalls(ball, balls, rect, rectangles); // remove balls from array when touching
        }
        for (let j = 0; j < squares.length; j++) {
            let square = squares[j];
            rect.cleanSquares(square, squares, rect, rectangles); // remove squares from array when touching
        }

        rect.display();
    }
}
function mouseDragged() {
    createBall(mouseX, mouseY); //create ball at mouse coordinates when mouse dragged
    console.log("ball");
}

function createBall(x, y) {
    let note = random(ballNotes); //play synth note
    let ball = new Ball(x, y, note); //create a ball
    balls.push(ball);
}

function mousePressed() {
    createSquare(mouseX, mouseY); //create square at mouse coordinates when mouse pressed
    console.log("square");
}

function createSquare(x, y) {
    let note = random(squareNotes); //play synth note
    let square = new Square(x, y, note); //create a square
    squares.push(square);
}

function mouseWheel() {
    createRectangle(mouseX, mouseY); //create rectangle at mouse coordinates when scrolling
    console.log("rectangle");
}
function createRectangle(x, y) {
    let note = random(rectNotes); //play synth note
    let rect = new Rectangle(x, y, note); //create a rectangle
    rectangles.push(rect);
}
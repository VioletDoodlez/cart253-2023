/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let balls = [];
let squares = [];
let rectangles = [];

let ballNotes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];
let squareNotes = [`F4`, `G4`, `Ab5`, `Bb5`, `C5`, `Db5`, `Eb5`, `F5`];

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
            rect.cleanBalls(ball, balls, rect, rectangles);
        }
        for (let j = 0; j < squares.length; j++) {
            let square = squares[j];
            rect.cleanSquares(square, squares, rect, rectangles);
        }

        rect.display();
    }
}
function mouseDragged() {
    createBall(mouseX, mouseY);
    console.log("ball");
}

function createBall(x, y) {
    let note = random(ballNotes);
    let ball = new Ball(x, y, note);
    balls.push(ball);
}

function mousePressed() {
    createSquare(mouseX, mouseY);
    console.log("square");
}

function createSquare(x, y) {
    let note = random(squareNotes);
    let square = new Square(x, y, note);
    squares.push(square);
}

function mouseWheel() {
    createRectangle(mouseX, mouseY);
    console.log("rectangle");
}
function createRectangle(x, y) {
    let rect = new Rectangle(x, y);
    rectangles.push(rect);
}
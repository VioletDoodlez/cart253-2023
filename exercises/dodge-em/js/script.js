/**
 * Dodge Em
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let ball = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
  fill: {
    r: 230,
    g: 230,
    b: 230
  }
}

let user = {
  x: 0,
  y: 0,
  size: 100,
  fill: {
    r: 90,
    g: 90,
    b: 0
  }
}

let holeImage;

/**
 * Description of preload
*/
function preload() {
  holeImage = loadImage("assets/images/hole.png");
}


/**
 * Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  ball.x = random(0, width);
  ball.y = random(0, height);
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

/**
 * Description of draw()
*/
function draw() {
  background(90, 255, 90);

  //hole
  image(holeImage, width/2 - 75, height/2 - 75, 150, 150);

  //user

  fill(user.fill.r, user.fill.g,user.fill.b);
  ellipse(user.x, user.y, user.size);

  //covid
  ball.x = ball.x + ball.vx;
  ball.y = ball.y + ball.vy;
  
  if (ball.x > width) {
    ball.x = 0;
    ball.y = random(0, height);
  }
  if (ball.x < 0) {
    ball.x = width;
    ball.y = random(0, height);
  }

  if (ball.y > height) {
    ball.x = random(0, width);
    ball.y = 0;
  }
  if (ball.y < 0) {
    ball.x = random(0, width);
    ball.y = height;
  }

  fill(ball.fill.r, ball.fill.g, ball.fill.b);
  noStroke();
  ellipse(ball.x, ball.y, ball.size);

  //catching covid
  let d = dist(ball.x, ball.y, user.x, user.y);

  if (d <= ball.size/2 + user.size/2) {
      ball.vx = -ball.vx;
      ball.vy = -ball.vy;
  }

  let ch = dist(ball.x, ball.y, width/2, height/2);

  if (ch < 25){
    noLoop();
  }
}

function mouseDragged() {
  user.x = mouseX;
  user.y = mouseY;
}
let scene = 'scene1';
let startTime;
let whiteCircle;
let blackCircles = [];
let blackCircles1 = [];
let whiteCircleXMin;
let whiteCircleXMax;
let whiteCircleYMin;
let whiteCircleYMax;
let initialBlackYMin = 180;
let initialBlackYMax = 485;
let initialBlackYMin1 = 395;
let initialBlackYMax1 = 485;
let whiteCircleOffScreen = false;
let offScreenTimer;
let whiteCircleSpeed = 3;
let isMovingUp = false;
let isMovingLeft = false;
let isMovingDown = false;
let isMovingRight = false;
let ghosts = [];
let shootBalls = [];

let ghostImage;

function preload() {
  ghostImage = loadImage('ghost.png');
  whiteCircleImage = loadImage('cat.png');
  blackCircleImage = loadImage('leech.png');
}

function setup() {
  //create the canvas using the full browser window.
  // I am so sorry for using this screen size but I was really low on time to modify it at the last
  createCanvas(500, 500);
  imageMode(CENTER)
  startTime = millis();
  whiteCircleXMin = 85;
  whiteCircleXMax = 415;
  whiteCircleYMin = 80;
  whiteCircleYMax = 460;
  whiteCircleXMin1 = 30;
  whiteCircleXMax1 = 460;
  whiteCircleYMin1 = 420;
  whiteCircleYMax1 = 460;
  whiteCircleXMin2 = 30;
  whiteCircleXMax2 = 460;
  whiteCircleYMin2 = 125;
  whiteCircleYMax2 = 270;

  for (let i = 0; i < 20; i++) {
    let x = random(width / 2 - 190, width / 2 + 190);
    let y = random(initialBlackYMin, initialBlackYMax);
    let speed = random(0.5, 1.8);
    blackCircles.push({ position: createVector(x, y), followWhite: false, speed: speed });
  }

  for (let i = 0; i < 20; i++) {
    let x = random(width / 2 - 190, width / 2 + 190);
    let y = random(initialBlackYMin1, initialBlackYMax1);
    let speed = random(0.5, 1.8);
    blackCircles1.push({ position: createVector(x, y), followWhite: false, speed: speed });
  }

  let x = random(whiteCircleXMin, whiteCircleXMax);
  let y = random(whiteCircleYMin, whiteCircleYMax);
  whiteCircle = createVector(250, 80);

  let x1 = random(whiteCircleXMin1, whiteCircleXMax1);
  let y1 = random(whiteCircleYMin1, whiteCircleYMax1);
  whiteCircle1 = createVector(80, 450);

  let x2 = random(whiteCircleXMin2, whiteCircleXMax2);
  let y2 = random(whiteCircleYMin2, whiteCircleYMax2);
  whiteCircle2 = createVector(0, 270);

  for (let i = 0; i < 5; i++) {
    let x = random(whiteCircleXMin2, whiteCircleXMax2);
    let y = random(whiteCircleYMin2, whiteCircleYMax2);
    ghosts.push({ position: createVector(x, y), isShooting: false });
  }
}


function draw() {
  // your cool abstract sonic artwork code goes in this draw function
  if (scene === 'scene1') {
    background('#87CEEB');
    noStroke();
    rectMode(CENTER);

    fill(0, 0, 0);
    rect(200, 50, 400, 5);

    fill(0, 100, 150);
    rect(width / 2, 350, 500, 350);

    fill('#563517');
    rect(width - 5, 220, 100, 350);

    fill('#563517');
    rect(5, 275, 100, 450);

    fill('#563517');
    rect(250, 495, 500, 10);

    fill(112, 255, 3, 80);
    rect(448, 443, 5, 95);

    if (millis() - startTime >= 3000) {
      whiteCircle.y += 2;
      if (whiteCircle.y > height + 60) {
        if (!offScreenTimer) {
          offScreenTimer = millis();
        }

        if (millis() - offScreenTimer >= 2000) {
          whiteCircleOffScreen = true;
        }
      }
    }

    fill(255, 255, 255);
    image(whiteCircleImage, whiteCircle.x, whiteCircle.y, 60, 60); // Replace circle with image

    for (let i = 0; i < blackCircles.length; i++) {
      fill(0, 0, 0);
      avoidOtherCircles(i);

      if (!whiteCircleOffScreen) {
        moveTowards(whiteCircle, blackCircles[i].position, blackCircles[i].speed);
      } else {
        if (blackCircles[i].position.y > whiteCircleYMin) {
          blackCircles[i].position.y -= 0.5;
        }
      }
      blackCircles[i].position.x = constrain(blackCircles[i].position.x, width / 2 - 190, width / 2 + 190);
      blackCircles[i].position.y = constrain(blackCircles[i].position.y, initialBlackYMin, initialBlackYMax);
      image(blackCircleImage, blackCircles[i].position.x, blackCircles[i].position.y, 20, 20);

      // Check for collision with white circle
      let d = dist(whiteCircle.x, whiteCircle.y, blackCircles[i].position.x, blackCircles[i].position.y);
      let whiteCircleRadius = 30;
      if (d < whiteCircleRadius + 5) { // You can adjust the collision radius
        // Reduce the speed of the white circle
        whiteCircleSpeed -= 0.0005;
        // Ensure it doesn't go negative
        whiteCircleSpeed = max(0, whiteCircleSpeed);
      }
    }

    if (isMovingUp && whiteCircle.y > whiteCircleYMin) whiteCircle.y -= whiteCircleSpeed;
    if (isMovingLeft && whiteCircle.x > whiteCircleXMin) whiteCircle.x -= whiteCircleSpeed;
    if (isMovingDown && whiteCircle.y < whiteCircleYMax) whiteCircle.y += whiteCircleSpeed;
    if (isMovingRight && whiteCircle.x < whiteCircleXMax) whiteCircle.x += whiteCircleSpeed;
    whiteCircle.y = constrain(whiteCircle.y, whiteCircleYMin, whiteCircleYMax);
    whiteCircle.x = constrain(whiteCircle.x, whiteCircleXMin, whiteCircleXMax);

    if (
      whiteCircle.x - 30 < 450 &&
      whiteCircle.x + 30 > 443 &&
      whiteCircle.y + 30 > 430
    ) {
      scene = 'scene2';
    }
  } else if (scene === 'scene2') {
    background('#87CEEB');
    fill('#563517');
    rect(150, 220, 350, 350);
    fill('#563517');
    rect(400, 70, 200, 50);
    fill('#563517');
    rect(250, 495, 500, 10);
    fill('#563517');
    rect(495, 400, 10, 200);
    fill(0, 100, 150);
    rect(245, 440, 490, 100);
    fill(0, 100, 150);
    rect(407, 360, 166, 70);
    fill(112, 255, 3);
    rect(407, 385, 166, 5);
    fill(255, 255, 255);
    image(whiteCircleImage, whiteCircle1.x, whiteCircle1.y, 60, 60); // Replace circle with image

    for (let i = 0; i < blackCircles1.length; i++) {
      fill(0, 0, 0);
      avoidOtherCircles(i);

      if (!whiteCircleOffScreen) {
        moveTowards(whiteCircle1, blackCircles1[i].position, blackCircles1[i].speed);
      } else {
        if (blackCircles1[i].position.y > whiteCircleYMin1) {
          blackCircles1[i].position.y -= 0.5;
        }
      }
      blackCircles1[i].position.x = constrain(blackCircles1[i].position.x, width / 2 - 190, width / 2 + 190);
      blackCircles1[i].position.y = constrain(blackCircles1[i].position.y, initialBlackYMin1, initialBlackYMax1);
      image(blackCircleImage, blackCircles1[i].position.x, blackCircles1[i].position.y, 20, 20);

      // Check for collision with white circle
      let d = dist(whiteCircle1.x, whiteCircle1.y, blackCircles1[i].position.x, blackCircles1[i].position.y);
      let whiteCircleRadius = 30;
      if (d < whiteCircleRadius + 5) { // You can adjust the collision radius
        // Reduce the speed of the white circle
        whiteCircleSpeed -= 0.0005;
        // Ensure it doesn't go negative
        whiteCircleSpeed = max(0, whiteCircleSpeed);
      }
    }

    if (isMovingUp && whiteCircle1.y > whiteCircleYMin1) whiteCircle1.y -= whiteCircleSpeed;
    if (isMovingLeft && whiteCircle1.x > whiteCircleXMin1) whiteCircle1.x -= whiteCircleSpeed;
    if (isMovingDown && whiteCircle1.y < whiteCircleYMax1) whiteCircle1.y += whiteCircleSpeed;
    if (isMovingRight && whiteCircle1.x < whiteCircleXMax1) whiteCircle1.x += whiteCircleSpeed;

    whiteCircle1.y = constrain(whiteCircle1.y, whiteCircleYMin1, whiteCircleYMax1);

    let whiteCircle1Radius = 30;
    let greenRectX = 350;
    let greenRectY = 41;
    let greenRectWidth = 150;
    let greenRectHeight = 350;

    if (
      whiteCircle1.x + whiteCircle1Radius > greenRectX &&
      whiteCircle1.x - whiteCircle1Radius < greenRectX + greenRectWidth &&
      whiteCircle1.y + whiteCircle1Radius > greenRectY &&
      whiteCircle1.y - whiteCircle1Radius < greenRectY + greenRectHeight
    ) {
      scene = 'scene3';
    }
  } else if (scene === 'scene3') {
    background('#87CEEB');
    fill('#563517');
    rect(250, 70, 500, 50);
    fill('#563517');
    rect(250, 400, 500, 200);
    fill('#563517');
    rect(495, 200, 10, 250);
    fill(255, 255, 255);
    image(whiteCircleImage, whiteCircle2.x, whiteCircle2.y, 60, 60); // Replace circle with image
    if (isMovingUp && whiteCircle2.y > whiteCircleYMin2) whiteCircle2.y -= whiteCircleSpeed;
    if (isMovingLeft && whiteCircle2.x > whiteCircleXMin2) whiteCircle2.x -= whiteCircleSpeed;
    if (isMovingDown && whiteCircle2.y < whiteCircleYMax2) whiteCircle2.y += whiteCircleSpeed;
    if (isMovingRight && whiteCircle2.x < whiteCircleXMax2) whiteCircle2.x += whiteCircleSpeed;
    whiteCircle2.y = constrain(whiteCircle2.y, whiteCircleYMin2, whiteCircleYMax2);
    whiteCircle2.x = constrain(whiteCircle2.x, whiteCircleXMin2, whiteCircleXMax2);

    for (let i = 0; i < ghosts.length; i++) {

      for (let j = 0; j < ghosts.length; j++) {
        if (j !== i) {
          let distanceBetweenGhosts = dist(ghosts[i].position.x, ghosts[i].position.y, ghosts[j].position.x, ghosts[j].position.y);
          let minDistance = 40; // Adjust the minimum distance as needed

          if (distanceBetweenGhosts < minDistance) {
            // Calculate a vector to move the ghosts apart
            let avoidVector = p5.Vector.sub(ghosts[i].position, ghosts[j].position);
            avoidVector.normalize();
            avoidVector.mult(0.5);

            // Apply the avoidVector to both ghosts
            ghosts[i].position.add(avoidVector);
            ghosts[j].position.sub(avoidVector);
          }
        }
      }

      let speed = 1.0;
      if (whiteCircle2.x > ghosts[i].position.x) {
        ghosts[i].position.x += speed;
      } else if (whiteCircle2.x < ghosts[i].position.x) {
        ghosts[i].position.x -= speed;
      }

      if (!ghosts[i].isShooting) {
        // Calculate the angle between the ghost and the white circle
        let angle = atan2(whiteCircle2.y - ghosts[i].position.y, whiteCircle2.x - ghosts[i].position.x);
        // Create a vector in the direction of the white circle
        let shootingDirection = p5.Vector.fromAngle(angle);
        // Scale the shooting direction vector to control the bullet speed
        shootingDirection.mult(2.0); // Adjust the speed as needed

        // Create a new bullet and add it to the list
        let bullet = { position: createVector(ghosts[i].position.x, ghosts[i].position.y), velocity: shootingDirection };
        shootBalls.push(bullet);

        // Set a flag to indicate that this ghost is currently shooting
        ghosts[i].isShooting = true;

        // After a delay, reset the shooting flag to allow the ghost to shoot again
        setTimeout(() => {
          ghosts[i].isShooting = false;
        }, 1500); // Adjust the delay as needed
      }

      // Draw the ghosts
      fill(255, 0, 0);
      image(ghostImage, ghosts[i].position.x, ghosts[i].position.y, 40, 40);
    }


    for (let i = shootBalls.length - 1; i >= 0; i--) {
      let bullet = shootBalls[i];
      bullet.position.add(bullet.velocity); // Move the bullet in the specified direction

      // Draw the bullets
      fill(0, 0, 0);
      ellipse(bullet.position.x, bullet.position.y, 10, 10);

      // Check for collision with the white circle
      let distance = dist(whiteCircle2.x, whiteCircle2.y, bullet.position.x, bullet.position.y);
      if (distance < 30) {
        // If a bullet collides with the white circle, remove it from the list
        shootBalls.splice(i, 1);

        // Reduce the speed of the white circle
        whiteCircleSpeed -= 0.07;
        // Ensure it doesn't go negative
        whiteCircleSpeed = max(0, whiteCircleSpeed);
      }
    }

    if (isMovingUp && whiteCircle2.y > whiteCircleYMin2) whiteCircle2.y -= whiteCircleSpeed / 2.5;
    if (isMovingLeft && whiteCircle2.x > whiteCircleXMin2) whiteCircle2.x -= whiteCircleSpeed / 2.5;
    if (isMovingDown && whiteCircle2.y < whiteCircleYMax2) whiteCircle2.y += whiteCircleSpeed / 2.5;
    if (isMovingRight && whiteCircle2.x < whiteCircleXMax2) whiteCircle2.x += whiteCircleSpeed / 2.5;

    whiteCircle2.y = constrain(whiteCircle2.y, whiteCircleYMin2, whiteCircleYMax2);
    whiteCircle2.x = constrain(whiteCircle2.x, whiteCircleXMin2, whiteCircleXMax2);

  }
}

function moveTowards(target, position, speed) {
  let desired = p5.Vector.sub(target, position);
  desired.normalize();
  desired.mult(speed);
  position.add(desired);
}

function avoidOtherCircles(index) {
  for (let j = 0; j < blackCircles.length; j++) {
    if (j !== index) {
      let distance = dist(
        blackCircles[index].position.x,
        blackCircles[index].position.y,
        blackCircles[j].position.x,
        blackCircles[j].position.y
      );
      let minDistance = 20;
      if (distance < minDistance) {
        let avoidVector = p5.Vector.sub(blackCircles[index].position, blackCircles[j].position);
        avoidVector.normalize();
        avoidVector.mult(0.5);
        blackCircles[index].position.add(avoidVector);
      }
    }
  }
  for (let j = 0; j < blackCircles1.length; j++) {
    if (j !== index) {
      let distance = dist(
        blackCircles1[index].position.x,
        blackCircles1[index].position.y,
        blackCircles1[j].position.x,
        blackCircles1[j].position.y
      );
      let minDistance = 20;
      if (distance < minDistance) {
        let avoidVector = p5.Vector.sub(blackCircles1[index].position, blackCircles1[j].position);
        avoidVector.normalize();
        avoidVector.mult(0.5);
        blackCircles1[index].position.add(avoidVector);
      }
    }
  }
}

function keyPressed() {
  if (key === 'W' || key === 'w') {
    isMovingUp = true;
  } else if (key === 'A' || key === 'a') {
    isMovingLeft = true;
  } else if (key === 'S' || key === 's') {
    isMovingDown = true;
  } else if (key === 'D' || key === 'd') {
    isMovingRight = true;
  }
}

function keyReleased() {
  if (key === 'W' || key === 'w') {
    isMovingUp = false;
  } else if (key === 'A' || key === 'a') {
    isMovingLeft = false;
  } else if (key === 'S' || key === 's') {
    isMovingDown = false;
  } else if (key === 'D' || key === 'd') {
    isMovingRight = false;
  }
}


// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder.
// make sure you add and commit the image to the root folder of this repo.
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
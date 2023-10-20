//STINGRAY
let a1 = 103;
let b1 = 471;
let a2 = 253;
let b2 = 284;

let c1 = 400;
let d1 = 450;
let c2 = 400;
let d2 = 450;

let x1, x2, y1, y2;
let testX;
let testY;
let speedX = 50;
let speedY = 50;

//BUBBLES
let circleY = [
  285,
  300,
  230,
  400,
  380,
  263,
  348,
  354,
  440,
  412,
  462,
  258,
  302,
  409,
  470,
];
let circleX = [
  285,
  390,
  340,
  340,
  390,
  355,
  336,
  273,
  390,
  265,
  326,
  244,
  222,
  448,
  447,
];

let circleA = [
  274,
  300,
  230,
  397,
  378,
  256,
  346,
  344,
  435,
  408,
  451,
  249,
  298,
  399,
  462,
];
let circleB = [
  299,
  399,
  349,
  349,
  399,
  360,
  341,
  283,
  397,
  267,
  336,
  251,
  225,
  459,
  455,
];
let ySpd = [];
let xSpd = [];
let yTest = [];
let xTest = [];

//moving bubbles
let bub = 0;

//moving fishes

let f = [];
let g = [];
let speed = [];

//stingray baby position
let babyX1 = 0;
let babyY1 = 0;

let babyX2 = 0;
let babyY2 = 0;

let babyX3 = 0;
let babyY3 = 0;

let babyX4 = 0;
let babyY4 = 0;

//fish babies color change
let color1 = "#EA7442";
let color2 = "#E2D03F";
let color3 = "#F03272";
let color4 = "#A842EA";

//waves
let yoff = 0.0;

function setup() {
  createCanvas(600, 600);

  // noStroke();
  // fill(185, 208, 230);
  // rect(0, 0, 600, 115);

  x1 = width / 4;
  x2 = (width * 3) / 4;
  y1 = height / 2;
  y2 = height / 2;

  //bubbles
  for (let i = 0; i < 15; i++) {
    xSpd.push(random(-3, 3));
    // ySpd.push(random(-2, 2));
    xTest.push(random(-5, 3));
  }

  //moving fishes
  for (let i = 0; i < 3; i++) {
    f[i] = 20 * i;
    g[i] = 120 * i;
    speed[i] = random(0, 2.5);
  }
}

function draw() {
  background(135, 206, 250);

  //noise waves from p5.js reference

  fill("#5092E1");
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0;

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0.5, 3.5, 100, 400);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape();

  let X1Speed = 1.5;

  //baseline-follows the mouse
  testX = mouseX;
  testY = mouseY;

  //exception number 1 mouse==00 go to your center
  if (mouseX == 0 && mouseY == 0) {
    testX = width / 2;
    testY = height / 2;

    fill(0);
    noStroke();
    textSize(18);
    textFont("Montserrat");
    text("use your mouse to move the stingrays", 13, 30);
  }

  //exception number 2 millis>10000

  let msSinceStartofsketch = millis();
  if (msSinceStartofsketch >= 6000) {
    testX = width / 2;
    testY = height / 2 - 100;

    //baby stingray changing color
    if (key == "1") {
      color1 = "#8BDC8F";

      color2 = "#DC5252";

      color3 = "#495FA5";

      color4 = "#C041DD";
    }
    if (key == "2") {
      color1 = "#4A54A1";

      color2 = "#A43636";

      color3 = "#C6A51D";

      color4 = "#27B71F";
    }
    if (key == "3") {
      color1 = "#873999";

      color2 = "#B6DD70";

      color3 = "#E7915D";

      color4 = "#E5E75E";
    }
  }

  // math to go to testX and testY
  x1 += (testX - x1) / speedX;
  y1 += (testY - y1) / speedY;
  x2 += (testX - x2) / speedX;
  y2 += (testY - y2) / speedY;
  // console.log(x1);
  noStroke();
  stingray(x1, y1);
  stingrayright(x2 + 20, y2 + 20);

  //bubbles move left and right
  push();
  for (let i = 0; i < 15; i++) {
    // console.log(circleX[i])
    stroke(71, 131, 189);
    fill("#82BCD4");

    circle(circleX[i], circleY[i], 30);

    stroke(71, 131, 189);
    fill("#EFF7FA");

    circle(circleB[i], circleA[i], 5);
    //circle(circleX[i], circleY[i], 5);

    if (testX == width / 2 && testY == height / 2 - 100) {
    
      //rays goes to the middle
      ySpd[i] += yTest[i];
      xSpd[i] += xTest[i];
      circleX[i] += xSpd[i];
      circleB[i] += xSpd[i];

      //pops put the circles
      let mmsSinceStartofsketch = millis;
      if (msSinceStartofsketch >= 9000 && msSinceStartofsketch < 15000) {
        push();
        strokeWeight(4);
        stroke(250, 160, 30);
        noFill();
        translate(width / 2, height / 2);
        for (let i = 0; i < 100; i++) {
          circle(10, i * 3, 20);
          rotate(frameCount * 0.01);
        }

        pop();

        push();

        stroke("#0E2138");
        strokeWeight(3);
        fill("#9CDEE4");
        textSize(70);
        textFont("Montserrat");
        textStyle(BOLD);
        text("MAGIC", 180, 260);
        text("IS", 270, 315);
        text("HAPPENING !!", 64, 370);

        pop();
      }

      if (msSinceStartofsketch >= 15000 && msSinceStartofsketch < 16000) {
        noStroke();
        stingraybaby(color1, 0, 0);
      }

      if (msSinceStartofsketch >= 16000 && msSinceStartofsketch < 17000) {
        noStroke();
        stingraybaby2(color2, 0, 0);
        stingraybaby(color1, 0, 0);
      }
      if (msSinceStartofsketch >= 17000 && msSinceStartofsketch < 18000) {
        stingraybaby3(color3, 0, 0);
        stingraybaby2(color2, 0, 0);
        stingraybaby(color1, 0, 0);
      }
      if (msSinceStartofsketch >= 18000 && msSinceStartofsketch < 23000) {
        stingraybaby4(color4, 0, 0);
        stingraybaby3(color3, 0, 0);
        stingraybaby2(color2, 0, 0);
        stingraybaby(color1, 0, 0);

        fill(0);
        textSize(18);
        textFont("Montserrat");
        text("press 1,2,3 to change the baby's color", 13, 30);
      }

      if (msSinceStartofsketch >= 23000) {
        babyX4 += 0.1;
        babyY4 += 0.1;
        stingraybaby4(color4, babyX4, babyY4);

        babyX3 -= 0.05;
        babyY3 += 0.1;
        stingraybaby3(color3, babyX3, babyY3);

        babyX2 += 0.1;
        babyY2 += 0.1;
        stingraybaby2(color2, babyX2, babyY2);

        babyX1 -= 0.05;
        babyY1 += 0.1;
        stingraybaby(color1, babyX1, babyY1);
      }
    }
  }
  pop();

  decoration();

  //moving fishes
  fish1();

  fill(255);
  for (let i = 0; i < 3; i++) {
    f[i] += speed[i];
    if (f[i] >= 610) {
      f[i] = 20 * i;
    }
  }

  //up and down bubbles
  let sinOutputC = sin(frameCount * 0.05);

  let circleC = 400 + sinOutputC * 30;

  //up and down bubbles sketch
  stroke(255);
  fill("#89C3D7");
  circle(30, circleC, 25);
  circle(200, circleC - 150, 30);
  circle(537, circleC - 50, 20);
  circle(150, circleC - 90, 25);
  circle(537, circleC + 90, 20);

  circle(59, circleC - 140, 20);
  circle(450, circleC - 160, 25);
  circle(530, circleC - 200, 20);
  circle(130, circleC + 50, 20);

  fill(255);
  circle(35, circleC, 5);
  circle(205, circleC - 155, 4);
  circle(540, circleC - 53, 4);
  circle(155, circleC - 90, 4);
  circle(540, circleC + 90, 4);

  circle(62, circleC - 140, 4);
  circle(455, circleC - 160, 4);
  circle(533, circleC - 200, 4);
  circle(135, circleC + 48, 4);

  bub = bub + 1;

  // fill(0);
  // //   // showing the coordinates of x and y on the canvas
  // text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY);
}
function stingray(x1, y1) {
  push();
  translate(x1, y1);
  //tail
  fill(0);
  beginShape();
  vertex(-59, 127);
  vertex(-42, 134);
  vertex(-81, 237);
  vertex(-59, 127);
  endShape();

  //stingray left
  fill(0);
  beginShape();
  vertex(0, 0);
  vertex(42, 82);
  vertex(-53, 141);
  vertex(-89, 61);
  vertex(0, 0);

  endShape();

  fill(255);
  circle(-51, 49, 20);
  circle(-39, 102, 10);
  circle(-30, 72, 15);
  circle(2, 71, 20);
  circle(-6, 96, 10);
  circle(-67, 85, 15);
  circle(-49, 122, 15);
  circle(-20, 45, 10);
  circle(-23, 68, 10);

  //stingray left eyes
  fill(196, 122, 244);
  circle(12, 28, 20);
  circle(12, 28, 10);
  circle(-32, 19, 20);
  circle(-32, 19, 10);

  pop();
}

function stingrayright(x2, y2) {
  push();
  translate(x2, y2);
  //tail 2
  fill(110, 63, 20);
  beginShape();
  vertex(79, 153);
  vertex(117, 251);
  vertex(57, 156);
  vertex(79, 153);
  endShape();

  //stingray right
  fill(110, 63, 20);
  beginShape();
  vertex(0, 0);
  vertex(100, 24);
  vertex(77, 168);
  vertex(-40, 95);
  vertex(0, 0);

  endShape();

  fill(250, 245, 192);
  circle(-14, 68, 20);
  circle(0, 100, 10);
  circle(19, 66, 15);
  circle(26, 118, 10);
  circle(28, 92, 20);
  circle(44, 36, 15);
  circle(61, 128, 15);
  circle(68, 82, 20);
  circle(70, 44, 20);
  circle(44, 59, 15);

  //stingray right eyes
  fill(196, 122, 244);
  circle(-14, 38, 20);
  circle(-14, 38, 10);
  circle(35, 8, 20);
  circle(35, 8, 10);

  pop();
}

function stingraybaby(color1, x, y) {
  push();

  translate(x, y);
  //stingray babies
  //tail
  // fill(212, 168, 63);
  noStroke();
  fill(color1);
  beginShape();
  vertex(529, 180);
  vertex(540, 180);
  vertex(576, 250);
  vertex(529, 180);
  endShape();

  //body
  fill(color1);
  beginShape();
  vertex(503, 122);
  vertex(500, 165);
  vertex(540, 189);
  vertex(538, 136);
  vertex(503, 122);

  endShape();

  //eyes
  fill(196, 122, 244);
  circle(500, 139, 10);
  fill(0);
  circle(500, 139, 5);
  fill(196, 122, 244);
  circle(519, 124, 10);
  fill(0);
  circle(519, 124, 5);
  pop();
}
function stingraybaby2(color2, x, y) {
  push();

  translate(x, y);
  noStroke();
  fill(color2);
  beginShape();
  vertex(48, 282);
  vertex(58, 286);
  vertex(31, 335);
  vertex(48, 282);
  endShape();

  //body
  fill(color2);
  beginShape();
  vertex(93, 224);
  vertex(38, 248);
  vertex(50, 289);
  vertex(106, 273);
  vertex(93, 224);

  endShape();

  //eyes
  fill(196, 122, 244);
  circle(74, 231, 10);
  fill(0);
  circle(74, 231, 5);
  fill(196, 122, 244);
  circle(97, 239, 10);
  fill(0);
  circle(97, 239, 5);

  pop();
}

function stingraybaby3(color3, x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(color3);
  beginShape();
  vertex(183, 359);
  vertex(197, 368);
  vertex(226, 316);
  vertex(183, 359);
  endShape();

  //body
  fill(color3);
  beginShape();
  vertex(197, 353);
  vertex(133, 365);
  vertex(132, 414);
  vertex(198, 406);
  vertex(197, 353);

  endShape();

  //eyes
  fill(196, 122, 244);
  circle(131, 398, 10);
  fill(0);
  circle(131, 398, 5);
  fill(196, 122, 244);
  circle(147, 413, 10);
  fill(0);
  circle(147, 413, 5);
  pop();
}

function stingraybaby4(color4, x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(color4);
  beginShape();
  vertex(420, 326);
  vertex(420, 337);
  vertex(360, 331);
  vertex(420, 326);
  endShape();

  //body
  fill(color4);
  beginShape();
  vertex(507, 334);
  vertex(464, 300);
  vertex(412, 332);
  vertex(464, 366);
  vertex(507, 334);

  endShape();

  //eyes
  fill(196, 122, 244);
  circle(495, 325, 10);
  fill(0);
  circle(495, 325, 5);
  fill(196, 122, 244);
  circle(495, 345, 10);
  fill(0);
  circle(495, 345, 5);

  pop();
}

function fish1() {
  for (let i = 0; i < 3; i++) {
    push();
    translate(f[i], g[i]);

    //fin 1
    fill(201, 58, 58);
    triangle(70, 181, 40, 165, 40, 195);
    triangle(103, 159, 82, 161, 88, 144);

    //body
    fill(246, 194, 52);
    ellipse(96, 177, 60, 40);

    //fin
    fill(201, 58, 58);
    triangle(82, 176, 95, 171, 95, 180);

    //eyes
    fill(255);
    circle(121, 170, 10);
    fill(0);
    circle(121, 170, 5);

    pop();
  }
}

function decoration() {
  noStroke();
  //seaweed
  fill(43, 117, 28);
  circle(85, 483, 25);
  circle(85, 509, 30);
  circle(85, 534, 25);
  circle(85, 560, 30);
  circle(85, 590, 35);

  fill(43, 117, 28);
  circle(147, 533, 25);
  circle(147, 560, 30);
  circle(147, 584, 20);
  circle(147, 603, 20);

  //cone
  fill(219, 123, 39);

  beginShape();
  vertex(206, 520);
  vertex(240, 520);
  vertex(232, 600);
  vertex(220, 600);
  vertex(206, 520);
  endShape();

  beginShape();
  vertex(257, 472);
  vertex(290, 472);
  vertex(280, 600);
  vertex(270, 600);
  vertex(257, 472);
  endShape();

  beginShape();
  vertex(315, 520);
  vertex(340, 520);
  vertex(330, 600);
  vertex(325, 600);
  vertex(315, 520);
  endShape();

  fill(153, 15, 15);
  circle(210, 510, 20);
  circle(231, 512, 30);
  circle(261, 464, 30);
  circle(278, 460, 30);
  circle(320, 515, 15);
  circle(332, 512, 20);

  //pink cones
  fill(245, 72, 181);
  triangle(443, 537, 472, 537, 459, 601);
  triangle(448, 558, 417, 539, 414, 553);
  triangle(470, 549, 486, 542, 492, 555);

  fill(245, 72, 181);
  triangle(495, 511, 532, 511, 509, 601);
  triangle(500, 544, 471, 517, 465, 531);
  triangle(526, 525, 556, 500, 570, 518);

  //rocks
  fill(99, 94, 94);
  circle(385, 600, 50);
  circle(430, 610, 60);
  circle(23, 610, 70);
}

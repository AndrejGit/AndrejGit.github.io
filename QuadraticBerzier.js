var coords = [
    {x: 30,  y: 370},
    {x: 100, y: 120}, 
    {x: 280, y: 300},
    {x: 370, y: 30}
];

var points = [];
var travellers = [];
var seconders = [];
var painter;

var prog = 0;

var paintLayer;
var lastPoint;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('p5canvas'); // send p5.js canvas into div
  
  paintLayer = createGraphics(width, height);
  paintLayer.stroke(255, 0, 0);
  paintLayer.strokeWeight(2);
  
  //generatePoints(coords) // random starting berzier
  
  let penultimate = coords.length - 1;
  for (i = 0; i < coords.length; i++) {
    let cd = coords[i];
    points[i] = createVector(cd.x, cd.y);
    
    if (i < penultimate) {
      travellers.push(new Traveller(cd.x, cd.y, 10));
    }
  }
  
  for (i = 0; i < 2; i++) {
    let trv = travellers[i].pos;
    seconders.push(new Traveller(trv.x, trv.y, 10));
    seconders[i].colour = color(100, 200, 255); // blue
  }
  
  lastPoint = createVector(points[0].x, points[0].y);
  
  let secPos = seconders[0].pos;
  painter = new Traveller(secPos.x, secPos.y, 10);
  painter.colour = color(255, 0, 0); // red
}

function draw() {
  background(255);
  
  prog += 0.005;
  
  if (prog > 1) {
    paintLayer.clear();
    prog = 0;
    lastPoint.set(points[0]);
  }
  
  for (i = 0; i < travellers.length; i++) {
    let pt = points[i];
    let nextPt = points[i+1];
    
    travellers[i].move(pt, nextPt, prog);
    if (i < 2) {
      trvPos = travellers[i].pos;
      nextPos = travellers[i+1].pos;
      seconders[i].move(trvPos, nextPos, prog);
    }
    
    if (i > 0) { // After first loop
      let trvPos = travellers[i].pos;
      let lastTrv= travellers[i-1].pos;
      let secOne = seconders[0].pos;
      let secTwo = seconders[1].pos;
      stroke(200, 150, 255)
      line(lastTrv.x, lastTrv.y, trvPos.x, trvPos.y);
      stroke(100, 200, 255)
      line(secOne.x, secOne.y, secTwo.x, secTwo.y);
    }
  }
  
  painter.move(seconders[0].pos, seconders[1].pos, prog);
  
  stroke(50);
  
  let paintPos = painter.pos;
  paintLayer.line(lastPoint.x, lastPoint.y, paintPos.x, paintPos.y);
  lastPoint.set(painter.pos);
  image(paintLayer, 0, 0);
  
  for (let i in points) {
    let pt = points[i];
    
    if (i > 0) { // After first loop
      let prevPt = points[i-1];
      line(prevPt.x, prevPt.y, pt.x, pt.y);
    }
  }
  
  for (let pt of points) {
    fill(200);
    ellipse(pt.x, pt.y, 10, 10);
  }
  
  for (let t of travellers) { t.show(); }
  for (let s of seconders) { s.show(); }
  painter.show();
}

function mouseReleased() {
  generatePoints(points);
}

function Traveller(x, y, s) {
  this.pos = createVector(x, y);
  this.s = s;
  this.colour = color(200, 150, 255); // purple
  
  this.move = function(a, b, p) {
    this.pos = p5.Vector.lerp(a, b, p);
  }
  
  this.show = function() {
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.s, this.s);
  }
}

function generatePoints(ps) {
  for (let pnt of ps) {
    pnt.x = random(390) + 10;
    pnt.y = random(390) + 10;
  }
}
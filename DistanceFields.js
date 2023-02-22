var tiles = [];
var points = [];

var pointNum = 5;
var tileNum = 30;
var tileSize;


function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('p5canvas'); // send p5.js canvas into div
  
  tileSize = width/tileNum;
  
  for (i = 0; i < pointNum; i++) {
    points[i] = new Point(createVector(random(width), random(height)));
  }
  
  for (y = 0; y < tileNum; y ++) {
    for (x = 0; x < tileNum; x ++) {
      tiles.push(new Tile(x * tileSize, y * tileSize, tileSize));
    }
  }
}

function draw() {
  background(255);
   
  for (i = 0; i < tiles.length; i ++) {
    let t = tiles[i];
    
    for (j = 0; j < points.length; j++) {
      let p = points[j];
      let cDist = dist(t.x, t.y, p.pos.x, p.pos.y);
      if (cDist < width) { // radius
        t.c += map(cDist, 0, width, 0, tileSize);
      }
    }
    
    t.c /= pointNum; // average
    
    t.show();
  }
  
  for (i = 0; i < points.length; i++) {
    points[i].update();
    //points[i].show();
  }
}


function Tile(x, y, s) {
  this.x = x;
  this.y = y;
  this.s = s;
  
  this.c = s;
  
  this.show = function() {
    stroke(0, 150, 255);
    strokeWeight(2);
    fill(50, 200, 255);
    rect(this.x, this.y, this.s, this.s);
    fill(255, 90, 200);
    noStroke()
    ellipse(this.x + s/2, this.y + s/2, this.c - 5, this.c - 5);
  }
}

function Point(vec) {
  this.pos = vec;
  this.vel = p5.Vector.random2D();
  this.vel.mult(2); // speed
  
  this.update = function() {
    this.pos.add(this.vel);
    
    if (this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height) {
      this.vel.y *= -1;
    }
    if (this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }
  
  this.show = function() {
    fill(0, 200, 0);
    ellipse(this.pos.x, this.pos.y, 10, 10); 
  }
}
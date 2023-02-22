var waveType = { SINE: 1, TRIANGLE: 2, SAW: 3 }
var selWave = waveType.TRIANGLE;
var onIndex = 1;
var buttons = [];

var amp = 50;
var offset;
var freq = 1;
  
var foldThresh = 200; // init well out of range

var mouseDown = false;
var mouseUp = false;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('p5canvas'); // send p5.js canvas into div
  
  background(255);
  
  offset = height/2;
  
  for (i = 0; i < 3; i++) {
    buttons.push(new Button(i * 40 + 145, 350, 30));
  }
  buttons[1].on = true; // triangle on by default
}

function draw() {
  background(50);
  noFill();
  stroke(255);
  
  let ctrlBounds = 50;
  foldThresh = map(mouseY, ctrlBounds, height-ctrlBounds, 0, 50);
  
  if (mouseY < ctrlBounds) {
    foldThresh = 0;
  }
  if (mouseY > height - ctrlBounds) {
    foldThresh = 60;
  }
  
  let y = 0;
  
  beginShape(); //\/\/\/\/\
  
  for (i = 0; i < width; i++) {
    
    y += freq;
    
    switch (selWave) {
      case waveType.SAW:
        if (y > amp) {
          y = -amp;
        }
        break;
        
      case waveType.TRIANGLE:
        if (y > amp || y < -amp) {
          freq *= -1;
        }
        break;
        
      case waveType.SINE:
        y = sin((TWO_PI/100) * i * freq) * amp;
        break;
        
      default:
        break;
    }
    
    // Wavefolding
    if (y > foldThresh) {
      vertex(i, -y + offset + foldThresh * 2); // folded bottom output
    } 
    else if (y < -foldThresh) {
      vertex(i, -y + offset - foldThresh * 2); // folded top output
    } 
    else {
      vertex(i, y + offset); // normal output
    } 
  }
    
  endShape(); //\/\/\/\/\
  
  //line(0, height/2, width, height/2); // center line
  
  // Buttons
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].clicked()) {
      onIndex = i;
      selWave = i + 1;
    }
    
    if (i != onIndex) {
      buttons[i].on = false; // turn off non-selected buttons
    }
  }
  
  for (const i of buttons) {
    i.show();
  }
  
  // Draw button waveforms
  drawSin(buttons[0].x + 7.5, buttons[0].y + 15);
  drawTri(buttons[1].x + 7.5, buttons[1].y + 5);
  drawSaw(buttons[2].x + 7.5, buttons[2].y + 8.5);
  
  mouseUp = false; // reset
}

function mousePressed() {
  mouseDown = true;
}

function mouseReleased() {
  mouseDown = false;
  mouseUp = true;
}

function inRange(start, index, end) {
  return index >= start && index <= end;
}

function Button(x, y, s) {
  this.x = x;
  this.y = y;
  this.s = s;
  
  this.right = x + s;
  this.bottom = y + s;
  
  this.on = false;
  
  this.held = function() {
    return this.hovered(mouseX, mouseY) && mouseDown;
  }
  this.clicked = function() {
    return this.hovered(mouseX, mouseY) && mouseUp;
  }
  
  this.show = function() {
    if (this.hovered(mouseX, mouseY)) { fill(100); } else { noFill(); }
    if (this.held()) { fill(150); }
    if (this.clicked()) { 
      fill(255);
      this.on = true;
    }
    
    if (this.on) { fill(100); }
    
    rect(this.x, this.y, this.s, this.s);
  }
}

Button.prototype.hovered = function(mx, my) { // static function
  return inRange(this.x, mx, this.right) && inRange(this.y, my, this.bottom);
}

function drawSin(x, y) {
  let size = 15;
  let end = x + size;
  
  noFill();
  
  beginShape();
  for(i = 0; i <= size; i++) {
    let v = sin(TWO_PI/size * i) * -size/2.5; 
    vertex(i + x, v + y);
  }
  endShape();
}

function drawTri(x, y) {
  let size = 15;
  line(x, y + size, x + size/2, y + size/3);
  line(x + size/2, y + size/3, x + size, y + size);
}

function drawSaw(x, y) {
  let size = 15;
  line(x, y, x, y + size - 3);
  line(x, y, x + size, y + size - 3);
}
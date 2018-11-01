var voices = [];

function setup() {
  createCanvas(600, 600);
  
  var num = 9;
  
  for (y = 1; y < num; y++) {
    for (x = 1; x < num; x++) {
      let note = random(2000) + 50;
      voices.push(new Voice(x * 60, y * 60, note));
    }
  }
}

function draw() {
  background(255);
  
  for (const i of voices) {
    i.getDist();
    i.play();
    i.show();
  }
}

function Voice(x, y, pitch) {
  this.x = x;
  this.y = y;
  this.pitch = pitch;
  
  let osc = new p5.Oscillator();
  let vol = 0.0;
  osc.setType('sine');
  osc.freq(this.pitch);
  osc.amp(vol);
  osc.start();
  
  let dim = 50;
  
  this.getDist = function() {
    let mouseDist = dist(mouseX, mouseY, this.x, this.y);
    dim = map(mouseDist, 0, 300, 0, 50, true);
    vol = map(mouseDist, 0, 600, 0.0, 0.04, true);
  }
  
  this.play = function() {
    osc.amp(vol, 0.02); // 20ms ramp prevents clicks
  }
  
  this.show = function() {
    fill(0);
    ellipse(this.x, this.y, dim, dim);
  }
}
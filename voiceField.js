var voices = [];
var audioCtx = null;
var audioRunning = false;
var centre = { x: 270, y: 270 };
var target = centre;

function setup() {
  var canvas = createCanvas(550, 550);
  canvas.parent('p5canvas'); // send p5.js canvas into div
  audioCtx = getAudioContext();

  var num = 9;
  
  for (y = 1; y < num; y++) {
    for (x = 1; x < num; x++) {
      let note = random(2000) + 50;
      voices.push(new Voice(x * 60, y * 60, note));
    }
  }

  textSize(18);
  textFont("Arial");
}

function draw() {
  background(255);

  let mouse = { x: mouseX, y: mouseY };

  if (audioRunning) {
    target = mouse;
  } else text("Click to enable audio", 186, 276);
  
  for (const i of voices) {
    i.getDist(target);
    i.play();
    i.show();
  }
}

function mousePressed() {
  if (!audioRunning) {
    audioCtx.resume();
    audioRunning = true;
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
  
  this.getDist = function(target) {
    let mouseDist = dist(target.x, target.y, this.x, this.y);
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


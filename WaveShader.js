var waveShader;

function preload() {
  waveShader = loadShader('WaveShader.vert', 'WaveShader.frag');
}

function setup() {
  var canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('p5canvas'); // send p5.js canvas into div
}

function draw() {
  waveShader.setUniform('u_time', millis() / 1000.0);
  waveShader.setUniform('u_mouse', [mouseX/width, mouseY/height]);
  
  shader(waveShader);
  rect(0, 0, width, height);
}
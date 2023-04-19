var waveShader;

function preload() {
  waveShader = loadShader('WaveShader.vert', 'WaveShader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  waveShader.setUniform('u_time', millis() / 1000.0);
  waveShader.setUniform('u_mouse', [mouseX/width, mouseY/height]);
  
  shader(waveShader);
  rect(0, 0, width, height);
}
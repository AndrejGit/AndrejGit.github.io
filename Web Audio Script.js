var audContext = new AudioContext();
var audioEnabled = false;

var lastX = 0;
var lastY = 0;
var screenStep = 0;
var amp = 0;

var sinOsc = audContext.createOscillator();
var modOsc = audContext.createOscillator();
var gainNode = audContext.createGain();
var modGain = audContext.createGain();
var analyser = audContext.createAnalyser();

sinOsc.type = "sine";
modOsc.type = "sine";

gainNode.gain.value = 0.2;
modGain.gain.value = 1000;

analyser.fftSize = 2048; // default value, here assigned explicitly
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

modOsc.connect(modGain);
modGain.connect(sinOsc.frequency);
sinOsc.connect(gainNode);
sinOsc.connect(analyser);
gainNode.connect(audContext.destination);

modOsc.start(0);
sinOsc.start(0);
//sinOsc.stop();

document.addEventListener("mousemove", function(evt) {
	modOsc.frequency.value = evt.clientX;
	sinOsc.frequency.value = evt.clientY; 
});

function setup() {
	createCanvas(window.innerWidth - 20, window.innerHeight - 20);
	stroke(255);
	
	screenStep = width / bufferLength;
	amp = height/6;

	textFont('Segoe UI');
	textSize(14);
}

function draw() {
	background(40, 40, 41);
	stroke(200);

	analyser.getByteTimeDomainData(dataArray);

	for (i = 0; i < bufferLength; i++) {
		if (i < 1) {
			lastX = 0;
			lastY = (dataArray[i] / 128.0) * amp + height/2 - amp;;
		}
		let y = (dataArray[i] / 128.0) * amp + height/2 - amp;
		line(lastX*screenStep, lastY, i*screenStep, y);
		lastX = i;
		lastY = y;
	}

	if (!audioEnabled) {
		noStroke();
		fill(200);
		text("Click to enable audio", width/2 - 60, height/2 - 2);

		if (audContext.currentTime > 0) {
			audioEnabled = true; // Hide text if audioContext resumed from previous page
		}
	}
}

function mousePressed() {
	if (!audioEnabled) {
		audContext.resume();
		audioEnabled = true;
	}
}
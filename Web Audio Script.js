var audContext = new AudioContext();

var sinOsc = audContext.createOscillator();
var modOsc = audContext.createOscillator();
var gainNode = audContext.createGain();
var modGain = audContext.createGain();

sinOsc.type = "sine";
modOsc.type = "sine";

gainNode.gain.value = 0.2;
modGain.gain.value = 1000;

modOsc.connect(modGain);
modGain.connect(sinOsc.frequency);
sinOsc.connect(gainNode);
gainNode.connect(audContext.destination);

modOsc.start(0);
sinOsc.start(0);
//sinOsc.stop();

document.addEventListener("mousemove", function(evt) {
	modOsc.frequency.value = evt.clientX;
	sinOsc.frequency.value = evt.clientY; 
});
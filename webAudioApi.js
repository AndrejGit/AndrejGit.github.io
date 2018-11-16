var audioCtx = new AudioContext();

function getTime() {
    return audioCtx.currentTime;
}
/*
var nodeSine = audioCtx.createOscillator();
var nodeGain = audioCtx.createGain();

nodeSine.type = "sine";
nodeGain.gain.value = 0.0; // initial volume

// Connections/patching
nodeSine.connect(nodeGain);
nodeGain.connect(audioCtx.destination); // OUT

nodeSine.start(0);
//nodeSine.stop();

function playNote(freq) {
    nodeSine.frequency.value = freq;

    nodeGain.gain.linearRampToValueAtTime(0.0, getTime());
    nodeGain.gain.linearRampToValueAtTime(0.7, getTime() + 0.01);
    nodeGain.gain.linearRampToValueAtTime(0.3, getTime() + 0.02);
    nodeGain.gain.linearRampToValueAtTime(0.0, getTime() + 2);
    nodeGain.gain.linearRampToValueAtTime(0.0, getTime());
} */
var audioCtx = new AudioContext();

var audioEnabled = false;

function getTime() {
    return audioCtx.currentTime;
}

function enableAudio() {
	audioCtx.resume();
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var dt = 0; // Delta Time
var frameEnd = 0;

var currentTime = 0;

var mouse = {x: 0, y: 0};


function loop(time) {
	dt = deltaTime(time);
	currentTime = time;

	draw();

	window.requestAnimationFrame(loop);
}

setup(); // runs once
loop(0); // start time counter at 0

window.addEventListener("mousemove", getCanvasMouse, false);
window.addEventListener("mousedown", mousePressed, false);
window.addEventListener("mouseup", mouseReleased, false);


function deltaTime(t) {
	var frameStart = t;
	var timeEllapsed = frameStart - frameEnd;
	timeEllapsed /= 1000; // convert to seconds
	frameEnd = frameStart;
	return timeEllapsed;
}

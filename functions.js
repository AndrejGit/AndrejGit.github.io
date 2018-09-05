/* Utility Functions */

function canvasSize(w, h) {
	canvas.width = w;
	canvas.height = h;
}

function print(text) {
	console.log(text);
}

/* Mouse Input */

function getCanvasMouse(evt) {
	winMouseX = evt.clientX;
	winMouseY = evt.clientY;
	var canvasRect = canvas.getBoundingClientRect();
	mouse.x = winMouseX - canvasRect.left;
	mouse.y = winMouseY - canvasRect.top;
}

/* Math Functions */

function lerp(start, end, perc) { //Precise method which guarantees v = v1 when t = 1.
	var a = (1 - perc) * start;
	var b = perc * end;
	var position = a + b;
	return position;
}

function dist(x, y, a, b) {
    let w = a - x;
    let h = b - y;

    return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)); // hypotenuse
}

/* Geometry Drawing Functions */

function rect(x, y, w, h) {
	ctx.rect(x, y, w, h);
	ctx.stroke();
}

function circle(x, y, rad, fill = false) {
	ctx.beginPath();
	ctx.arc(x, y, rad, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.stroke();
	if (fill) { ctx.fill(); }
}

function ellipse(x, y, w, h, angle) { // has its own rotation ability
	ctx.beginPath();
	ctx.ellipse(x, y, w, h, angle, 0, Math.PI*2, true);
	ctx.stroke();
}
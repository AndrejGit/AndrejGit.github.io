var mouseUp = false;
var mouseDown = false;

var points = [];
var links = ["PerlinJelly.html", "Web Audio.html", "voiceField.html"];

function setup() {
    canvasSize(600, 400);

	for (i = 1; i < 13; i++) {
		points.push(new WavePoint(i * 45, 300, 8, i));
	}

	for (i = 0; i < links.length; i++) { // Set hyperlink for nodes
		points[i].hLink = links[i];
	}
}

function draw() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.strokeStyle = '#AAAAAA';
    	ctx.lineWidth = 1;
	
	// Draw verticies
	ctx.beginPath();
	for(i = 0; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.stroke();
	
	// move and draw points
	for (i = 0; i < points.length; i++) {
		points[i].update(dt);
		points[i].display();
	}

	mouseUp = false; // reset
}

function mousePressed() {
	mouseDown = true;
	mouseUp = false;
}

function mouseReleased() {
	mouseDown = false;
	mouseUp = true;
}

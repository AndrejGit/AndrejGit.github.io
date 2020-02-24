var mouseUp = false;
var mouseDown = false;

var points = [];

var links = ["PerlinJelly.html", "Wavefolding.html", "QuadraticBerzier.html", 
			 "DistanceFields.html", "voiceField.html", "Web Audio.html"];

var titles = ["Perlin Jelly", "Wavefolding", "Quadratic Berzier",
			  "Distance Fields", "Voice Field", "FM Mouse", "", "", "", "", "", ""];

var helpText = "";

var notes = [440.0, 493.88, 554.37, 587.33, 659.26, 739.99, 830.61, 880.0, 987.77, 1108.7, 1174.7, 1318.5];

var firstHover = false;

function setup() {
    canvasSize(800, 500);

	for (i = 1; i < 13; i++) {
		points.push(new WavePoint(i * 46 + 80, 250, 8, i));
	}

	for (i = 0; i < points.length; i++) {
		points[i].pitch = notes[i];
	}

	for (i = 0; i < links.length; i++) { // Set hyperlink for nodes
		points[i].hLink = links[i];
	}
}

function draw() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.strokeStyle = '#AAAAAA';
	ctx.lineWidth = 1;
	helpText = ""; // hide text by defualt
	if (!audioEnabled && !firstHover) {
		helpText = "Click anywhere to enable audio.";
	}
	
	//rect(0, 0, 800, 500); // canvas border
	
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

		if (points[i].hovered()) {
			helpText = titles[i];
			firstHover = true;
		}
	}

	if (!audioEnabled) {
		ctx.lineWidth = 4;
		let crossSize = 20;
		line(750, 450, 770, 470);
		line(750, 470, 770, 450);
	}

	drawText(helpText);

	mouseUp = false; // reset
}

function mousePressed() {
	mouseDown = true;
	mouseUp = false;

	if (!audioEnabled) {
		enableAudio();
		audioEnabled = true;
	}
}

function mouseReleased() {
	mouseDown = false;
	mouseUp = true;
}

function drawText(txt) {
	ctx.fillStyle = "#909090";
	ctx.font = "14px Segoe UI";
	ctx.fillText(txt, 50, 470);
}

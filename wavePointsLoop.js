var mouseUp = false;
var mouseDown = false;

var points = [];

var links = ["PerlinJelly.html", "Wavefolding.html", "QuadraticBerzier.html", 
			 "DistanceFields.html", "voiceField.html", "Web Audio.html", "Derivative.html", "TileRayCasting.html"];

var titles = ["Perlin Jelly", "Wavefolding", "Quadratic Berzier",
			  "Distance Fields", "Voice Field", "FM Mouse", "Derivative", "Tile Ray Casting", "", "", "", ""];

var helpText = "";

var notes = [440.0, 493.88, 554.37, 587.33, 659.26, 739.99, 830.61, 880.0, 987.77, 1108.7, 1174.7, 1318.5];

var firstHover = false;

function setup() {
    canvas2D.canvasSize(800, 500);

	for (i = 1; i < 13; i++) {
		points.push(new WavePoint(i * 46 + 100, 250, 8, i));
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
	if (!webAudio.audioEnabled && !firstHover) {
		helpText = "Click anywhere to enable audio.";
	}
	
	//canvas2D.rect(0, 0, canvas.width, canvas.height); // canvas border
	
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

	drawText(helpText);

	mouseUp = false; // reset
}

function mousePressed() {
	mouseDown = true;
	mouseUp = false;

	if (!webAudio.audioEnabled) {
		webAudio.enableAudio();
	}
}

function mouseReleased() {
	mouseDown = false;
	mouseUp = true;
}

function drawText(txt) {
	ctx.fillStyle = "#909090";
	ctx.font = "14px Segoe UI";
	ctx.textAlign = "center"
	ctx.fillText(txt, canvas.width/2, 470);
}

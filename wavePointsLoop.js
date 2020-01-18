var mouseUp = false;
var mouseDown = false;

var points = [];
var links = ["PerlinJelly.html", "Web Audio.html", "voiceField.html", "Wavefolding.html"];
var notes = [440.0, 493.88, 554.37, 587.33, 659.26, 739.99, 830.61, 880.0, 987.77, 1108.7, 1174.7, 1318.5];

var resumed = false;

function setup() {
    canvasSize(600, 400);

	for (i = 1; i < 13; i++) {
		points.push(new WavePoint(i * 45, 300, 8, i));
	}

	for (i = 0; i < points.length; i++) {
		points[i].pitch = notes[i];
	}

	for (i = 0; i < links.length; i++) { // Set hyperlink for nodes
		points[i].hLink = links[i];
	}
}

function draw() {
	if (mouseDown && resumed) {
		audioContext.resume(); // allows audio to play when autoplay disabled
		resumed = true;
	}
	
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
	
	if (!audioEnabled) {
		line(500, 200, 530, 230);
		line(500, 230, 530, 200);
	}

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

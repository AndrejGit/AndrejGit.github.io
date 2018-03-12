var canvas =document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var dt = 0; // Delta Time
var frStart = 0;
var frEnd = 0;

canvas.width = 600;
canvas.height = 400; // w, h can be set in the HTML document first if you want

// Setup points
var points = [];
for (i = 1; i < 13; i++) {
	points.push(new WavePoint(i * 45, 300, 8, i));
}

function draw(time) {
	dt = deltaTime(time);

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.strokeStyle = '#AAAAAA';
	ctx.lineWidth = 1;
	
	// Verticies
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

	window.requestAnimationFrame(draw);
}

draw(0); // start time counter at 0


function deltaTime(t) {
	frStart = t;
	let timeEllapsed = frStart - frEnd;
	timeEllapsed /= 1000.; // conver to seconds
	frEnd = frStart;
	return timeEllapsed; 
}
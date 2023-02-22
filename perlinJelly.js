var points = [];
var verts = 32;
var trav = 0.001; // travel offset in 2D noise space

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('p5canvas'); // send p5.js canvas into div
    noFill();
    stroke(255);

    for (i = 0; i < verts; i++) {
        points.push(createVector(0, 0));
    }
}

function draw() {
    background(0);

    trav += 0.001;

    for (i = 0; i < points.length; i++) {
        let unit = TAU/verts;

        // Perlin stuff
        let speed = 2000.0; // speed of point movement
        let phase = millis()/speed; // distance between points 
        let noiseStepX = cos(i * unit + phase) + 1;
        let noiseStepY = sin(i * unit + phase) + 1;
        let noiseOff = perlin(noiseStepX + trav, noiseStepY + trav, 50, 100);

        // Point rotation
        
        points[i].x = cosRotate(unit*i, noiseOff, width/2);
        points[i].y = sinRotate(unit*i, noiseOff, height/2);

        strokeWeight(2);
        ellipse(points[i].x, points[i].y, 10, 10);
    }

    /* Verticies */
    strokeWeight(1);
    beginShape();
    for (i = 0; i < verts; i++) {
        vertex(points[i].x, points[i].y);
    }
    endShape(CLOSE);

    strokeWeight(4);
    ellipse(width/2, height/2, 30, 30); // center
}


/*  Math functions  */
function sinRotate(angle, amp, distance) {
    return sin(angle) * amp + distance;
}

function cosRotate(angle, amp, distance) {
    return cos(angle) * amp + distance;
}

function perlin(xStep, yStep, amp, offset) {
    return noise(xStep, yStep) * amp + offset;
}
var points = [];
var verts = 32;

function setup() {
    createCanvas(600, 600);
    noFill();
    stroke(255);

    for (i = 0; i < verts; i++) {
        points.push(createVector(0, 0));
    }
}

function draw() {
    background(0);

    for (i = 0; i < points.length; i++) {

        // Perlin stuff
        let speed = 2000.0; // speed of point movement
        let dst = 0.1; // distance between points 
        let plStep = millis()/speed + (i*dst);
        let pulseX = pulse(plStep, 50, 100);
        let pulseY = pulse(plStep, 50, 100);

        // Point rotation
        let unit = TAU/verts;
        points[i].x = cosRotate(unit*i, pulseX, 300);
        points[i].y = sinRotate(unit*i, pulseY, 300);

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

function pulse(step, amp, offset) {
    return noise(step) * amp + offset;
}
var points = [];
var tangent;
var negTan;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('p5canvas'); // send p5.js canvas into div
  
  for (i = 0; i <= width; i++) {
    let y = noise(0, i * 0.005) * 300 + 50;
    let p = { x: i, y: y };
    points.push(p);
  }
  
  tangent = createVector(0, 0);
  negTan = createVector(0, 0);
}

function draw() {
  background(220);
  
  let closePts = [];
  
  for (i = 0; i < points.length; i++) {
    // Draw curve
    let pt = points[i];
    if (i > 0) {
      let lastPt = points[i-1];
      stroke(0);
      strokeWeight(1);
      line(lastPt.x, lastPt.y, pt.x, pt.y);
    }
    
    // Get closest points to mouse
    let mouseDist = dist(mouseX, mouseY, pt.x, pt.y);
    if (mouseDist < 30) {
      closePts.push({id: i, mDist: mouseDist});
    }
  }
  
  if (closePts.length > 0) { // if mouse is close to curve
    // Get the single closest point's index
    let closestPointInfo = {id: -1, mDist: 10000};
    
    for (i = 0; i < closePts.length; i++) {
      if (closePts[i].mDist < closestPointInfo.mDist) {
       closestPointInfo = closePts[i];
      }
    }

    // Derivative/Tangent
    if (closestPointInfo.id > 0) { // can't get the derivative of the first point
      let closestPoint = points[closestPointInfo.id];
      let deltaPoint = points[closestPointInfo.id - 1];
      let dx = closestPoint.x - deltaPoint.x;
      let dy = closestPoint.y - deltaPoint.y;
      tangent.set(dx, dy);
      tangent.normalize();
      tangent.mult(30); // line length
      negTan.set(tangent);
      negTan.mult(-1);
      tangent.add(closestPoint.x, closestPoint.y);
      negTan.add(closestPoint.x, closestPoint.y);
      
      strokeWeight(2);
      stroke(0, 0, 255);
      line(closestPoint.x, closestPoint.y, tangent.x, tangent.y);
      line(closestPoint.x, closestPoint.y, negTan.x, negTan.y);
      stroke(0);
      strokeWeight(1);
      fill(255, 0, 0);
      ellipse(closestPoint.x, closestPoint.y, 10, 10);
    }
  }
}
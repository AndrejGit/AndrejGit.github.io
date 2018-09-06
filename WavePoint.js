function WavePoint(x, y, rad, seed) {
	this.x = x;
	this.y = y;
	this.yOff = y;
	this.rad = rad;
	this.seed = seed;

	this.defRad = rad; // default radius
	this.hovRad = rad + 8; // expanded radius

	this.hLink;
	
	/* Interaction methods */
	this.hovered = function() {
		let mDist = dist(mouse.x, mouse.y, this.x, this.y);
		return mDist < this.rad;
	}
	
	this.clicked = function() {
		return this.hovered() && mouseDown;
	}
	
	this.released = function() {
		return this.hovered() && mouseUp;
	}
	
	/* Main methods */
	this.update = function(t) {

		if (this.hovered()) {
			if (this.rad < this.hovRad) { // inflate
				this.rad = lerp(this.rad, this.hovRad, 0.11);
			}
		} else if (this.rad > this.defRad) { // deflate
			this.rad = lerp(this.rad, this.defRad, 0.11);
		}

		// Update wave
		this.y = this.yOff + Math.sin(this.seed) * 50;
		this.seed += 0.5 * t;
	}
	
	this.display = function() {
		// Fill behaviour
		if (this.hovered()) {
			ctx.fillStyle = "#505050";
		} else { ctx.fillStyle = "#282829"; } // dark grey

		if (this.clicked()) {
			ctx.fillStyle = "#707070";
		}
		  
		if (this.released()) {
			ctx.fillStyle = "#FFFFFF"; // white
			window.location.assign(this.hLink); // hyperlink to page
			print(this.hLink);
		}

		ctx.lineWidth = 4;
		circle(this.x, this.y, this.rad, true);
	}
}

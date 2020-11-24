function WavePoint(x, y, rad, seed) {
	this.x = x;
	this.y = y;
	this.yOff = y;
	this.rad = rad;
	this.seed = seed;

	this.defRad = rad; // default radius
	this.hovRad = rad + 8; // expanded radius

	this.hLink = "empty";

	this.bleeped = false;
	this.pitch = 440;

	// Web audio
	this.nodeSine = webAudio.context.createOscillator();
	this.nodeGain = webAudio.context.createGain();
	
	this.nodeSine.type = "sine";
	this.nodeGain.gain.value = 0.0; // initial volume

	// Connections/Patching
	this.nodeSine.connect(this.nodeGain);
	this.nodeGain.connect(webAudio.context.destination); // OUT

	this.nodeSine.start(0);
	
	/* Interaction methods */
	this.hovered = function() {
		let mDist = ut.dist(mouse.x, mouse.y, this.x, this.y);
		return mDist < this.rad;
	}
	
	this.clicked = function() {
		return this.hovered() && mouseDown;
	}
	
	this.released = function() {
		return this.hovered() && mouseUp;
	}

	this.playNote = function(freq) {
		this.nodeSine.frequency.value = freq;
		let now = webAudio.getTime();
		let envTime = 0.0;
		let a = 0.02;
		let s = 0.02;
		let r = 1;
		
		this.nodeGain.gain.cancelScheduledValues(now); // kill env if running
		this.nodeGain.gain.setValueAtTime(0.0, envTime = now);
		this.nodeGain.gain.linearRampToValueAtTime(0.6, envTime += a);
		this.nodeGain.gain.linearRampToValueAtTime(0.2, envTime += s);
		this.nodeGain.gain.linearRampToValueAtTime(0.0, envTime += r);
	}
	
	/* Main methods */
	this.update = function(t) {

		if (this.hovered()) {
			if (this.rad < this.hovRad) { // inflate
				this.rad = ut.lerp(this.rad, this.hovRad, 0.11);
			}
		} else if (this.rad > this.defRad) { // deflate
			this.rad = ut.lerp(this.rad, this.defRad, 0.11);
		}

		// Update wave
		this.y = this.yOff + Math.sin(this.seed) * 50;
		this.seed += 0.5 * t;
	}
	
	this.display = function() {
		// Fill behaviour
		if (this.hovered()) {
			ctx.fillStyle = "#505050";

			if (!this.bleeped) {
				this.playNote(this.pitch);
				this.bleeped = true;
			}
		} else {
			this.bleeped = false; // reset envelope trigger
			ctx.fillStyle = "#282829"; // dark grey
		}

		if (this.clicked()) {
			ctx.fillStyle = "#707070";
		}
		  
		if (this.released()) {
			ctx.fillStyle = "#AAAAAA"; // white
			
			if (this.hLink === "empty") { // node does not have hyperlink
				this.playNote(Math.random() * 90 + 60);
			} else {
				window.location.assign(this.hLink); // hyperlink to page
			}
		}

		ctx.lineWidth = 4;
		canvas2D.circle(this.x, this.y, this.rad, true);
	}
}

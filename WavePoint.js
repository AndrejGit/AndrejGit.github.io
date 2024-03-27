function WavePoint(x, y, rad, seed) {
	this.x = x;
	this.y = y;
	this.yOff = y;
	this.rad = rad;
	this.seed = seed;
	this.speed = 0.5;

	this.defRad = rad; // default radius
	this.hovRad = rad + 8; // expanded radius

	this.hLink = "empty";

	this.bleeped = false;
	this.endOfEnv = 0;
	this.pitch = 440;

	// Web audio
	this.nodeSine = webAudio.context.createOscillator();
	this.nodeGain = webAudio.context.createGain();
	this.delay = webAudio.context.createDelay(5); // Max 5 second delay time
	this.delayGain = webAudio.context.createGain();
	
	this.nodeSine.type = "sine";
	this.nodeGain.gain.value = 0.0; // initial volume
	this.delay.delayTime.value = 0.5; // 500ms
	this.delayGain.gain.value = 0.3;

	// Connections/Patching
	this.nodeSine.connect(this.nodeGain);
	this.nodeGain.connect(webAudio.context.destination); // OUT
	this.nodeGain.connect(this.delay);
	this.delay.connect(this.delayGain);
	this.delayGain.connect(this.delay); // feedback into delay
	this.delayGain.connect(webAudio.context.destination); // OUT

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
		let envStart = now;
		let deClick = 0.02;
		let a = 0.02;
		let d = 0.02;
		let r = 1;
	
		if (this.endOfEnv < now) {
			this.nodeGain.gain.setValueAtTime(0.0, envStart);
			this.nodeGain.gain.linearRampToValueAtTime(0.4, envStart += a);
			this.nodeGain.gain.exponentialRampToValueAtTime(0.1, envStart += d);
			this.nodeGain.gain.linearRampToValueAtTime(0.0, envStart += r);
			this.endOfEnv = envStart + a + d + r;
		} else { // if retriggered while envelope isnt finished
			
			// kill env if running and hold last value to prevent clicks
			try { this.nodeGain.gain.cancelAndHoldAtTime(envStart); }

			// Firefox doesn't support cancelAndHoldAtTime method so clicking is unavoidable
			catch { this.nodeGain.gain.cancelScheduledValues(envStart); }

			this.nodeGain.gain.linearRampToValueAtTime(0.0, envStart += deClick); // ramp to 0 first to avoid clicks
			this.nodeGain.gain.linearRampToValueAtTime(0.4, envStart += a);
			this.nodeGain.gain.exponentialRampToValueAtTime(0.1, envStart += d);
			this.nodeGain.gain.linearRampToValueAtTime(0.0, envStart += r);
			this.endOfEnv = envStart + deClick + a + d + r;
		}
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
		this.seed += this.speed * t;
	}
	
	this.display = function() {
		// Fill behaviour
		if (this.hovered()) {
			ctx.fillStyle = "#505050";

			if (!this.bleeped && webAudio.audioEnabled) {
				this.playNote(this.pitch);
				this.bleeped = true;
			}
		} else {
			this.bleeped = false; // reset envelope trigger
			ctx.fillStyle = "#282828"; // dark grey
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

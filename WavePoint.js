function WavePoint(x, y, rad, seed) {
	this.x = x;
	this.y = y;
	this.yOff = y;
	this.rad = rad;
	this.seed = seed;
	
	this.update = function(t) {
		this.y = this.yOff + Math.sin(this.seed) * 50;
		this.seed += 0.5 * t;
	}
	
	this.display = function() {
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
		ctx.stroke();
	}
}
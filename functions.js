/* Utility Functions */
var ut = {

	print: function(text) {
		console.log(text);
	},

	lerp: function(start, end, perc) { //Precise method which guarantees v = v1 when t = 1.
		var a = (1 - perc) * start;
		var b = perc * end;
		var position = a + b;
		return position;
	},

	dist: function(x, y, a, b) {
		let w = a - x;
		let h = b - y;
	
		return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)); // hypotenuse
	}
}

var canvas2D = { // HTML Canvas drawing functions
	canvasSize: function(w, h) {
		canvas.width = w;
		canvas.height = h;
	},

	line: function(x, y, a, b) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(a, b);
		ctx.stroke();
	},

	rect: function(x, y, w, h) {
		ctx.rect(x, y, w, h);
		ctx.stroke();
	},

	circle: function(x, y, rad, fill = false) {
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.stroke();
		if (fill) { ctx.fill(); }
	},

	ellipse: function(x, y, w, h, angle) { // has its own rotation ability
		ctx.beginPath();
		ctx.ellipse(x, y, w, h, angle, 0, Math.PI*2, true);
		ctx.stroke();
	}
}

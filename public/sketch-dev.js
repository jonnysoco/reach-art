var socket;
var bubbles = [];
var grid = [];
var n = 0;
var s;
var passedn, passeds;
var passedcol;
var passedran;
var img;
var imgs = [];
var dotcolor;
var rancolor;
var totalstyles = 19;
var c0 = "#d71e3d";
var c1 = "#ee0e6e";
var c2 = "#e9d380";
var c3 = "#f6a6c1";
var c4 = "#e8e8ee";
var c5 = "#12aeaa";
var c6 = "#58ad46";
var c7 = "#efdf8e";
var c8 = "#9b7fc1";

function setup() {
	createCanvas(800, 800);
	background(255);
	var dotSize = 40;
	var cols = 10;
	var rows = 10;
	var s = 0;
	var gridSize = 60;
	var n = 0;
	for (var x = gridSize; x <= width - gridSize; x += gridSize) {
		for (var y = gridSize; y <= height - gridSize; y += gridSize) {
			var dotcolor = floor(random(0, totalstyles));
			var b = new Bubble(x, y, n++, dotcolor, s, dotSize);
			bubbles.push(b);
		}
	}
	socket = io.connect();
	socket.on("mouse", newDrawing);
	//console.log("cols = " + cols);
	//sconsole.log("rows = " + rows);
}

function newDrawing(data) {
	passedn = data.n;
	passeds = data.s;
	passedran = data.rancolor;
	paddedcol = data.dotcolor;
	bubbles[passedn].passeds = data.s;
	bubbles[passedn].passedran = data.rancolor;
	bubbles[passedn].passedcol = data.dotcolor;
	// no need for loop
	bubbles[passedn].update();
	console.log("receiving this.passeds " + passeds);
	//console.log("receiving this.passedran " + passedran);
	//console.log("receiving this.passedcol " + paddedcol);
}

function mousePressed() {
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].clicked();
	}
}

function draw() {
	for (var i = bubbles.length - 1; i >= 0; i--) {
		bubbles[i].update();
		bubbles[i].display();
	}
}

function Bubble(x, y, n, c, s, dotS) {
	this.dotSize = dotS;
	this.n = n;
	this.x = x;
	this.y = y;
	//console.log("Bubble this.dotcolor = " + this.dotcolor);
	this.display = function() {
		if (this.passedran) {
			this.dotcolor = this.passedran;
			this.s = this.passeds;
		} else {
			this.s = s;
			//this.rancolor = c;
			//this.dotcolor = c;
		}
		if (this.dotcolor == 0) {
			this.col = c0;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 1) {
			this.col = c1;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 2) {
			this.col = c2;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 3) {
			this.col = c3;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 4) {
			this.col = c4;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 5) {
			this.col = c5;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 6) {
			this.col = c6;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 7) {
			this.col = c7;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 8) {
			this.col = c8;
			fill(this.col);
			stroke(255);
		} else if (this.dotcolor == 9) {
			stroke(c0);
			fill(255);
		} else if (this.dotcolor == 10) {
			stroke(c1);
			fill(255);
		} else if (this.dotcolor == 11) {
			stroke(c2);
			fill(255);
		} else if (this.dotcolor == 12) {
			stroke(c3);
			fill(255);
		} else if (this.dotcolor == 13) {
			stroke(c4);
			fill(255);
		} else if (this.dotcolor == 14) {
			stroke(c5);
			fill(255);
		} else if (this.dotcolor == 15) {
			stroke(c6);
			fill(255);
		} else if (this.dotcolor == 16) {
			stroke(c7);
			fill(255);
		} else if (this.dotcolor == 17) {
			stroke(c8);
			fill(255);
		} else if (this.dotcolor == 18) {
			stroke(c8);
			fill(255);
		} else {
			stroke("#efefef");
			this.col = "#ffffff";
			fill(this.col);
		}
		ellipse(this.x, this.y, this.dotSize, this.dotSize);
	}
	this.clicked = function() {
		this.s = 0;
		this.d = dist(mouseX, mouseY, this.x, this.y);
		if (this.d < this.dotSize / 2) {
			this.rancolor = floor(random(0, totalstyles));
			this.col = this.rancolor;
			fill(this.col);
			ellipse(this.x, this.y, this.dotSize, this.dotSize);
			this.s = 1;
		} else {
			this.s = 0;
		}
		var data = {
			n: this.n,
			s: this.s,
			rancolor: this.rancolor,
			dotcolor: this.dotcolor
		}
		socket.emit("mouse", data);
		console.log("sending this.s " + this.s);
		//console.log("sending this.rancolor " + this.rancolor);
		//console.log("sending this.dotcolor " + this.dotcolor);
	}
	this.update = function() {
		if (this.passeds == 1) {
			this.dotcolor = this.passedran;
		} else {
			this.dotcolor = this.passedcol;
		}
		//console.log("Update this.passeds" + this.passeds);
		//console.log("Update this.rancolor" + this.rancolor);
		//console.log("Update this.dotcolor" + this.dotcolor);
		//noLoop();
	}
}




















































// Console
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function windowResized() {
	//resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

function keyTyped() {
	//if (key == 's' || key == 'S') save("P_2_2_3_01.png");
	//if (key == '1') filled = false;
	//if (key == '2') filled = true;
	// switch draw loop on/off
	//if (key == 'f' || key == 'F') freeze = !freeze;
	//if (freeze == true) noLoop();
	//else loop();
	if (key == 'c') {
		//sliderDotSize.show();
		//sliderSpaceSize.show();
	} else if (key == 'h') {
		//sliderDotSize.hide();
		//sliderSpaceSize.hide();
	}
}
window.onresize = function() {
	//resizeCanvas(windowWidth, windowHeight);
}
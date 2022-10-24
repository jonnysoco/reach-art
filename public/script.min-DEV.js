//https: //javascriptobfuscator.herokuapp.com/
var socket;
var passedx = 180;
var passedy = 180;
var tileCount = 20;
var tileWidth, tileHeight;
var shapeSize = 140;
var shapeAngle = 10;
var newShapeSize = shapeSize;
var maxDist;
var currentShape;
var fillMode = 0;
var sizeMode = 0;

var getX, getY;

var canvas;
var x = 0;
var y = 0;
var targetX;
var targetY;
var myPosX = 0;
var myPosY = 0;
var easing = 0.01;

var rotation = 0;

var pressed = "false";
var newWidth = 660;
var newHeight = 660;

function preload() {
	currentShape = loadImage("shape.svg");
}

function setup() {
	canvas = createCanvas(newWidth, newHeight);
	canvas.parent('canvas-wrap');
	//background(0, 0, 0);
	stroke(0);
	smooth();

	tileWidth = newWidth / floor(tileCount);
	tileHeight = newHeight / floor(tileCount);
	maxDist = sqrt(sq(newWidth) + sq(newHeight));
	//ctx = canvas.drawingContext;
	timerTxt = createP('timer 1');
	timerTxt.position(20, 200);
	textSize(50);
	timerTxt.hide();
	inp1 = createInput('');
	inp1.position(20, 410);
	inp1.hide();





	//sliderR = createSlider(1, 255, 140, 1);
	sliderR = createSlider(1, 255, 143, 1);
	sliderR.size(255);
	sliderR.position(20, inp1.y + 20);
	sliderR.hide();
	inp2 = createInput('');
	inp2.position(20, 450);
	inp2.hide();
	//sliderG = createSlider(1, 255, 133, 1);
	sliderG = createSlider(1, 255, 185, 1);
	sliderG.size(255);
	sliderG.position(20, inp2.y + 20);
	sliderG.hide();
	inp3 = createInput('');
	inp3.position(20, 490);
	inp3.hide();
	//sliderB = createSlider(1, 255, 122, 1);
	sliderB = createSlider(1, 255, 205, 1);
	sliderB.size(255);
	sliderB.position(20, inp3.y + 20);
	sliderB.hide();




	inp4 = createInput('');
	inp4.position(20, 530);
	inp4.hide();
	sliderAlpha = createSlider(1, 100, 100, 1);
	sliderAlpha.size(255);
	sliderAlpha.position(20, inp4.y + 20);
	sliderAlpha.hide();
	inp12 = createInput('');
	inp12.position(20, 580);
	inp12.hide();
	sliderEasing = createSlider(0, 1, .072, .001);
	sliderEasing.size(200);
	sliderEasing.position(20, inp12.y + 20);
	sliderEasing.hide();
	inp13 = createInput('');
	inp13.position(20, 620);
	inp13.hide();
	sliderTileCount = createSlider(1, 100, 11, 1);
	sliderTileCount.position(20, inp13.y + 20);
	sliderTileCount.hide();
	inp14 = createInput('');
	inp14.position(20, 680);
	inp14.hide();
	sliderShapeSize = createSlider(1, 500, 54, 1);
	sliderShapeSize.position(20, inp14.y + 20);
	sliderShapeSize.hide();
	inp5 = createInput('');
	inp5.position(20, 40);
	inp5.hide();
	inp6 = createInput('');
	inp6.position(20, 60);
	inp6.hide();
	inp7 = createInput('');
	inp7.position(20, 80);
	inp7.hide();
	inp8 = createInput('');
	inp8.position(20, 100);
	inp8.hide();
	inp9 = createInput('');
	inp9.position(20, 140);
	inp9.hide();
	inp10 = createInput('');
	inp10.position(20, 160);
	inp10.hide();
	inp11 = createInput('');
	inp11.position(20, 180);
	inp11.hide();
	socket = io.connect();
	socket.on("mouse", newDrawing);
}

function newDrawing(data) {
	passedx = data.x;
	passedy = data.y;
	console.log("receiving passedx " + passedx);
	console.log("receiving passedy " + passedy);
}
var counttx = 0,
	countup = true;

function draw() {
	inp1.value('red: ' + sliderR.value());
	inp2.value('green: ' + sliderG.value());
	inp3.value('blue: ' + sliderB.value());
	inp4.value('alpha: ' + sliderAlpha.value());
	inp12.value('easing: ' + sliderEasing.value());
	inp13.value('tile count: ' + sliderTileCount.value());
	inp14.value('shape size: ' + sliderShapeSize.value());




	//var shapeSize = sliderShapeSize.value();
	var tileCount = sliderTileCount.value();
	var tileWidth = newWidth / floor(tileCount);
	var tileHeight = newHeight / floor(tileCount);
	background(sliderR.value(), sliderG.value(), sliderB.value());
	smooth();
	var easing = sliderEasing.value();




	//console.log("targetX = " + passedx);
	//console.log("targetY = " + passedy);

	//targetX = passedx;
	//targetY = passedy;

	vx = (passedx - x) * easing;
	vy = (passedy - y) * easing;
	x += vx;
	y += vy;




	for (var gridY = 0; gridY < tileCount; gridY++) {
		for (var gridX = 0; gridX < tileCount; gridX++) {


			var posX = tileWidth * gridX + tileWidth / 2;
			var posY = tileHeight * gridY + tileHeight / 2;
			var angle = atan2(y - posY, x - posX) + radians(shapeAngle);
			//console.log("angle = " + angle);
			//console.log("posX = " + posX);
			//console.log("posY = " + posY);
			//console.log("shapeAngle = " + shapeAngle);


			if (sizeMode == 0) {
				newShapeSize = shapeSize;
			}
			// alternate grid
			if (gridY % 2 == 1) {
				push();
				translate(posX, posY);
				rotate(angle);
				imageMode(CENTER);
				//scale(newShapeSize / 100, newShapeSize / 100);
				noStroke();
				shape(currentShape, 0, 0, sliderShapeSize.value(), sliderShapeSize.value());
				pop();
			} else {
				push();
				translate(posX - 30, posY);
				rotate(angle);
				imageMode(CENTER);
				//scale(newShapeSize / 100, newShapeSize / 100);
				noStroke();
				shape(currentShape, 0, 0, sliderShapeSize.value(), sliderShapeSize.value());
				pop();
			}
		}
	}
	tint(255, sliderAlpha.value());
	if (countup) {
		++counttx;
		if (shapeSize >= 230) countup = false;
		shapeSize = shapeSize + .1;
	} else {
		--counttx;
		if (shapeSize <= 140) countup = true;
		shapeSize = shapeSize - .1;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function shape(currentShape, x, y, newShapeSize, newShapeSize) {
	image(currentShape, 0, 0);
	x = 0;
	y = 0;
}

function mousePressed() {
	//getX = mouseX;
	//getY = mouseY;
	pressed = "true";
	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit("mouse", data);
	//console.log("sending getX " + getX);
	//console.log("sending getY " + getY);
}


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function keyTyped() {
	if (key == 's' || key == 'S') save("touch.png");
	if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3;
	if (key == 'g' || key == 'G') {
		tileCount = tileCount + 1;
		if (tileCount > 20) {
			tileCount = 10;
		}
		tileWidth = width / float(tileCount);
		tileHeight = height / float(tileCount);
	}
	if (key == '1') currentShape = loadImage("shape.svg");
	if (key == 't' || key == 'T') {
		timerTxt.show();
	}
	if (key == 'h' || key == 'H') {
		timerTxt.hide();
	}
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		//round(shapeSize += 5);
		timerTxt.show();
		inp1.show();
		inp2.show();
		inp3.show();
		inp4.show();
		inp5.show();
		inp6.show();
		inp7.show();
		inp8.show();
		inp9.show();
		inp10.show();
		inp11.show();
		inp12.show();
		inp13.show();
		inp14.show();
		sliderR.show();
		sliderG.show();
		sliderB.show();
		sliderAlpha.show();
		sliderEasing.show();
		sliderTileCount.show();
		sliderShapeSize.show();
	};
	if (keyCode == DOWN_ARROW) {
		//round(shapeSize = max(shapeSize - 5, 5));
		timerTxt.show();
		inp1.hide();
		inp2.hide();
		inp3.hide();
		inp4.hide();
		inp5.hide();
		inp6.hide();
		inp7.hide();
		inp8.hide();
		inp9.hide();
		inp10.hide();
		inp11.hide();
		inp12.hide();
		inp13.hide();
		inp14.hide();
		sliderR.hide();
		sliderG.hide();
		sliderB.hide();
		sliderAlpha.hide();
		sliderEasing.hide();
		sliderTileCount.hide();
		sliderShapeSize.hide();
	};
	if (keyCode == LEFT_ARROW) {
		round(shapeAngle -= 5);
	};
	if (keyCode == RIGHT_ARROW) {
		round(shapeAngle += 5);
	};
	//console.log('shapeSize = ' + shapeSize);
	//console.log('shapeAngle = ' + shapeAngle);
	//console.log(shapeSize);
}

function windowResized() {
	//resizeCanvas(windowWidth, windowHeight);
}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
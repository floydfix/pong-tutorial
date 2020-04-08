const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const spritesCanvas = document.getElementById("spritesCanvas");
const spritesContext = spritesCanvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// This takes a number in a certain range, and converts that number
// into its matching number in a different range.
const scaleRange = (num, in_min, in_max, out_min, out_max) => {
	return Math.floor((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}

// a simple object to hold x and y position for an object
var Vec = function(x,y) {
	this.x = x;
	this.y = y;
}

let paddleWidth = 10;
let paddleHeight = 100;
let paddleEdgePadding = 30;
let ball;
let leftPaddle;
let rightPaddle;
let playerLeftKey = false;
let playerRightKey = false;
let ballSpeed = 30;
let ballDirection = Math.random() * 360;
let ballVelocityX = ballSpeed;
let ballVelocityY = ballSpeed;

let leftPlayerScore = 0;
let rightPlayerScore = 0;

let gameStarted = false;
let level = -1;

// json to give coordinates of sprites in the sprite sheet
let sprites = {"ball":{sx:0, sy:0, ex:9, ey:9}, "paddle":{sx:0, sy:10, ex:10, ey:110}};

function leftHit() {
	return ball.x <= leftPaddle.x && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight;
}

function leftScore() {
	return ball.x < leftPaddle.x - paddleWidth;
}

function rightHit() {
	return ball.x >= rightPaddle.x && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight;
}

function rightScore() {
	return ball.x > rightPaddle.x + paddleWidth;
}

function draw() {
	// clear out game board
	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);

	// draw the score
	context.fillStyle = '#FFF';
	context.font = '30px serif';
	context.fillText(leftPlayerScore + " | " + rightPlayerScore, width / 2, 30, 140);

	// start instructions
	if (!gameStarted)
		context.fillText("Press Space to start next level, R to restart", width / 2 - 180, 60, 400);

	// get the ball moving
	ball.x += Math.cos(ballDirection * Math.PI / 180) * ballVelocityX;
	ball.y += Math.sin(ballDirection * Math.PI / 180) * ballVelocityY;
	
	// triggered from a score
	if (gameStarted && (leftScore() || rightScore())) {
		if (leftScore())
			rightPlayerScore += 1;
		if (rightScore())
			leftPlayerScore += 1;

		level += 1;
		ballSpeed -= ballSpeed *.50;
		gameOver();
		return false;
	}

	// ball hits the top, bottom,
	if (ball.y <= 0 || ball.y >= height)
		ballVelocityY = -ballVelocityY;

	// ball hits left or right paddle
	if (leftHit() || rightHit()) {
		// reverse the x velocity
		ballVelocityX = -ballVelocityX;
		// change the y velocity depending on where the ball hit the paddle
		let diff = ball.y - (leftHit() ? leftPaddle.y : rightPaddle.y);
		let mod = scaleRange(diff, 0, paddleHeight, 0, 5);
		ballVelocityY = ballVelocityY + mod;
	}
	
	// braw ball
	drawSprite("ball", ball.x, ball.y);

	// move the right paddle and keep it in bounds
	if (playerRightKey != false) {
		if (playerRightKey == "up") {
			rightPaddle.y -= 10;
		}
		if (playerRightKey == "down") {
			rightPaddle.y += 10;
		}
		if (rightPaddle.y < 0) {
			rightPaddle.y = 0;
		}
		if (rightPaddle.y > height - paddleHeight) {
			rightPaddle.y = height - paddleHeight;
		}
	}

	// move the left paddle and keep it in bounds
	if (playerLeftKey != false) {
		if (playerLeftKey == "up") {
			leftPaddle.y -= 10;
		}
		if (playerLeftKey == "down") {
			leftPaddle.y += 10;
		}
		if (leftPaddle.y < 0) { 
			leftPaddle.y = 0;
		}
		if (leftPaddle.y > height - paddleHeight) {
			leftPaddle.y = height - paddleHeight;
		}
	}
	// draw left paddle
	drawSprite("paddle", leftPaddle.x, leftPaddle.y);

	// draw right paddle
	drawSprite("paddle", rightPaddle.x, rightPaddle.y);
}

function drawSprite(name, x, y) {
	// get the sprite object named (name) and uses the coordinates inside it
	// to place that sprite at x and y
	let sprite = sprites[name];
	let spriteWidth = (sprite.ex - sprite.sx) + 1;
	let spriteHeight = (sprite.ey - sprite.sy) + 1;
	// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
	context.drawImage(spritesCanvas, sprite.sx, sprite.sy, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
}

// main game loop
let elapsedTime = 0;
let lastTime = 0;
function loop(time) {
	if (lastTime == 0) {
		draw();
		lastTime = time;
	}
	elapsedTime += time - lastTime;
	if (elapsedTime > 10) {
		draw()
		elapsedTime = 0;
	}
	lastTime = time;

	if (gameStarted)
		requestAnimationFrame(loop);
}

document.addEventListener("keydown", event => {
	switch (event.keyCode) {
		// space bar
		case 32:
		if (!gameStarted)
			startGame();
		break;

		// R
		case 82:
		if (!gameStarted)
			startGame(0);
		break;

		// right up 'arrow up'
		case 38:
		playerRightKey = "up";
		break;

		// right down 'arrow down'
		case 40:
		playerRightKey = "down";
		break;

		// left up 'w'
		case 87:
		playerLeftKey = "up";
		break;

		// left down 's'
		case 83:
		playerLeftKey = "down";
		break;
	}
});

document.addEventListener("keyup", event => {
	switch (event.keyCode) {
		// right up 'arrow up'
		case 38:
		playerRightKey = false;
		break;

		// right down 'arrow down'
		case 40:
		playerRightKey = false;
		break;

		// left up 'w'
		case 87:
		playerLeftKey = false;
		break;

		// left down 's'
		case 83:
		playerLeftKey = false;
		break;
	}
});

function startGame(lvl = level) {
	if (lvl == 0) {
		leftPlayerScore = 0;
		rightPlayerScore = 0;
	}

	ballSpeed = 3 + (.5 * lvl);
	ballVelocityX = ballSpeed;
	ballVelocityY = ballSpeed;

	gameStarted = true;
	requestAnimationFrame(loop);
}

function gameOver() {
	// set the ball to the middle of the screen
	ball = new Vec(width / 2, height / 2);

	// All of this ballDirection code is to keep the ball 
	// from bouncing too up or down to start
	let choice = Math.floor(Math.random() * Math.floor(2));
	if (choice == 0) {
		Math.floor(Math.random() * Math.floor(2)) == 0 ? 
			ballDirection = (Math.random() * 36) :
			ballDirection = (Math.random() * 361) + 325 ;	
	}
	else {
		ballDirection = (Math.random() * 75) + 145;
	}

	// set the paddles to the middle on the edges
	leftPaddle = new Vec(paddleEdgePadding, height / 2 - (paddleHeight / 2));
	rightPaddle = new Vec(width - paddleWidth - paddleEdgePadding, height / 2 - (paddleHeight / 2));
	
	// reset level and other values
	playerLeftKey = false;
	playerRightKey = false;
	level += 1;
	gameStarted = false;

	// do one loop to redraw everything
	requestAnimationFrame(loop);
}

// This is a helper to load an image asyncronously
function loadImage(url) {
	return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

async function loadTiles() {
	tilesImg = await loadImage("./img/sprites.png");
	spritesContext.drawImage(tilesImg, 0, 0);
}

loadTiles();

gameOver();

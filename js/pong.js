const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 10;
const width = canvas.width / scale;
const height = canvas.height / scale;
var Vec = function(x,y) {
	this.x = x;
	this.y = y;
}
let ball = new Vec(width / 2, height / 2);
let leftPaddle = new Vec(3, height / 2 - 5);
let rightPaddle = new Vec(width - 3,height / 2 - 5);
let playerLeftKey = false;
let playerRightKey = false;

context.scale(scale, scale);

let ballSpeed = .3;
let ballDirection = Math.random() * 360;
let ballVelocityX = ballSpeed;
let ballVelocityY = ballSpeed;

let leftPlayerScore = 0;
let rightPlayerScore = 0;

let gameStarted = false;
let level = -1;

function leftHit() {
	return ball.x <= leftPaddle.x && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + 10;
}

function leftScore() {
	return ball.x < leftPaddle.x - 1;
}

function rightHit() {
	return ball.x >= rightPaddle.x && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + 10;
}

function rightScore() {
	return ball.x > rightPaddle.x + 1;
}

function draw() {
	// clear out game board
	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);
	
	context.fillStyle = '#FFF';
	context.font = '3px serif';
	context.fillText(leftPlayerScore + " | " + rightPlayerScore, width / 2, 4, 140);

	if (!gameStarted)
		context.fillText("Press Space to start next level, R to restart", 20, 7, 140);

	ball.x += Math.cos(ballDirection * Math.PI / 180) * ballVelocityX;
	ball.y += Math.sin(ballDirection * Math.PI / 180) * ballVelocityY;
	
	if (gameStarted && (leftScore() || rightScore())) {
		if (leftScore())
			rightPlayerScore += 1;
		if (rightScore())
			leftPlayerScore += 1;

		level += 1;
		ballSpeed -= ballSpeed *.20;
		gameOver();
		return false;
	}

	if (ball.x <= 0 || ball.x >= width || ball.y >= height || ball.y <= 0 || leftHit() || rightHit()) {			
		if (ball.x <= 0 || ball.x >= width || leftHit() || rightHit())
			ballVelocityX = -ballVelocityX;
		if (ball.y <= 0 || ball.y >= height)
			ballVelocityY = -ballVelocityY;
	}
	
	// ball
	context.fillStyle = '#FF0000';
	context.fillRect(ball.x, ball.y, 1, 1);

	if (playerRightKey != false) {
		if (playerRightKey == "up") {
			rightPaddle.y -= 1;
		}
		if (playerRightKey == "down") {
			rightPaddle.y += 1;
		}
		if (rightPaddle.y < 0) {
			rightPaddle.y = 0;
		}
		if (rightPaddle.y > height - 10) {
			rightPaddle.y = height - 10;
		}
	}

	if (playerLeftKey != false) {
		if (playerLeftKey == "up") {
			leftPaddle.y -= 1;
		}
		if (playerLeftKey == "down") {
			leftPaddle.y += 1;
		}
		if (leftPaddle.y < 0) { 
			leftPaddle.y = 0;
		}
		if (leftPaddle.y > height - 10) {
			leftPaddle.y = height - 10;
		}
	}
	// left paddle
	context.fillStyle = '#00FF00';
	context.fillRect(leftPaddle.x, leftPaddle.y, 1, 10);

	// right paddle
	context.fillStyle = '#0000FF';
	context.fillRect(rightPaddle.x, rightPaddle.y, 1, 10);
}

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
	console.log(event.keyCode);
	switch (event.keyCode) {
		case 32:
		if (!gameStarted)
			startGame();
		break;

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
	console.log(event.keyCode);
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

	ballSpeed = .3 + (.05 * lvl);
	ballVelocityX = ballSpeed;
	ballVelocityY = ballSpeed;

	gameStarted = true;
	requestAnimationFrame(loop);
}

function gameOver() {
	ball = new Vec(width / 2, height / 2);
	ballDirection = Math.random() * 360;
	leftPaddle = new Vec(3, height / 2 - 5);
	rightPaddle = new Vec(width - 3,height / 2 - 5);
	playerLeftKey = false;
	playerRightKey = false;
	
	level += 1;
	gameStarted = false;
	requestAnimationFrame(loop);
}

gameOver();

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
context.scale(scale, scale);

function draw() {
	// clear out game board
	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);

	// ball
	context.fillStyle = '#FF0000';
	context.fillRect(ball.x, ball.y, 1, 1);

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
		lastTime = time;
	}
	elapsedTime += time - lastTime;
	if (elapsedTime > 100) {
		draw();
		elapsedTime = 0;
	}
	lastTime = time;
	requestAnimationFrame(loop);
}

document.addEventListener("keydown", event => {
	console.log(event.keyCode);
	switch (event.keyCode) {
		// right up 'arrow up'
		case 38:
		rightPaddle.y -= 1;
		break;

		// right down 'arrow down'
		case 40:
		rightPaddle.y += 1;
		break;

		// left up 'w'
		case 87:
		leftPaddle.y -= 1;
		break;

		// left down 's'
		case 83:
		leftPaddle.y += 1;
		break;
	}
});

requestAnimationFrame(loop);
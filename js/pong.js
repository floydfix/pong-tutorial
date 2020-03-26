const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 10;
const width = canvas.width / scale;
const height = canvas.height / scale;
let leftPaddleY = height / 2 - 5;
let rightPaddleY = height / 2 - 5;

context.scale(scale, scale);

function draw() {
	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);

	// ball
	context.fillStyle = '#FF0000';
	context.fillRect(width / 2, height / 2, 1, 1);

	// left paddle
	context.fillStyle = '#00FF00';
	context.fillRect(3, leftPaddleY, 1, 10);

	// right paddle
	context.fillStyle = '#0000FF';
	context.fillRect(width - 3, rightPaddleY, 1, 10);
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
		// right up
		case 38:
		rightPaddleY -= 1;
		break;

		// right down
		case 40:
		rightPaddleY += 1;
		break;

		// left up
		case 81:
		leftPaddleY -= 1;
		break;

		// left down
		case 65:
		leftPaddleY += 1;
		break;
	}
});

requestAnimationFrame(loop);
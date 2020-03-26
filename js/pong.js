const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 10;
const width = canvas.width / scale;
const height = canvas.height / scale;

context.scale(scale, scale);

function draw() {
	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);

	// ball
	context.fillStyle = '#FF0000';
	context.fillRect(width / 2, height / 2, 1, 1);

	// left paddle
	context.fillStyle = '#00FF00';
	context.fillRect(3, height / 2 - 5, 1, 10);

	// right paddle
	context.fillStyle = '#0000FF';
	context.fillRect(width - 3, height / 2 - 5, 1, 10);
}

let elapsedTime = 0;
let lastTime = 0;
function loop(time) {
	if (lastTime == 0) {
		lastTime = time;
	}
	elapsedTime += time - lastTime;
	if (elapsedTime > 500) {
		draw();
		elapsedTime = 0;
	}
	lastTime = time;
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
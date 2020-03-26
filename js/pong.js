const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 10;

context.scale(scale, scale);
context.fillStyle = '#000000';
context.fillRect(0, 0, canvas.height, canvas.width);

function draw() {
	context.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	context.fillRect(Math.floor((Math.random() * 90)), Math.floor((Math.random() * 60)), 1, 1);
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
	}
	lastTime = time;
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
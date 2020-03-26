Pong tutorial

# Step 1
   a) Create all of the base folders and files for the web site that will be the base to display the game.
```
	pong
	  |_ js
	  |   |_ pong.js
	  |_ css
	  |   |_ pong.css
	  |
	  |_ _ _ pong.html
```

   b) Notice what the pong.html page requires to be an html page. This is the same for any new webpage.
```
	<!DOCTYPE html>
	<html lang="en"> 
		<head> 
			<meta http-equiv="content-type" content="text/html; charset=utf-8">
			<title>Pong</title>
		</head> 
		<body> 
		</body> 
	</html>
```

   c) Then, check out the different ways to link your css and javascript files to your html page
```
	<link rel="stylesheet" type="text/css" href="css/pong.css"> 
	<script src="js/pong.js"></script>
```

# Step 2
   a) Since we do not want our javascript file to start running until are the DOM elements are finished, lets move the script tag so that it is in the body, and we will put any other new elements ABOVE this so that it is always at the BOTTOM.
```
	<body>
	  	<script src="js/pong.js"></script>
	</body> 
```

   b) Create the canvas code. To the html, add the DOM for canvas.
```
	<body>
		<canvas id="gameCanvas" height="600" width="900"></canvas>

		...
	</body>
```
   c) To the pong.js, add the initialization. Notice we are using const for these variables. Remember, this is just a way to make sure that the value never changes, it is constant. 
   For scale we are using 10, which means that later when we want to draw a simple square we can just draw 1 by 1 and it will show up as 10 by 10 on our canvas.
   Then we just fill the entire canvas with black #000000

```javascript
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 10;

context.scale(scale, scale);
context.fillStyle = '#000000';
context.fillRect(0, 0, canvas.height, canvas.width);
```

   EXTRA) colors can be represented in HEX code by doing # + (Red value from 00 - FF in HEX) + (Green value from 00 - FF in HEX) + (Blue value from 00 - FF in HEX)
   So... Red is #FF0000, Green is #00FF00, Blue is #0000FF, Black is #000000, What is white?

# Step 3
   a) Create the main game loop. To start our game timer we call requestAnimationFrame with a function that we want called when this happens. requestAnimationFrame passes in the current time which we can use to find out how much time has elapsed since we were last here. Notice we don't have a function called draw yet.
```javascript
function loop(time) {
	draw();
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
```

   b) The way that we have written the loop we would get a call to draw every frame of animation (60 a second) so we should slow it down a bit. Lets add some code that will count milliseconds and only call draw every 500 milliseconds (half of a second);
```javascript
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
```

   c) Create the function draw(). This is the function we are going to use to draw the screen as it currently looks. If you run the code now, nothing happens, so lets have some fun.
```javascript
function draw() {
	
}
```

   EXTRA) Try to figure out what this is going to do before you run it
```javascript
function draw() {
	context.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	context.fillRect(Math.floor((Math.random() * 90)), Math.floor((Math.random() * 60)), 1, 1);	
}
```

# Step 4
   a) Lets make some constants for us to use
```javascript
const width = canvas.width / scale;
const height = canvas.height / scale;
```

   b) Now we can draw all of the items for the game board. First, lets move the code that draws the game board black, into the draw method.

```javascript
function draw() {
	context.fillStyle = '#000000';
	context.fillRect(0, 0, width, height);
```
   
   c) Then we can draw the items for the game
```javascript
// ball
context.fillStyle = '#FF0000';
context.fillRect(width / 2, height / 2, 1, 1);

// left paddle
context.fillStyle = '#00FF00';
context.fillRect(3, height / 2 - 5, 1, 10);

// right paddle
context.fillStyle = '#0000FF';
context.fillRect(width - 3, height / 2 - 5, 1, 10);
```

# Step 5
   a) Now we need some inputs to move the paddles. Add this to the pong.js. Then, when you refresh the page, you should be able to see the keyCode of any key you press in the console.
```javascript
document.addEventListener("keydown", event => {
	console.log(event.keyCode);
});
```

   b) Choose an up and down key for each paddle to use (4 keys), mark them down as comments in your code like below.
```javascript
// 38 = up arrow, 40 = down arrow
```

   c) Change the eventListener code to use these values
```javascript
document.addEventListener("keydown", event => {
	console.log(event.keyCode);
	switch (event.keyCode) {
		// right up
		case 38:
		break;

		// right down
		case 40:
		break;

		// left up
		case 81:
		break;

		// left down
		case 65:
		break;
	}
});
```

   d) Now, we need something to change when our key presses happen. So add some lets for us to use.
```javascript
let leftPaddleY = height / 2 - 5;
let rightPaddleY = height / 2 - 5;

```
   
   e) And change the draw code to use the new variables.
```javascript
// ball
context.fillStyle = '#FF0000';
context.fillRect(width / 2, height / 2, 1, 1);

// left paddle
context.fillStyle = '#00FF00';
context.fillRect(3, leftPaddleY, 1, 10);

// right paddle
context.fillStyle = '#0000FF';
context.fillRect(width - 3, rightPaddleY, 1, 10);
```

   f) Change the eventListener code again to use these values
```javascript
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
```
   g) AND lets change the wait time to something lower like 100.
```javascript
if (elapsedTime > 100) {
...
```

# STEP SIX

	a) The first step may seem like a lot of code, but what we're going to do now is called a refactor.
	We are going to introduce creating an object in javascript by passing values into a function.
	Add the code below into your code up before the variables leftPlayerX, leftPlayerY etc...
```javascript
var Vec = function(x,y) {
	this.x = x;
	this.y = y;
}
```
	If you look at that code, it is a function that accepts 2 variables for x and y and stores them 
	so you can carry them around together, and use them in special math functions later, and access
	them like this...
```javascript
let ballPosition = new Vec(100, 200);
console.log(ballPoosition.x); // logs 100
console.log(ballPoosition.y); // logs 200
```
	So, the first thing we should change is right under where we put this new Vec function.
	Lets change our x and y varibles into one thing for each player
```javascript
let leftPaddle = new Vec(3, height / 2 - 5);
let rightPaddle = new Vec(width - 3,height / 2 - 5);
```
	And let's add one for the ball
```javascript
let ball = new Vec(width / 2, height / 2);
```
	And then refactor the draw function and the keyDown switch statement with the updated variable names
```javascript
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
```

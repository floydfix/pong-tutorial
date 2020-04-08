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

# Step 6

	a) This step may seem like a lot of code for no reason, but what we're going to do 
	now is called a refactor. First, We are going to introduce creating an object in 
	javascript by passing values into a function.
	
	Add the code below into your code before the variables leftPlayerX, leftPlayerY etc...
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

# Step 7
	
	One more quick refactor, so that both players can move thier players at the same time.
	Add these two variables to pong.js
```javascript
let playerLeftKey = false;
let playerRightKey = false;
```

	Refactor the key down event listener to the following
```javascript
document.addEventListener("keydown", event => {
	console.log(event.keyCode);
	switch (event.keyCode) {
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
```
	And add a keyup event listener
```javascript
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
```

	Then we need to replace the "moving" code. In the draw function, before you draw the paddles,
	put in the following code to update the position of the paddles
```javascript
if (playerRightKey != false) {
	if (playerRightKey == "up") {
		rightPaddle.y -= 1;
	}
	if (playerRightKey == "down") {
		rightPaddle.y += 1;
	}
	// make sure it stays on the screen
	if (rightPaddle.y < 0) {
		rightPaddle.y = 0;
	}
	// make sure it stays on the screen
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
	// make sure it stays on the screen
	if (leftPaddle.y < 0) {
		leftPaddle.y = 0;
	}
	// make sure it stays on the screen
	if (leftPaddle.y > height - 10) {
		leftPaddle.y = height - 10;
	}
}
```

	Time to make the ball move! Are you excited?! add these variables
```javascript
let ballSpeed = .3;
let ballDirection = Math.random() * 360;
let ballVelocityX = ballSpeed;
let ballVelocityY = ballSpeed;
```
	
	In the draw function before drawing the ball, add this code to determine how the ball should move.
	These are pretty cool math functions that you should look into if you're interested.
	SIN() pronounced sign, and COS() pronounced co-sign. And when the ball hits the wall, it should 
	reverse its velocity in the direction it is hitting the wall.
```javascript
ball.x += Math.cos(ballDirection * Math.PI / 180) * ballVelocityX;
ball.y += Math.sin(ballDirection * Math.PI / 180) * ballVelocityY;

if (ball.x <= 0 || ball.x >= width || ball.y >= height || ball.y <= 0) {			
	if (ball.x <= 0 || ball.x >= width)
		ballVelocityX = -ballVelocityX;
	if (ball.y <= 0 || ball.y >= height)
		ballVelocityY = -ballVelocityY;
}
```

# Step 8

	Now that we have the ball bouncing off of walls, we can add bouncing off of the paddles.
	Add the variables and the four functions below. This code will help us tell if the ball
	goes past or hits the paddles.
```javascript
let leftPlayerScore = 0;
let rightPlayerScore = 0;
let gameStarted = false;
let level = -1;

function leftHit() {
	return ball.x <= leftPaddle.x && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + 10;
}

function rightHit() {
	return ball.x >= rightPaddle.x && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + 10;
}

function leftScore() {
	return ball.x < leftPaddle.x - 1;
}

function rightScore() {
	return ball.x > rightPaddle.x + 1;
}
```

	And update this part of the draw() function to add the new functions we just added
```javascript
if (ball.x <= 0 || ball.x >= width || ball.y >= height || ball.y <= 0 || leftHit() || rightHit()) {			
	if (ball.x <= 0 || ball.x >= width || leftHit() || rightHit())
		ballVelocityX = -ballVelocityX;
	if (ball.y <= 0 || ball.y >= height)
		ballVelocityY = -ballVelocityY;
}
```

	Add this directly above the last part of code INSIDE the draw() function. This will display
	the score and stops the game if someone scores
```javascript
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
```

	Add this to your switch statement inside the keydown listener
```javascript
	case 32:
	if (!gameStarted)
		startGame();
	break;

	case 82:
	if (!gameStarted)
		startGame(0);
	break;
```

	Then at the bottom of your javascript file replace the line that says...
```javascript
requestAnimationFrame(loop);
```

	With this. All this does is reset all of the variables for the ball and paddles, and create a
	scenario where pressing the space button or r will actually start the game.
```javascript
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
```

# Step 9
	For the next part, we need to create some variables to store some information that we are
	using multiple times in our application, and will help it become easier adaptable in the future.
	To start, get rid of these old variables
```javascript
	let ball = new Vec(width / 2, height / 2);
	let leftPaddle = new Vec(3, height / 2 - 5);
	let rightPaddle = new Vec(width - 3,height / 2 - 5);
	let ballSpeed = .3;
```
```javascript
	let paddleWidth = 10;
	let paddleHeight = 100;
	let paddleEdgePadding = 30;
	let ball;
	let leftPaddle;
	let rightPaddle;
	let ballSpeed = 30;
```

	Now, we need ot get rid of anything that has to do with scale. In the past we were using scale
	to make items on our canvas look bigger than they should, but now we want everything to be
	pixel perfect.

	Start by removing
```javascript
	const scale = 10;

	...

	context.scale(scale, scale);
```
	
	Then, change the next two constants to look like they do below
```javascript
	const width = canvas.width;
	const height = canvas.height;
```
	In the hit() and score() functions, you should be able to replace the numbers 1 and 10 with
	the new variables you made paddleWidth and paddleHeight

```javascript
	function leftHit() {
		return ball.x <= leftPaddle.x && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight;
	}

	// Change 3 more functions ...
```

	Further down in the draw function, before we draw the paddles, we also use 10 and should
	change that to paddleHeight 

```javascript
	if (rightPaddle.y > height - paddleHeight) {
		rightPaddle.y = height - paddleHeight;
	}

	// Change in both places !
```


	Then in those same places we move the paddle by 1, we should change that to a variable,
	and then use that variable there.
```javascript
	let paddleStep = 10;

	if (playerRightKey == "up") {
		rightPaddle.y -= paddleStep;
	}

	// Change in 3 more places
```

	Lastly, in the draw() function, we need to change the lines that print out the score and
	instructions, since we changed the scale.

```javascript
	context.font = '30px serif';
	context.fillText(leftPlayerScore + " | " + rightPlayerScore, width / 2, 30, 140);
	if (!gameStarted)
		context.fillText("Press Space to start next level, R to restart", width / 2 - 180, 60, 400);

	// ... later in the draw function

	ballSpeed -= ballSpeed *.50;
```

	Ok, now for the sprites, instead of drawing big dots for everything.
	The first thing you'll need is a folder to put any images. Your folder structure should look something like this after.
```
	pong
	  |_ js
	  |   |_ pong.js
	  |
	  |_ css
	  |   |_ pong.css
	  |
	  |_ img
	  |	  
	  |_ _ _ pong.html
```
	
	Download the image from the main branch, inside the img folder, called sprites.png, 
	and put it in your img folder.


	Now we need a place to store that image to work with it. In your html file, add a new canvas
	like the one below anywhere in the body.

```
	<canvas style="display:none;" id="spritesCanvas"></canvas>
```
	Notice we're asking the browser to not show this new canvas.

	Then, in the javascript file, we need to add variables to use the new canvas

```javascript
	const spritesCanvas = document.getElementById("spritesCanvas");
	const spritesContext = spritesCanvas.getContext("2d");
```

	Somewhere before the call to gameOver(); at the bottom of your js file, you need to
	add the following code. It handles loading the sprite sheet into the canvas that we just
	created, so that we can use it later.

```javascript
	// This is a helper to load an image asyncronously
	function loadImage(url) {
		return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
	}

	async function loadTiles() {
		tilesImg = await loadImage("./img/sprites.png");
		spritesContext.drawImage(tilesImg, 0, 0);
	}

	loadTiles();
```

	Lets create a variable that is a JSON object that describes the coordinates of the two
	different sprites in the sprite sheet. for the drawing function to work we need to know
	the x,y start and the x,y end of each sprite
```javascript
	let sprites = {"ball":{sx:0, sy:0, ex:9, ey:9}, "paddle":{sx:0, sy:10, ex:10, ey:110}};
```
	
	If you look at the variable, it is an object with 2 objects inside (ball, paddle), that
	each have 4 variables in them (sx, sy, ex, ey), that describe the coordinates of the 
	sprite in that name.

	Let's create a function to handle the drawing of the sprite for us that takes the name
	of the sprite and the x and y position to draw it at.

```javascript
	function drawSprite(name, x, y) {
		// get the sprite object named (name) and uses the coordinates inside it
		// to place that sprite at x and y
		let sprite = sprites[name];
		let spriteWidth = (sprite.ex - sprite.sx) + 1;
		let spriteHeight = (sprite.ey - sprite.sy) + 1;
		// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
		context.drawImage(spritesCanvas, sprite.sx, sprite.sy, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
	}
```

	And, now inside the draw function, where we draw the ball and the paddles, we can change
	to use this new function

```javascript
	drawSprite("ball", ball.x, ball.y);

	drawSprite("paddle", leftPaddle.x, leftPaddle.y);

	drawSprite("paddle", rightPaddle.x, rightPaddle.y);
```

	The only other changes I wanted to make are changes to the bounce of the ball off of
	paddles, making it more random, and the beginning trajectory of the ball.
	
	The code to trigger when the ball hits left or hits right should look like this
	(right before the code to draw the ball)
```javascript
	// ball hits the top/bottom
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
```

	Lets change the code to only release the ball in certain directions. I know the code is
	a little bit confusing, but basically each side has a range of degrees that the ball should
	stay within, and it just chooses at random. the gameOver() functon should look like this.

```javascript

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
```
Pong tutorial
----------------------------------------------
1) a) Create all of the base folders and files for the web site that will be the base to display the game.
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


2) a) Since we do not want our javascript file to start running until are the DOM elements are finished, lets move the script tag so that it is in the body, and we will put any other new elements ABOVE this so that it is always at the BOTTOM.
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

```
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 10;

context.scale(scale, scale);
context.fillStyle = '#000000';
context.fillRect(0, 0, canvas.height, canvas.width);
```

   EXTRA) colors can be represented in HEX code by doing # + (Red value from 00 - FF in HEX) + (Green value from 00 - FF in HEX) + (Blue value from 00 - FF in HEX)
   So... Red is #FF0000, Green is #00FF00, Blue is #0000FF, Black is #000000, What is white?


3) a) Create the main game loop. To start our game timer we call requestAnimationFrame with a function that we want called when this happens. requestAnimationFrame passes in the current time which we can use to find out how much time has elapsed since we were last here. Notice we don't have a function called draw yet.
```
function loop(time) {
	draw();
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
```

   b) The way that we have written the loop we would get a call to draw every frame of animation (60 a second) so we should slow it down a bit. Lets add some code that will count milliseconds and only call draw every 500 milliseconds (half of a second);
```
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
```
function draw() {
	
}
```

   EXTRA) Try to figure out what this is going to do before you run it
```
function draw() {
	context.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	context.fillRect(Math.floor((Math.random() * 90)), Math.floor((Math.random() * 60)), 1, 1);	
}
```

window.onload = function () {

directions = {
	//Direction Arrows
	"up": 38,
	"down": 40,
	"left": 37,
	"right": 39,
	//"a"
	"action": 90
};
//Checks object for a value
//http://stackoverflow.com/questions/4510234/javascript-check-to-see-if-value-matches-object
var checkForMatch = function(object, value) {
	for(var k in object) {
		if(!object.hasOwnProperty(k)) continue;
		if(object[k] === value) {
			return true;
		}
	}
};

var move = function(element, keyCode, speed) {
	var spriteElement = document.getElementById(element);
	var spriteBoundingRect = sprite.getBoundingClientRect();

	switch(keyCode) {
		case directions["up"]:
			var collided = collision(element, "up", speed, "newWall");
			if(collided == "none") {
				document.getElementById("walls").style.top = document.getElementById("walls").getBoundingClientRect()["top"] + speed;
				// spriteElement.style.top = spriteBoundingRect["top"] - speed;
				
			}
			else {
				console.log(collided);
				spriteElement.style.top = collided.getBoundingClientRect()["bottom"];
				// document.getElementById("walls").style.top = document.getElementById("walls").getBoundingClientRect()["top"] + speed;
			}
		break;

		case directions["down"]:
			var collided = collision(element, "down", speed, "newWall");
			if(collided == "none") {
				document.getElementById("walls").style.top = document.getElementById("walls").getBoundingClientRect()["top"] - speed;
				// spriteElement.style.top = spriteBoundingRect["top"] + speed;
			}
			else {
				console.log(collided);
				spriteElement.style.top = collided.getBoundingClientRect()["top"] - spriteBoundingRect["width"];
			}
		break;
		
		case directions["left"]:
			var collided = collision(element, "left", speed, "newWall");
			if(collided == "none") {
				document.getElementById("walls").style.left = document.getElementById("walls").getBoundingClientRect()["left"] + speed;
				// spriteElement.style.left = spriteBoundingRect["left"] - speed;
			}
			else {
				console.log(collided);

				spriteElement.style.left = collided.getBoundingClientRect()["right"];
			}
		break;
		
		case directions["right"]:
			var collided = collision(element, "right", speed, "newWall");
			if(collided == "none") {
				document.getElementById("walls").style.left = document.getElementById("walls").getBoundingClientRect()["left"] - speed;
				// spriteElement.style.left = spriteBoundingRect["left"] + speed;
			}
			else {
				console.log(collided);
				spriteElement.style.left = collided.getBoundingClientRect()["left"] - spriteBoundingRect["width"];
			}
		break;

		case directions["action"]:
			if(collision(element, "overlap", 0, "triggerPink") != "none") {
				removeBox("wall1");
				drawWalls(buildBoxofWalls(10, 100, 200, 100, 300, [{"top": false}, {"bottom": false}, {"left": false}, {"right": true}]), "newWall wall1", "brown");
			}
			if(collision(element, "overlap", 0, "triggerRed") != "none") {
				removeBox("wall3");
				drawWalls(buildBoxofWalls(10, 200, 100, 100, 600, [{"top": true}, {"bottom": false}, {"left":false}, {"right":false}]), "newWall wall3", "green");
			}
			if(collision(element, "overlap", 0, "exit") != "none") {
				alert("win");
			}
		break;
	}
};

var collision = function(element, direction, speed, objects) {
	var walls = document.getElementsByClassName(objects);
	var sprite = document.getElementById("sprite");
	var spriteBoundingBox = sprite.getBoundingClientRect();

	var wallsLength = walls.length;
	for(var i = 0; i < wallsLength; i++) {
		var wallBoundingBox = walls[i].getBoundingClientRect();
		switch(direction) {
			case "up":
				if(((spriteBoundingBox["top"] - 10) <= wallBoundingBox["bottom"]) 
					&& ((spriteBoundingBox["top"] - 10) >= wallBoundingBox["top"]) 
					&& (spriteBoundingBox["right"] <= wallBoundingBox["right"]) 
					&& (spriteBoundingBox["left"] >= wallBoundingBox["left"])) {
					// console.log(spriteBoundingBox);
					// console.log(walls[i].getBoundingClientRect());
					return walls[i];
				}
			break;

			case "down":
				if(
					((spriteBoundingBox["bottom"] + 10) >= wallBoundingBox["top"]) 
					&& ((spriteBoundingBox["bottom"] + 10) <= wallBoundingBox["bottom"]) 
					&& ((spriteBoundingBox["right"] <= wallBoundingBox["right"]) 
					&& (spriteBoundingBox["left"] >= wallBoundingBox["left"]))) {
					// console.log(spriteBoundingBox);
					// console.log(walls[i].getBoundingClientRect());
					return walls[i];
				}
			break;

			case "left":
				if(
					((spriteBoundingBox["left"] - 10) >= wallBoundingBox["left"]) 
					&& ((spriteBoundingBox["right"] - 10) <= wallBoundingBox["right"]) 
					&& ((spriteBoundingBox["top"] >= wallBoundingBox["top"]) 
					&& (spriteBoundingBox["bottom"] <= wallBoundingBox["bottom"]))) {
					// console.log(spriteBoundingBox);
					// console.log(walls[i].getBoundingClientRect());
					return walls[i];
				}
			break;

			case "right":
				if(
					((spriteBoundingBox["right"] + 10) <= wallBoundingBox["right"]) 
					&& ((spriteBoundingBox["left"] + 10) >= wallBoundingBox["left"]) 
					&& ((spriteBoundingBox["top"] >= wallBoundingBox["top"]) 
					&& (spriteBoundingBox["bottom"] <= wallBoundingBox["bottom"]))) {
					// console.log(spriteBoundingBox);
					// console.log(walls[i].getBoundingClientRect());
					return walls[i];
				}
			break;

			case "overlap":
				if(
					((spriteBoundingBox["right"]) <= wallBoundingBox["right"]) 
					&& ((spriteBoundingBox["left"]) >= wallBoundingBox["left"]) 
					&& ((spriteBoundingBox["top"] >= wallBoundingBox["top"]) 
					&& (spriteBoundingBox["bottom"] <= wallBoundingBox["bottom"]))) {
					// console.log(spriteBoundingBox);
					// console.log(walls[i].getBoundingClientRect());
					return walls[i];
				}
			break;
		}
	}
	// output("CLEAR", "");
	return "none";
};

var drawWalls = function(walls, className, color) {
	var wallsLength = walls.length;
	for(var i = 0; i < wallsLength; i++) {
		var width = walls[i]["width"]
		var height = walls[i]["height"]
		var positionX = walls[i]["position"]["x"]
		var positionY = walls[i]["position"]["y"]
		
		var wallsDiv = document.getElementById("walls");
		var newWall = document.createElement("div");
		newWall.style.position = "absolute";
		newWall.style.left = positionX;
		newWall.style.top = positionY;
		newWall.style.width = width;
		newWall.style.height = height;
		newWall.style.backgroundColor = color;
		newWall.setAttribute("class", className);
		wallsDiv.appendChild(newWall);
	}
};

function buildBoxofWalls(wallThickness, boxWidth, boxHeight, boxX, boxY, doors) {
	var walls = [];
	//Top
	if (doors[0]["top"] == false) {
		walls.push({
			width: boxWidth,
			height: wallThickness,
			position: {
				x: boxX,
				y: boxY
			}
		});
	}
	else {
		walls.push({
			width: ((boxWidth/2)-wallThickness),
			height: wallThickness,
			position: {
				x: boxX,
				y: boxY
			}
		});
		walls.push({
			width: ((boxWidth/2)-wallThickness),
			height: wallThickness,
			position: {
				x: (boxX+((boxWidth/2)+wallThickness)),
				y: boxY
			}
		});
	}

	//Bottom
	if (doors[1]["bottom"] == false) {
		walls.push({
			width: boxWidth,
			height: wallThickness,
			position: {
				x: boxX,
				y: (boxY + (boxHeight - wallThickness))
			}
		});
	}
	else {
		walls.push({
			width: ((boxWidth/2)-wallThickness),
			height: wallThickness,
			position: {
				x: (boxX+((boxWidth/2)+wallThickness)),
				y: (boxY + (boxHeight - wallThickness))
			}
		});
		walls.push({
			width: ((boxWidth/2)-wallThickness),
			height: wallThickness,
			position: {
				x: boxX,
				y: (boxY + (boxHeight - wallThickness))
			}
		});
	}

	//Left
	if (doors[2]["left"] == false) {
		walls.push({
			width: wallThickness,
			height: (boxHeight - (2 * wallThickness)),
			position: {
				x: boxX,
				y: (boxY + wallThickness)
			}
		});
	}
	else {
		walls.push({
			width: wallThickness,
			height: ((boxHeight - (2 * wallThickness))/2-wallThickness),
			position: {
				x: boxX,
				y: (boxY + wallThickness)
			}
		});
		walls.push({
			width: wallThickness,
			height: ((boxHeight - (2 * wallThickness))/2-wallThickness),
			position: {
				x: boxX,
				y: (boxY + wallThickness + ((boxHeight - (2 * wallThickness))/2+wallThickness))
			}
		});
	}

	//Right
	if (doors[3]["right"] == false) {
		walls.push({
			width: wallThickness,
			height: (boxHeight - (2 * wallThickness)),
			position: {
				x: (boxX + (boxWidth - wallThickness)),
				y: (boxY + wallThickness)
			}
		});
	}
	else {
		walls.push({
			width: wallThickness,
			height: ((boxHeight - (2 * wallThickness))/2-wallThickness),
			position: {
				x: (boxX + (boxWidth - wallThickness)),
				y: (boxY + wallThickness)
			}
		});
		walls.push({
			width: wallThickness,
			height: ((boxHeight - (2 * wallThickness))/2-wallThickness),
			position: {
				x: (boxX + (boxWidth - wallThickness)),
				y: (boxY + wallThickness + ((boxHeight - (2 * wallThickness))/2+wallThickness))
			}
		});
	}

	return walls;
};


//Helpful explanation of how to remove all nodes in a list here: http://stackoverflow.com/questions/13555785/remove-all-child-from-node-with-the-same-class-pure-js
var removeBox = function(wallNumber) {
	var container = document.getElementById("walls"); 
	var walls = container.getElementsByClassName(wallNumber);
	
	while (walls[0]) {
		walls[0].parentNode.removeChild(walls[0]);		
	}
};


//Button output status for live loggin purposes
var output = function(keyCode, pressStatus) {
	// document.getElementById('loggingOutput').innerHTML = keyCode + ": " + pressStatus;
};

//Checks for keydown
document.getElementsByTagName('html')[0].onkeydown = function(currentKey) {
	var keyCode = currentKey.keyCode;
	if(checkForMatch(directions, keyCode) == true) {
		move("sprite", keyCode, 10);
	}
};

//Checks for keyup
document.getElementsByTagName('html')[0].onkeyup = function(currentKey) { 
	var keyCode = currentKey.keyCode;
	if(checkForMatch(directions, keyCode) == true) {	
		setTimeout(function() {
			//anything that should happen on keyup
		}, 
		200);
	}	
};

//drawWalls first builds a list of walls using buildBoxofWalls:
//Parameters: (wallThickness, boxWidth, boxHeight, boxX, boxY, doors)
//Then builds it with a class(es) and a color. Use the class and color for other things
drawWalls(buildBoxofWalls(10, 100, 200, 100, 300, [{"top": false}, {"bottom": false}, {"left": false}, {"right": false}]), "newWall wall1", "brown");
drawWalls(buildBoxofWalls(10, 200, 400, 400, 100, [{"top": false}, {"bottom": true}, {"left":true}, {"right":false}]), "newWall wall2", "blue");
drawWalls(buildBoxofWalls(10, 200, 100, 100, 600, [{"top": false}, {"bottom": false}, {"left":false}, {"right":false}]), "newWall wall3", "green");

//Create solid boxes to use for hotspots in order to trigger
drawWalls(buildBoxofWalls(30, 30, 30, 135, 350, [{"top": true}, {"bottom": false}, {"left":false}, {"right":true}]), "hotspot triggerRed", "red");
drawWalls(buildBoxofWalls(30, 30, 30, 450, 200, [{"top": true}, {"bottom": false}, {"left":false}, {"right":true}]), "hotspot triggerPink", "pink");

//Create a hotspot to use as an exit
drawWalls(buildBoxofWalls(30, 30, 30, 120, 650, [{"top": true}, {"bottom": false}, {"left":false}, {"right":true}]), "hotspot exit", "black");

//Bounding box for entire "level"
drawWalls(buildBoxofWalls(50, 750, 750, 10, 10, [{"top": false}, {"bottom": false}, {"left":false}, {"right":false}]), "newWall wall0", "black");

}

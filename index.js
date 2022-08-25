//test js for the shape rotation
let canvas, ctx, width, height, redX, redY, blueX, blueY


function init(){
	canvas = document.getElementById('gameCanvas')
	ctx = canvas.getContext('2d')
	width = canvas.width;
	height = canvas.height;
    requestionAnimationFrame(gameLoop);	
}

setInterval(function gameLoop(){
    game = true;
	update();
	clear();
    
    //Red player controls
    //W (forwards)
    if (keys[87] == true){
        redX += (playerSpeed * Math.cos(convertAngle(redD-90)));
        redY += (playerSpeed * Math.sin(convertAngle(redD-90)));
    }
    //S (backwards)
    if (keys[83] == true){
        redX -= (playerSpeed * Math.cos(convertAngle(redD-90)));
        redY -= (playerSpeed * Math.sin(convertAngle(redD-90)));
    }
    
    //D turns right (modifies direction math has yet to come)   
    if (keys[68] == true){
        //redX += playerSpeed;
        redD = redD + 2;
    }
    
    //A turns left (modifies direction, math has yet to come)
    if (keys[65] ==true){
        redD = redD - 2;
    }
    
    //Blue Player Controls
    //up arrow (forwards)
    if (keys[38] == true){
        blueX += (playerSpeed * Math.cos(convertAngle(blueD-90)));
        blueY += (playerSpeed * Math.sin(convertAngle(blueD-90)));
    }
    //Down Arrow (backwards)
    if (keys[40] == true){
        blueX -= (playerSpeed * Math.cos(convertAngle(blueD-90)));
        blueY -= (playerSpeed * Math.sin(convertAngle(blueD-90)));
    }
    //Right Arrow (turns right)
    if (keys[39] == true){
        blueD = blueD + 2;
    }
    //Left Arrow (turns left)
    if (keys[37] == true){  
        blueD = blueD - 2;
    }
    
    //keeps red in line (inside the canvas)
    if (redX >= 1175){
        redX = 1175;
    }
    if (redY >= 775){
        redY = 775;
    }
    if (redX <= 25){
       redX = 25;
    }
    if(redY <= 25){
        redY = 25;
    }
    
    //keep blue in line (inside the canvas)
    if (blueX >= 1175){
        blueX = 1175;
    }
    if (blueY >= 775){
        blueY = 775;
    }
    if (blueX <= 25){
       blueX = 25;
    }
    if(blueY <= 25){
        blueY = 25;
    }
    
    //iterates through bullet list and traces each one of them
    //draws a bullet for every item in the bullet list
    for (let i = 0; i < bulletList.length; i++){
        //if a bullet touches the walls
        //modifies the x and y based on the direction
        bulletList[i][1] += (bulletSpeed * Math.cos(convertAngle(bulletList[i][0] - 90)));
        bulletList[i][2] += (bulletSpeed * Math.sin(convertAngle(bulletList[i][0] - 90)));
        
        //BOUNCING OFF WALLS TRY TO FIX LATER
        if (bulletList[i][1] <= 0 || bulletList[i][1] >= 1200){
            bulletList[i][3]++;
            if (bulletList[i][3] <= ricochets){
                bulletList[i][0] = -bulletList[i][0];
            }
        }
        if (bulletList[i][2] <= 0 || bulletList[i][2] >= 800){
            bulletList[i][3]++;
            if (bulletList[i][3] <= ricochets){
                bulletList[i][0] = 180-bulletList[i][0];
            }
        }
        
        drawBullet(bulletList[i][0], bulletList[i][1], bulletList[i][2]);
        
        const titleElement = document.getElementById("titleText");
        //HITBOXES
        //draw circle around each player 
        dR = Math.sqrt(((bulletList[i][1] - redX)**2) + (bulletList[i][2] - redY) ** 2);
        dB = Math.sqrt(((bulletList[i][1] - blueX)**2) + (bulletList[i][2] - blueY) ** 2);
        if (bulletList[i][4] > 20){
            if (dR < 35){
                game = false; 
                titleElement.style.color = blueTeam.color;
                document.body.style.background = blueTeam.color;
            }

            if (dB < 35){
                game = false; 
                titleElement.style.color = redTeam.color;
                document.body.style.background = redTeam.color;
            }
        }
        bulletList[i][4]++;
    }
    
    //when the round ends resets the starting position 
    if (game == false){
        redX = 50;
        redY = 50;
        redD = 180;
        blueX = 1100;
        blueY = 700;
        blueD = 0;
        bulletList = [[],[]]
    }

    redTeam.drawPlayer(redX,redY, 50, redD);
    blueTeam.drawPlayer(blueX, blueY, 50, blueD);
}, 1)

//creates red team in its starting position
var redTeam = new Team("red", "#FF0000", 0, 0, 90);
var blueTeam = new Team("blue", "#1261A0", 0, 0, 270);


//starting conditions for both tanks
redX = 100;
redY = 100;
redD = 180;
blueX = 1100;
blueY = 700;
blueD = 0; 

playerSpeed = 3; //<-------Player Movement Speed (in pixels per frame) 
//rotationSpead = 3; //<---- Speed at which players turn
bulletSpeed = 5;//<--------Bullet Speed
ricochets = 1; //<---Number of ricochets allowed

//update function
function update(){
	
}

//wipes the screen
function clear(){
	ctx.clearRect(0,0, width, height);
}

function Team(name, color, startx, starty, direction){	
	this.name = name;
	this.color = color;
	this.x = startx;
	this.y = starty;
	this.d = direction;
    
    this.drawPlayer = function(centerX, centerY, size, angle){
        drawSquare(centerX, centerY, size, angle, this.color); 
        angleR = convertAngle(angle);
        turretCenterX = centerX + (((size / 2) +(size / 10)) * Math.sin(angleR));
        turretCenterY = centerY - (((size / 2) +(size / 10)) * Math.cos(angleR));
        drawSquare(turretCenterX, turretCenterY, (size/5), angle, this.color);
    }
}

//draws a square at the given angle
function drawSquare(centerX, centerY, size, angle, color){
    ctx.fillRect(centerX-1,centerY-1,2,2);
    //ctx.strokeStyle = "#000000";
    //convert angle to radians
    angleR = convertAngle(angle);
    
    //finds the distance from center of the square to the corner
    centerToCorner = Math.sqrt(((size/2)**2) + ((size/2)**2));
    //x and y are center of square
    //angle is angle of rotation
    
    //starts at the bottom left corer (if the angle is 0 degrees)
    //finds the bottom left corner
    x = centerX + ((centerToCorner * Math.sin(convertAngle(45-angle))));
    y = centerY + ((centerToCorner * Math.cos(convertAngle(45-angle))));
    ctx.beginPath();
    ctx.moveTo(x,y);
    x = x - (size * Math.cos(angleR));
    y = y - (size * Math.sin(angleR));
    ctx.lineTo(x,y);
    x = x + (size * Math.sin(angleR));
    y = y - (size * Math.cos(angleR));
    ctx.lineTo(x,y);
    x = x + (size * Math.cos(angleR));
    y = y + (size * Math.sin(angleR));
    ctx.lineTo(x,y);
    x = x - (size * Math.sin(angleR));
    y = y + (size * Math.cos(angleR));
    ctx.lineTo(x,y);
    //ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

//draws the player shape
function drawPlayer(centerX, centerY, size, angle){
    drawSquare(centerX, centerY, size, angle); 
    angleR = convertAngle(angle);
    turretCenterX = centerX + (((size / 2) +(size / 10)) * Math.sin(angleR));
    turretCenterY = centerY - (((size / 2) +(size / 10)) * Math.cos(angleR));
    drawSquare(turretCenterX, turretCenterY, (size/5), angle);
}

//draws the bullet
function drawBullet(d, x, y){
    drawSquare(x, y, 10, d, "#000000")
}

//converst angle to radians
function convertAngle(angle){
    radians = (angle * Math.PI) / 180;
    return radians;
}

//array to store key values in
var keys = [false];

//fill array with false <--values to true if key is held down, once lifted, back to false
for (let i = 1; i < 223; i++){
    keys.push(false);
}

//movement listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    //changes any keys depressed value in keys[] to true
    keys[e.keyCode] =  true;
}

function keyUpHandler(e){
    //changes any keys released value in keys to false
    keys[e.keyCode] = false;
}


//creates an empty list to add bullet objects to 
var bulletList = [[],[]];

//shooting function
document.addEventListener('keydown', (e) => {
    e = e || window.event;
        
    //RED SHOOT
    if (e.keyCode === 32){
        //adds a bullet direction, x and y to a list, 0 is for the number of ricochet's the bullet has had
        bulletList.push([redD, redX, redY, 0, 0]);
    }
    
    //BLUE SHOOT
    else if (e.keyCode === 188){
        bulletList.push([blueD, blueX, blueY, 0, 0]);
    }
})

//wait for html to load
document.addEventListener('DOMContentLoaded', init);
//index.js
//for canvas test website

//version that allows the holding of buttons //ALSO A GIT TEST
	
//initialize config vars
let canvas, ctx, width, height, redX, redY, blueX, blueY


function init(){
	canvas = document.getElementById('gameCanvas')
	ctx = canvas.getContext('2d')
	width = canvas.width;
	height = canvas.height;
	requestionAnimationFrame(gameLoop);	
}


//creates red team in its starting position
var redTeam = new Team("red", "#FF0000", 0, 0, 90);
var blueTeam = new Team("blue", "#1261A0", 0, 0, 270);

//update function
function update(){
	
}

//wipes the screen
function clear(){
	ctx.clearRect(0,0, width, height);
}


//starting conditions for both tanks
redX = 50;
redY = 50;
redD = 180;
blueX = 1100;
blueY = 700;
blueD = 0;

//creates an empty list to add bullet objects to 
var bulletList = [[],[]];


playerSpeed = 3; //<-------Player Movement Speed (in pixels per frame) 
bulletSpeed = 10;//<--------Bullet Speed


//SHOOTING
document.addEventListener('keydown', (e) => {
        e = e || window.event;
        
        //RED SHOOT
        if (e.keyCode === 32){
            //adds a bullet direction, x and y to a list
            if (redD == 90){
                bulletList.push([redD, redX + 50, redY + 20]);
            }
            else if (redD == 180){
                bulletList.push([redD, redX + 20, redY + 50]);
            }
            else if (redD == 270){
                bulletList.push([redD, redX - 20, redY + 20]);
            }
            else if (redD == 0){
                bulletList.push([redD, redX + 20, redY -20]);
            }
        }
    
        //BLUE SHOOT
        else if (e.keyCode === 188){
            //adds a bullet direction, x and y to a list
            if (blueD == 90){
                bulletList.push([blueD, blueX+50, blueY+ 20]);
            }
            else if (blueD== 180){
                bulletList.push([blueD, blueX + 20, blueY + 50]);
            }
            else if (blueD == 270){
                bulletList.push([blueD, blueX - 20, blueY + 20]);
            }
            else if (blueD == 0){
                bulletList.push([blueD, blueX + 20, blueY -20]);
            }
        }
    
        
    })

//array to store key values in
var keys = [false];

//fill array with false <--values to true if key is held down, once lifted, back to false
for (let i = 1; i < 223; i++){
    keys.push(false);
}


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

setInterval(function gameLoop(){
    game = true;
	update();
	clear();
    //where the updates should start 
    
    //player movement and firing (as decided by keys[] array)
    
    //Red Player Controls
    //W (forwards)
    if (keys[87] == true){
        redY -= playerSpeed;
        redD = 0;
    }
    //S (backwards)
    if (keys[83] == true){
        redY += playerSpeed;
        redD = 180;
    }
    
    //D turns right (modifies direction math has yet to come)   
    if (keys[68] == true){
        redX += playerSpeed;
        redD = 90;
    }
    
    //A turns left (modifies direction, math has yet to come)
    if (keys[65] ==true){
        redX -= playerSpeed;
        redD = 270;
    }
    
    //shooting should still be on a press by press basis imo 
    
    //Blue Player Controls
    //up arrow (forwards)
    if (keys[38] == true){
        blueY -= playerSpeed;
        blueD = 0;
    }
    //Down Arrow (backwards)
    if (keys[40] == true){
        blueY += playerSpeed;
        blueD = 180;
    }
    //Right Arrow (turns right)
    if (keys[39] == true){
        blueX += playerSpeed;
        blueD = 90;
    }
    //Left Arrow (turns left)
    if (keys[37] == true){
        blueX -= playerSpeed;
        blueD = 270;
    }
    
    //Right Arrow (turns right)
    
    //keeps red in line (inside the canvas)
    if (redX >= width-50){
        redX = width-50;
    }
    if (redY >= 750){
        redY = 750;
    }
    if (redX <= 0){
       redX = 0;
    }
    if(redY <= 0){
        redY = 0;
    }
    
    //keep blue in line (inside the canvas)
    if (blueX >= 1150){
        blueX = 1150;
    }
    if (blueY >= 750){
        blueY = 750;
    }
    if (blueX <= 0){
       blueX = 0;
    }
    if(blueY <= 0){
        blueY = 0;
    }
    
    
    //iterates through bullet list and traces each one of them
    //draws a bullet for every item in the bullet list
    for (let i = 0; i < bulletList.length; i++){
        drawBullet(bulletList[i][0], bulletList[i][1], bulletList[i][2]);
        //modifies the x and y based on the direction
        if (bulletList[i][0] == 90){
            bulletList[i][1] += bulletSpeed; //moves bullet left
        }
        else if (bulletList[i][0] == 180){
            bulletList[i][2] += bulletSpeed; //moves bullet down 
        }
        else if (bulletList[i][0] == 270){
            bulletList[i][1] -= bulletSpeed; //moves bullet left
        }
        else if (bulletList[i][0] == 0){
            bulletList[i][2] -= bulletSpeed; //moves bullet up 
        }
        
        const titleElement = document.getElementById("titleText");
        //HITBOXES
        if ((bulletList[i][1] > redX) && (bulletList[i][1] < redX + 50)){
            if ((bulletList[i][2] > redY) && (bulletList[i][2] <= redY + 50)){
                game = false; 
                titleElement.style.color = blueTeam.color;
                document.body.style.background = blueTeam.color;
            }
        }
        
        if ((bulletList[i][1] > blueX) && (bulletList[i][1] < blueX + 50)){
            if ((bulletList[i][2] > blueY) && (bulletList[i][2] <= blueY + 50)){
                game = false; 
                titleElement.style.color = redTeam.color;
                document.body.style.background = redTeam.color;
            }
        }
    }
    
    //when the round ends resets the starting position 
    if (game == false){
        redX = 50;
        redY = 50;
        redD = 180;
        blueX = 1100;
        blueY = 700;
        blueD = 0;
    }
    
    //based on direction and it's x and y + 100
	redTeam.drawSprite(redD, redX, redY);
	blueTeam.drawSprite(blueD, blueX, blueY);
    
}, 1) // <--------CONTROLS FRAME RATE

function Team(name, color, startx, starty, direction){	
	this.name = name;
	this.color = color;
	this.x = startx;
	this.y = starty;
	this.d = direction;
    
	//draws the sprite according to the coordinates
	this.drawSprite = function(d, x, y) {
		ctx.fillStyle = this.color; //defines fill style for player 1
		ctx.fillRect(x, y, 50, 50) //startx and y define top right corner
		
		//draws the direction of the turret
            //0 degrees is considered straight up
        
		if (d == 90){
			ctx.fillRect(x + 50,y + 20, 10,10)
		}
		else if (d == 180){
			ctx.fillRect(x + 20, y + 50, 10,10)
		}
		else if (d == 270){
			ctx.fillRect(x - 10, y + 20, 10,10)
		}
		else if (d == 0){
			ctx.fillRect(x + 20, y - 10, 10,10)
		}	
	}
}

function drawBullet(d, x, y){
    ctx.fillStyle = "#00000"
    ctx.fillRect(x, y, 10,10)
}


//wait for html to load
document.addEventListener('DOMContentLoaded', init);


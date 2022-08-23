//index.js
//for canvas test website
	
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
var blueTeam = new Team("blue", "#072F5F", 0, 0, 270);

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
blueY = 800;
blueD = 0;

//creates an empty list to add bullet objects to 
var bulletList = [[],[]];


playerSpeed = 50; //<-------Player Movement Speed
bulletSpeed = 10;//<--------Bullet Speed

document.addEventListener('keydown', (e) => {
        e = e || window.event;
        
        //RED CONTROLS 
        if (e.keyCode === 87){
            redY-=playerSpeed;
            redD = 0;
        }
        else if (e.keyCode === 68){
            redX+=playerSpeed;
            redD = 90;
        }
    
        else if (e.keyCode === 83){
            redY+=playerSpeed;
            redD = 180;
        }
        else if (e.keyCode === 65){
            redX-=playerSpeed;
            redD = 270;
        }
        else if (e.keyCode === 32){
            //adds a bullet direction, x and y to a list
            if (redD == 90){
                bulletList.push([redD, redX+50, redY+ 20]);
            }
            else if (redD == 180){
                bulletList.push([redD, redX + 20, redY + 50]);
            }
            else if (redD == 270){
                bulletList.push([redD, redX - 20, redY + 20]);
            }
            else if (blueD == 0){
                bulletList.push([redD, redX + 20, redY -20]);
            }
        }
    
        //BLUE CONTROLS
        else if (e.keyCode === 38){
            blueY-=playerSpeed;
            blueD = 0;
        }
        else if (e.keyCode === 39){
            blueX+=playerSpeed;
            blueD = 90;
        }
        else if (e.keyCode === 40){
            blueY+=playerSpeed;
            blueD = 180;
        }
        else if (e.keyCode === 37){
            blueX-=playerSpeed;
            blueD = 270;
        }
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


setInterval(function gameLoop(){
    game = true;
	update();
	clear();
    //where the updates should start 
    
    //keeps red in line (inside the canvas)
    if (redX >= width-50){
        redX = width-50;
    }
    if (redY >= height){
        redY = height-50;
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
    if (blueY >= 900){
        blueY = 850;
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
        
        
        //causes self to die on firing up and left????
        if ((bulletList[i][1] > redX) && (bulletList[i][1] < redX + 50)){
            if ((bulletList[i][2] > redY) && (bulletList[i][2] <= redY + 50))
                game = false; 
        }
        
        if ((bulletList[i][1] > blueX) && (bulletList[i][1] < blueX + 50)){
            if ((bulletList[i][2] > blueY) && (bulletList[i][2] <= blueY + 50))
                game = false; 
        }
    }
    
    if (game == false){
        redX = 50;
        redY = 50;
        redD = 180;
        blueX = 1100;
        blueY = 800;
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
    ctx.fillRect(x, y, 10,10)
}


//wait for html to load
document.addEventListener('DOMContentLoaded', init);


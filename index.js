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
blueX = width-100;
blueY = height-100;
blueD = 0;

//creates an empty list to add bullet objects to 
bulletList = [];




document.addEventListener('keydown', (e) => {
        e = e || window.event;
        if (e.keyCode === 87){
            redY-=50;
            redD = 0;
        }
        else if (e.keyCode === 68){
            redX+=50;
            redD = 90;
        }
    
        else if (e.keyCode === 83){
            redY+=50;
            redD = 180;
        }
        else if (e.keyCode === 65){
            redX-=50;
            redD = 270;
        }
        else if (e.keyCode === 32){
            //creates a bullet at red's location and direction
        }
    })


setInterval(function gameLoop(){
	update();
	clear();
    //where the updates should start 
    
    //keeps red in line
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
    
    //iterates through bullet list and traces each one of them
	redTeam.drawSprite(redD, redX, redY, "#FF000");
	blueTeam.drawSprite(blueD, width-100, height-100, "#072F5F");
    
}, 1)

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

//create bullet object that takes location and direction info


//wait for html to load
document.addEventListener('DOMContentLoaded', init);


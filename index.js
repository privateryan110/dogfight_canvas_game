//index.js
//for canvas test website
	
//initialize config vars
let canvas, ctx, width, height


function init(){
	canvas = document.getElementById('gameCanvas')
	ctx = canvas.getContext('2d')
	width = canvas.width;
	height = canvas.height;
	requestionAnimationFrame(gameLoop);	
}


//creates red team in its starting position
var redTeam = new Team("red", "#FF0000", 50, 50, 90);
var blueTeam = new Team("blue", "#072F5F", width-50, height-50, 270);

//update function
function update(){
	
}

//wipes the screen
function clear(){
	ctx.clearRect(0,0, width, height);
}

redX = 50;
var redY = 50;
var blueX = height-100;
var blueY = height-100;

setInterval(function gameLoop(){
	update();
	clear();
    
	redTeam.drawSprite(180, 50, 50, "#FF000");
	blueTeam.drawSprite(0, width-100, height-100, "#072F5F");
    document.onkeydown = checkKey;
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
			ctx.fillRect(y + 20, y + 50, 10,10)
		}
		else if (d == 270){
			ctx.fillRect(x - 10, y + 20, 10,10)
		}
		else if (d == 0){
			ctx.fillRect(x + 20, y - 10, 10,10)
		}	
	}
}

//game loop
function tankGame(){
	//draws both sprites (red at top left and blue at top right)
	//controls 
		//RED: WASD to move, space to shoot
		//BLUE: arrows to move, right command to shoot
	
}

//wait for html to load
document.addEventListener('DOMContentLoaded', init);


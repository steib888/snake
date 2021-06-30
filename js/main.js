const canvas = document.getElementById('field')
const ctx = canvas.getContext('2d')

const groundImage = new Image()
groundImage.src = "img/ground.png"
const foodImage = new Image()
foodImage.src = "img/food.png"

const snake_L_Image = new Image()
snake_L_Image.src = "img/snake_l.png"
const snake_R_Image = new Image()
snake_R_Image.src = "img/snake_r.png"
const snake_U_Image = new Image()
snake_U_Image.src = "img/snake_u.png"
const snake_D_Image = new Image()
snake_D_Image.src = "img/snake_d.png"


const MAP_X = 0;
const MAP_Y = 0;
const MAP_W = 608;
const MAP_H = 608;
const C_S = 32;

const M = 15;
const N = 17;

const mini_C_S = C_S/8;
const mini_M = 40;
const mini_N = 40;
const mini_w = mini_C_S*mini_N;
const mini_h = mini_C_S*mini_M;
const mini_x = MAP_W + 10; //(MAP_W - mini_w)/2;
const mini_y = (MAP_H - mini_w)/2//MAP_H + 10;
var mini_rect_x = 0;
var mini_rect_y = 0;




var game;
var score = 0;
var snake;
var food = {x: 3,
			y: 4};
newFood();

function randint(min, max) {
	return Math.floor(Math.random()*max+min);
}

function newFood() {
	food = {
		x: randint(0, mini_N),
		y: randint(0, mini_M)
	}
}

function drawMap() {
	ctx.drawImage(groundImage, 0, 0);
	if ((food.x >= mini_rect_x) && (food.x < mini_rect_x + N) && (food.y >= mini_rect_y) && (food.y < mini_rect_y + M)) {
		ctx.drawImage(foodImage, (food.x - mini_rect_x)*C_S + C_S, (food.y - mini_rect_y)*C_S + 3*C_S);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, C_S * 2.1, C_S *1.7)

	snake.draw();
}

function drawMiniMap() {
	ctx.fillStyle ="blue";
	ctx.fillRect(mini_x - mini_C_S, mini_y - mini_C_S, mini_w + 2*mini_C_S , mini_h + 2*mini_C_S);
	ctx.fillStyle ="black";
	ctx.fillRect(mini_x, mini_y, mini_w, mini_h);
	ctx.fillStyle ="white";
	ctx.fillRect(mini_x - mini_C_S + mini_rect_x*mini_C_S, mini_y - mini_C_S + mini_rect_y*mini_C_S, (N+2)*mini_C_S, (M+2)*mini_C_S);
	ctx.fillStyle ="black";
	ctx.fillRect(mini_x + mini_rect_x*mini_C_S, mini_y + mini_rect_y*mini_C_S, N*mini_C_S, M*mini_C_S);
	ctx.fillStyle ="red";
	ctx.fillRect(mini_x + food.x*mini_C_S, mini_y + food.y*mini_C_S, mini_C_S, mini_C_S);
	ctx.fillStyle = "green";
	for(var i=0; i < snake.body.length; i++) {
		ctx.fillRect(mini_x + snake.body[i].x*mini_C_S, mini_y + snake.body[i].y*mini_C_S, mini_C_S, mini_C_S);
	}
}

function gameLoop() {
	snake.move();
	drawMap();
	drawMiniMap();
}

function main() {
	snake = new Snake("green", 4, 4, 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')

	game = setInterval(gameLoop, 200)
}

document.addEventListener("keydown", function dir(event) { 
	snake.changeDirection(event)
})


main()

class Snake{
	constructor(color, pos_x, pos_y, k_left, k_right, k_up, k_down){
		this.body = [];
		this.body[0] = {x: pos_x,
						y: pos_y}

		this.direction = { x: 1,
						   y: 0}

	   this.color = color;

		this.k_left = k_left
		this.k_right = k_right
		this.k_up = k_up
		this.k_down = k_down
	}

	changeDirection(event) {
		if (event.code == this.k_left) {
			if (this.body.length > 1) {
				if (this.body[0].x != this.body[1].x + 1 ){
					this.direction = { x: -1,
							   		y: 0}
				}
			}else{
				this.direction = { x: -1,
								y: 0}
			}
			this.move()
		}
		else if (event.code == this.k_right) {
			if (this.body.length > 1) {
				if (this.body[0].x != this.body[1].x - 1 ){
					this.direction = { x: 1,
							   		y: 0}
				}
			}else{
				this.direction = { x: 1,
								y: 0}
			}
			this.move()
		}
		else if (event.code == this.k_up) {
			if (this.body.length > 1) {
				if (this.body[0].y != this.body[1].y + 1){
					this.direction = { x: 0,
							   		y: -1}
				}
			}else{
				this.direction = { x: 0,
								y: -1}
			}
			this.move()
		}
		else if (event.code == this.k_down) {
			if (this.body.length > 1) {
				if (this.body[0].y != this.body[1].y - 1 ){
					this.direction = { x: 0,
							   		y: 1}
				}
			}else{
				this.direction = { x: 0,
								y: 1}
			}
			this.move()
		}
	}

	move() {
		var newHead = {
			x: this.body[0].x + this.direction.x,
			y: this.body[0].y + this.direction.y
		}

		this.body.unshift(newHead)
		if (!(this.isAteFood())) {
			this.body.pop()
		}

		this.isDied()

		var shift = 7;
		if (this.body[0].x + shift == mini_rect_x + N) {
			if (this.body[0].x < mini_N-shift) {
				mini_rect_x += 1;
			}
		}
		if (this.body[0].y + shift == mini_rect_y + M) {
			if (this.body[0].y < mini_M-shift) {
				mini_rect_y += 1;
			}
		}
		if (this.body[0].x - shift+1 == mini_rect_x) {
			if (this.body[0].x > shift - 1) {
				mini_rect_x -= 1;
			}
		}
		if (this.body[0].y - shift+1 == mini_rect_y) {
			if (this.body[0].y > shift - 1) {
				mini_rect_y -= 1;
			}
		}
	}

	draw() {
		if(this.direction.x == 1) {
			ctx.drawImage(snake_R_Image, (this.body[0].x - mini_rect_x)*C_S + C_S, (this.body[0].y - mini_rect_y)*C_S + 3*C_S);
		} else if(this.direction.x == -1) {
			ctx.drawImage(snake_L_Image, (this.body[0].x - mini_rect_x)*C_S + C_S, (this.body[0].y - mini_rect_y)*C_S + 3*C_S);
		} else if(this.direction.y == 1) {
			ctx.drawImage(snake_D_Image, (this.body[0].x - mini_rect_x)*C_S + C_S, (this.body[0].y - mini_rect_y)*C_S + 3*C_S);
		} else if(this.direction.y == -1) {
			ctx.drawImage(snake_U_Image, (this.body[0].x - mini_rect_x)*C_S + C_S, (this.body[0].y - mini_rect_y)*C_S + 3*C_S);
		}

		ctx.fillStyle = this.color;
		for(var i=1; i < this.body.length; i++) {
			if ((this.body[i].x >= mini_rect_x-1) && (this.body[i].x <= mini_rect_x + N) && (this.body[i].y >= mini_rect_y-1) && (this.body[i].y <= mini_rect_y + M)) {
				ctx.fillRect((this.body[i].x - mini_rect_x)*C_S + C_S, (this.body[i].y - mini_rect_y)*C_S + 3*C_S, C_S, C_S);
			}
		}
	}

	isDied() {
		this.isTouchWall()
		this.isTouchTail()
	}

	isTouchWall() {
		if ((this.body[0].x == -1) || (this.body[0].x == mini_N) || (this.body[0].y == -1) || (this.body[0].y == mini_M)) {
			clearInterval(game)
		}
	}

	isTouchTail() {
		for (var i = 1; i < this.body.length; i++){
			 if ((this.body[0].x == this.body[i].x) && (this.body[0].y == this.body[i].y))
 				clearInterval(game)
		}
	}

	isAteFood() {
		if ((this.body[0].x == food.x) && (this.body[0].y == food.y)) {
			score++;
			newFood();
			return true;
		}
		return false;
	}
}
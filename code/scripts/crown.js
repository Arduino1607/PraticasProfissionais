//TODO Criar uma classe mãe Inimigo e criar os inimigos como extensões dela
export class Crown {
  constructor(x, y, width, height, direction, game, range) {
    //generic variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.game = game;
    this.speed = 0;
    this.marked = false;
    this.lastAttack = 0;

    //specific variables
    this.previousState = 0;
    this.followingState = 1;
    this.vy = 0;
    this.vx = -5;
    this.weight = 1;
    this.originY = y;
    this.originX = x;
    this.direction = direction;
    this.range = range;

    //animation variable
    this.framex = 0;
    this.framey = 0;
    this.image = document.getElementById("crown");
    this.maxFrame = 2;
    this.fps = 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

  }

  update(speed, speedy, time, deltaTime) {
    this.x -= speed + this.speed;
    this.y -= speedy - this.vy;

    this.originY -= speedy;

    if (this.previousState == 0) {
      if ((time / 1000) - this.lastAttack >= this.range) {
        this.framey = 0;
        this.speed = 0;
        this.previousState = this.followingState;
        this.followingState = 0;
        this.lastAttack = time / 1000;
      }
    } else {
      if ((time / 1000) - this.lastAttack >= 1) {
        this.framey = 1;
        if (this.previousState == -1) {
          this.speed = -10*this.direction;
          this.followingState = 1;
          if (this.y >= this.originY) {
            this.vy = -15;
          }
        }
        if (this.previousState == 1) {
          this.speed = 10* this.direction;;
          this.followingState = -1;
        }
        this.previousState = 0;
        this.lastAttack = time / 1000;
    }else if (this.y >= this.originY) {
      this.vy = 0;
      this.y = this.originY;
    }
    }
    
    if (this.y < this.originY)
      this.vy += this.weight;

    this.animation(deltaTime);
    this.colision();
  }

  colision() {
    if (
      this.game.player.x + this.game.player.width > this.x + 60 &&
      this.game.player.x + this.game.player.width < this.x + 80 &&
      this.game.player.y + this.game.player.height >= this.y &&
      this.game.player.y < this.y + this.height &&
      this.game.player.currentState.getState() != "DEADING"
    ) {
      this.game.player.isDeath = true;
      this.game.player.setState(7);
    }
    if (
      this.game.player.x < this.x + this.width - 60 &&
      this.game.player.x > this.x + this.width - 80 &&
      this.game.player.y + this.game.player.height >= this.y &&
      this.game.player.y < this.y + this.height &&
      this.game.player.currentState.getState() != "DEADING"
    ) {
      this.game.player.isDeath = true;
      this.game.player.setState(7);
    }

    if (
      this.game.player.x + this.game.player.width > this.x + 60 &&
      this.game.player.x < this.x + this.width - 60 &&
      this.game.player.y + this.game.player.height + this.game.player.vy >=
      this.y &&
      this.game.player.y + this.game.player.height + this.game.player.vy <
      this.y + this.height
    ) {
      this.marked = true;
    }
  }
  animation(deltaTime){
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.framex < this.maxFrame - 1){
       this.framex++;
      }else{
        this.framex = 0;
      } 
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.framex * 32,
      this.framey * 32 + 1,
      32,
      32,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

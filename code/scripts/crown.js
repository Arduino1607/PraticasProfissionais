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
  }

  update(speed, speedy, time) {
    this.x -= speed + this.speed;
    this.y -= speedy - this.vy;
    this.originY -= speedy;

    
      if (this.previousState == 0) {
        if ((time / 1000) - this.lastAttack >= this.range) {
        this.speed = 0;
        this.previousState = this.followingState;
        this.followingState = 0;
        this.lastAttack = time / 1000;
        }
      } else {
        if ((time / 1000) - this.lastAttack >= 1) {
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
    /*} else if (this.y >= this.originY) {
      this.vy = 0;
      this.y = this.originY;
    }*/
    
    if (this.y < this.originY)
      this.vy += this.weight;

    this.colision();
  }

  colision() {
    if (
      this.game.player.x + this.game.player.width > this.x + 30 &&
      this.game.player.x + this.game.player.width < this.x + 40 &&
      this.game.player.y + this.game.player.height >= this.y &&
      this.game.player.y < this.y + this.height &&
      this.game.player.currentState.getState() != "DEADING"
    ) {
      this.game.player.isDeath = true;
      this.game.player.setState(7);
    }
    if (
      this.game.player.x < this.x + this.width - 30 &&
      this.game.player.x > this.x + this.width - 40 &&
      this.game.player.y + this.game.player.height >= this.y &&
      this.game.player.y < this.y + this.height &&
      this.game.player.currentState.getState() != "DEADING"
    ) {
      this.game.player.isDeath = true;
      this.game.player.setState(7);
    }

    if (
      this.game.player.x + this.game.player.width > this.x + 30 &&
      this.game.player.x < this.x + this.width - 30 &&
      this.game.player.y + this.game.player.height + this.game.player.vy >=
      this.y &&
      this.game.player.y + this.game.player.height + this.game.player.vy <
      this.y + this.height
    ) {
      this.marked = true;
    }
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

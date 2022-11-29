//TODO Criar uma classe mãe Inimigo e criar os inimigos como extensões dela
export class Crown {
  constructor(x, y, width, height, amplitude, game) {
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
  }

  update(speed, speedy, time) {
    this.x -= speed;
    this.y -= speedy;
    this.colision();
  }

  colision(){
    if (
        this.game.player.x + this.game.player.width > this.x + 30 &&
        this.game.player.x + this.game.player.width < this.x + 40 &&
        this.game.player.y + this.game.player.height >= this.y &&
        this.game.player.y < this.y + this.height &&
        this.game.player.currentState.getState() != 'DEADING'
      ) {
        this.game.player.isDeath = true;
        this.game.player.setState(7);
      }
      if (
        this.game.player.x < this.x + this.width - 30 &&
        this.game.player.x > this.x + this.width - 40 &&
        this.game.player.y + this.game.player.height >= this.y &&
        this.game.player.y < this.y + this.height &&
        this.game.player.currentState.getState() != 'DEADING'
      ) {
        this.game.player.isDeath = true;
        this.game.player.setState(7);
      }
  
      if (
          this.game.player.x + this.game.player.width > this.x + 30 &&
          this.game.player.x < this.x + this.width - 30 &&
          this.game.player.y + this.game.player.height + this.game.player.vy >= this.y &&
          this.game.player.y + this.game.player.height + this.game.player.vy < this.y + this.height
        ) {
          this.marked = true;
        }
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

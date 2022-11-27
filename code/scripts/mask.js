import { Shoot } from "./shoot.js";

export class Mask {
  constructor(x, y, width, height, game) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lastAttack = 0;
    this.speed = 0;
    this.previousState = 0;
    this.followingState = 1;
    this.marked = false;
    this.game = game;
    this.lastShoot = 0;
    this.lastKey = "E"
    this.shoots = [];
  }

  update(speed, speedy, time) {
    this.x -= speed;
    this.y += 5*Math.cos(1*Math.PI*(time/1000)) - speedy;
    if((time/1000)-this.lastShoot > 0.8){
        var s = new Shoot(
        this.x + this.width / 2,
        this.y + this.height / 2,
        35,
        12,
        this.game,
        this,
        "mask");
        this.lastShoot = time/1000;
        this.shoots.push(s);
    }
    console.log(this.shoots);
    this.shoots.forEach((s)=>{
        s.update(this.game.speedTileY);
    });
    //console.log(this.game);
    this.shoots.forEach((shoot)=>{
      if((shoot.x > this.game.player.x && shoot.x  < this.game.player.x + this.game.player.width) && (shoot.y + shoot.height >= this.game.player.y && shoot.y  < this.game.player.y + this.game.player.height)){
            this.game.player.isDeath = true;
            this.game.player.setState(7,0);      
            shoot.marked = true;
            console.log("oi oi ")
    }
    }
    );
    this.shoots = this.shoots.filter((shoot) => !shoot.marked);

  }

  draw(context) {
    this.shoots.forEach((s)=>{
        s.draw(context);
    });
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

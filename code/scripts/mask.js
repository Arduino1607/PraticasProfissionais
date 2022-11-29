//TODO Criar uma classe mãe Inimigo e criar os inimigos como extensões dela

import { Shoot } from "./shoot.js";

export class Mask {
  constructor(x, y, width, height, game) {
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
    this.lastShoot = 0;
    this.lastKey = "E";
    this.shoots = [];

  }

  update(speed, speedy, time) {
    this.x -= speed;
    this.y += 5 * Math.cos(1 * Math.PI * (time / 1000)) - speedy;    
    this.colision();
    this.attack(time);
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

  attack(time){
    if (
      time / 1000 - this.lastShoot > 0.8 &&
      this.game.player.x + this.game.CameraX > this.x + this.game.CameraX - 400
    ) {
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

    this.shoots.forEach((s) => {
      s.update(this.game.speedTileY);
    });

    this.shoots.forEach((shoot) => {
      if (
        shoot.x > this.game.player.x &&
        shoot.x < this.game.player.x + this.game.player.width &&
        shoot.y + shoot.height >= this.game.player.y &&
        shoot.y < this.game.player.y + this.game.player.height
      ) {
        this.game.player.isDeath = true;
        this.game.player.setState(7, 0);
        shoot.marked = true;
      }
    });

    this.shoots = this.shoots.filter((shoot) => !shoot.marked);
  }

  draw(context) {
    this.shoots.forEach((s) => {
      s.draw(context);
    });
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

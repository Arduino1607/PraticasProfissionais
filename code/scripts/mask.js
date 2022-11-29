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
    this.speed = -5;
    this.marked = false;
    this.lastAttack = 0;
  
    //specific variables
    this.lastShoot = 0;
    this.lastKey = "E";
    this.shoots = [];

    this.maxFrame = 2;
    this.fps = 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    this.framex = 0;
    this.framey = 0;

    this.origin = y;

    this.image = document.getElementById("mask");

  }

  update(speed, speedy, time, deltaTime) {
    this.x -= speed ;
    this.y -= speedy + this.speed;
    this.origin -= speedy;

    if(this.origin - this.y > 200){
      this.speed = -5;
      (this.game.player.x + this.game.CameraX > this.x + this.game.CameraX - 400)?this.framey = 0 : this.framey = 3;
    }else if(this.origin - this.y < 1){
      this.speed = 5;
      (this.game.player.x + this.game.CameraX > this.x + this.game.CameraX - 400)?this.framey = 1 : this.framey = 4;
    }
    this.maxFrame = 3;
    this.framex = 0;
    console.log(this.origin - this.y, this.speed)
    this.colision();
    this.animation(deltaTime);
    this.attack(time, deltaTime);
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

  attack(time, deltaTime){
    if (
      time / 1000 - this.lastShoot > 0.8 &&
      this.game.player.x + this.game.CameraX > this.x + this.game.CameraX - 400
    ) {
      var s = new Shoot(
        this.x + this.width / 2,
        this.y + this.height / 2,
        16,
        16,
        this.game,
        this,
        "mask");
        this.lastShoot = time/1000;
        this.shoots.push(s);
        this.framey = 2;
        this.framex = 0;
        this.maxFrame = 1;
    }

    this.shoots.forEach((s) => {
      s.update(this.game.speedTileY, deltaTime);
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
    );  }
}

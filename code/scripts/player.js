import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Attacking,
  Idle,
  Climbing,
  Deading,
  Ball,
} from "./playerState.js";
import { Shoot } from "./shoot.js";

export class Player {
  constructor(game) {
    //player variables
    this.game = game;
    this.image = document.getElementById("player");
    this.width = 96;
    this.height = 96;

    //position variables
    this.x = 50;
    this.y = this.game.height - this.height - this.game.groundMargin;

    //movement variables
    this.speed = 0;
    this.maxSpeed = 5;
    this.vy = 0;
    this.weight = 1;

    //animation variables
    this.framex = 0;
    this.framey = 0;
    this.maxFrame = 5;
    this.fps = 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    //state variables
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Attacking(this),
      new Idle(this),
      new Climbing(this),
      new Deading(this),
      new Ball(this),
    ];
    this.currentState = this.states[5];
    this.lastKey = "D";
    this.isDeath = false;
    this.currentState.enter();

    //shoots
    this.shoots = [];
  }

  update(input, deltaTime, context) {
    
    this.currentState.handleInput(input);

    if (this.isDeath == false) {

      this.x += this.speed;
      this.y += this.vy;
      this.game.speedTile = 0;
      
      this.climbing();

      this.game.tiles.forEach((tile) => {
        if (
          this.x + this.width > tile.x + 30 &&
          this.x + this.width < tile.x + 40 &&
          this.y + this.height >= tile.y &&
          this.y < tile.y + tile.height
        )
          this.x = tile.x - this.width + 30;
        if (
          this.x < tile.x + tile.width - 30 &&
          this.x > tile.x + tile.width - 40 &&
          this.y + this.height >= tile.y &&
          this.y < tile.y + tile.height
        )
          this.x = tile.x + tile.width - 30;
      });
      
      //horizontal movement
      if (input.includes("ArrowRight")) {
        this.speed = this.maxSpeed;
        this.lastKey = "D";
      } else if (input.includes("ArrowLeft")) {
        this.speed = -this.maxSpeed;
        this.lastKey = "E";
      }
      else {
        this.speed = 0;
      }

      //borders
      if (this.x + 30 < 0){
         this.x = -30;
      }
      if (this.game.CameraX < this.game.end) {
        if (this.x > (this.game.width - this.width + 30) / 2) {
          this.x = (this.game.width - this.width + 30) / 2;
          this.game.speedTile = this.maxSpeed;
        }
      }
      console.log(this.x, this.game.CameraX);
      
      //vertical movement
      let DistanceToGround = this.onGround();
      if (DistanceToGround == 0 && this.currentState.getState() != "CLIMBING") {
        if (this.y + this.height >= this.game.height - this.game.groundMargin) {
          this.y = this.game.height - this.game.groundMargin - this.height;
          this.game.speedTileY += this.weight;
        } else {
          this.vy += this.weight;
        }
        this.game.thorns.forEach((thorn) => {
          if (
            this.x + this.width > thorn.x + 30 &&
            this.x < thorn.x + thorn.width - 30 &&
            this.y + this.height + this.vy >= thorn.y &&
            this.y + this.height + this.vy < thorn.y + thorn.height
          ) {
            this.isDeath = true;
            this.game.speedTileY = 0;
            this.setState(7);
          }
        });
        if (this.y > 1500) {
          this.isDeath = true;
          this.setState(7);
        }
      } else if (this.currentState.getState() != "CLIMBING") {
        this.vy = 0;
        this.y = DistanceToGround - this.height;
        this.game.speedTileY = 0;
      }
    }
    this.animation(deltaTime);
    this.shoots.forEach((shoot) => {
      shoot.update(this.game.speedTileY);
    });
  }

  climbing(){
    var onStair = false;
    if (this.currentState.getState() == "CLIMBING") {
      if (this.y + this.height >= this.game.height - this.game.groundMargin) {
        this.y = this.game.height - this.game.groundMargin - this.height;
        this.game.speedTileY = 1;
      }
      if (this.y <= this.game.height / 2 + (this.height - this.game.groundMargin) + 40) {
        this.y = this.game.height / 2 + (this.height - this.game.groundMargin) + 40;
        this.game.speedTileY = -1;
      }
      this.game.stairs.forEach((stair) => {
        if (
          this.x + this.width / 2 - 10 > stair.x &&
          this.x + this.width / 2 + 10 < stair.x + stair.width &&
          this.y + this.height >= stair.y &&
          this.y + this.height < stair.y + stair.height
        ) {
          onStair = true;
        }
      });
      if (!onStair) { 
        this.setState(5);
      }
    }
  }

  animation(deltaTime){
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.framex < this.maxFrame - 1){
       this.framex++;
      }else if (this.currentState.getState() == "ATTACKING") {
        var s = new Shoot(
          this.x + this.width / 2,
          this.y + this.height / 2,
          35,
          12,
          this.game,
          this,
          "player"
        );
        this.shoots.push(s);
        this.setState(5);
      } else if (this.currentState.getState() == "DEADING"){
        this.isDeath = true;
      } 
      else{
        this.framex = 0;
      } 
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    
    this.shoots.forEach((shoot) => {
      shoot.draw(context);
    });
    this.shoots = this.shoots.filter((shoot) => !shoot.marked);

    context.fillRect(
      0,
      this.game.height - this.game.groundMargin,
      this.game.width,
      1
    );

    context.save();

    if (this.speed > 0) 
      context.scale(1, 1);
    else if (this.speed > 0)
      context.scale(-1, 1);
    else 
      (this.lastKey == "D") ? context.scale(1, 1) : context.scale(-1, 1);      
      


    let x = 0;
    if (this.speed > 0) {
      x = this.x;
    } else if (this.speed < 0) {
      x = (this.x + this.width) * -1;
    } else {
      if (this.lastKey == "D")
        x = this.x;
      else
        x = (this.x + this.width) * -1;
    }

    context.drawImage(
      this.image,
      this.framex * 32,
      this.framey * 32 + 1,
      32,
      32,
      x,
      this.y,
      this.width,
      this.height
    );
    

    context.restore();
  }

  onGround() {
    let DistanceToGround = 0;
    this.game.tiles.forEach((tile) => {
      if (
        this.x + this.width > tile.x + 30 &&
        this.x < tile.x + tile.width - 30 &&
        this.y + this.height + this.vy >= tile.y &&
        this.y + this.height + this.vy < tile.y + tile.height
      ) {
        DistanceToGround = tile.y;
      }
    });
    this.game.stairs.forEach((stair) => {
      if (
        this.x + this.width / 2 + 10 > stair.x &&
        this.x + this.width / 2 - 10 < stair.x + stair.width &&
        this.y + this.height >= stair.y &&
        this.y + this.height < stair.y + 20
      ) {
        DistanceToGround = stair.y;
      }
    });
    return DistanceToGround;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.MaxSpeed * speed;
    this.currentState.enter();
  }
}

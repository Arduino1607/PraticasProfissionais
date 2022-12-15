import {
    Left,
    Right,
    Up,
    Down,
    IDLE
  } from "./playerStateBoss.js";
  import { Shoot } from "./shoot.js";
import { Tile } from "./tile.js";
  
  export class Player {
    constructor(game) {
      //player variables
      this.game = game;
      this.image = document.getElementById("dancing");
      this.width = 128;
      this.height = 128;
  
      //position variables
      this.x = 458;
      this.y = this.game.height - this.height - this.game.groundMargin + 38;
   
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
        new Left(this),
        new Right(this),
        new Up(this),
        new Down(this),
        new IDLE(this)
      ];

      
      this.currentState = this.states[0];
      this.lastKey = "D";
      this.isDeath = false;
      this.currentState.enter();
  
      //shoots
      this.shoots = [];
    }
  
    update(input, deltaTime, context) {
      
      this.currentState.handleInput(input);
      this.x += this.speed;
      //this.y += this.vy;
        
        
        //horizontal movement
        if (input.includes("ArrowRight")) {
         
          this.setState(1)
          
        } else if (input.includes("ArrowLeft")) {
            this.setState(0)
          
          
        }else if (input.includes("ArrowUp")) {
            
            this.setState(2)
            
          } else if (input.includes("ArrowDown")) {
              this.setState(3)
          }else{
            this.setState(4);
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
       
      
      this.animation(deltaTime);
    }
  
    animation(deltaTime){
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if (this.framex < this.maxFrame - 1){
         this.framex++;
        } else{
          this.framex = this.framex;
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
  
      //context.fillRect(
        0,
        this.game.height - this.game.groundMargin,
        this.game.width,
        1
      //);
  
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
        this.framex * 62,
        this.framey * 62 + 1,
        62,
        62,
        x,
        this.y,
        this.width,
        this.height
      );
      
  
      context.restore();
    }
    setState(state, speed) {
        if(state != this.currentState){
        this.currentState = this.states[state];
        this.currentState.enter();
        }
    }
}
  
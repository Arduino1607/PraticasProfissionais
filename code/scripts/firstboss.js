import { Player } from "./playerBoss.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { Cerci } from "./cerci.js";
import { Tile } from "./tile.js";
export class firstBoss {
  constructor(width, height, image, end, tiles, stairs, thorns, enemys) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.speed = 0;
    this.MaxSpeed = 3;
    this.speedTile = 0;
    this.speedTileY = 0;

    this.image = document.getElementById(image);

    this.beginX = 100;
    this.beginY = 250;
    this.CameraX = 0;
    this.CameraY = 0;
    this.end = end;

    this.player = new Player(this);
    this.input = new InputHandler();
    this.cerci = new Cerci(1000,140,240,320,"cerci");

    this.placar = 0;

    this.tiles = [
      
    ];
    this.stairs = [
    ];
    this.thorns = [
    ];
    this.enemys = [
    ];
    this.arrows = [
    ];

    this.line = new Tile(
      400,
      200,
      256,
      64,
      0,
      0,
      128,
      32,
      "arrowsEmpty"
    )

    for(let i = 0; i < 16; i++){

        let a = new Tile(
            400 + 64*(i%4),
            -(100 * i),
            64,
            64,
            32*(i%4),
            0,
            32,
            32,
            "arrows"
        );
        
        this.arrows.push({0:a,1:i%4});
    }
  }

  update(deltaTime, context, timeStamp) {
    this.CameraX += this.speedTile;
    this.CameraY += this.speedTileY;
    this.line.update(0,0);
    //console.log(this.CameraX, this.CameraY, this.end);

    this.cerci.update(this.placar,deltaTime);

    this.tiles.forEach((tile) => {
      tile.update(this.speedTile, this.speedTileY);
    });
    this.arrows.forEach((arrows) => {
        arrows[0].update(this.speedTile, -2);
        if (
          arrows[0].x < this.line.x + this.line.width &&
          arrows[0].x + arrows[0].width > this.line.x &&
          arrows[0].y - 64 < this.line.y + this.line.height &&
          arrows[0].height - 64 + arrows[0].y > this.line.y
        ){
          arrows[0].marked = true;
          if(arrows[1] == 0 ){
            if(this.player.currentState.getState() == "RIGHT"){
              this.placar++;
            }else{
              this.placar--;
            }
          }
          if(arrows[1] == 1 ){
            if(this.player.currentState.getState() == "UP"){
              this.placar++;
            }else{
              this.placar--;
            }
          }
          if(arrows[1] == 2 ){
            if(this.player.currentState.getState() == "LEFT"){
              this.placar++;
            }else{
              this.placar--;
            }
          }
          if(arrows[1] == 3 ){
            if(this.player.currentState.getState() == "DOWN"){
              this.placar++;
            }else{
              this.placar--;
            }
          }
        }

        //console.log(this.placar)
    });
    this.player.update(this.input.keys, deltaTime, context);
  }

  draw(context) {
    
    this.tiles.forEach((tile) => {
      tile.draw(context);
    });
    context.drawImage(this.image, 0, 0, this.width, this.height);
    this.line.draw(context);
    this.cerci.draw(context);
    this.arrows = this.arrows.filter((arrow) => !arrow[0].marked);
    this.arrows.forEach((s) => {
      s[0].draw(context);
    });
    this.player.draw(context);
  }
}

import { Player } from "./playerBoss.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { Crown } from "./crown.js";
import { Mask } from "./mask.js";
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

    this.image = image;

    this.beginX = 100;
    this.beginY = 250;
    this.CameraX = 0;
    this.CameraY = 0;
    this.end = end;

    this.player = new Player(this);
    this.input = new InputHandler();

    this.tiles = [
      new Tile(
        0,
        this.height - this.groundMargin,
        this.width+400,
        266,
        106,
        64,
        1600,
        135,
        "Mapa"
      ),
    ];
    this.stairs = [
    ];
    this.thorns = [
    ];
    this.enemys = [
    ];
    this.arrows = [
    ];
    for(let i = 0; i < 16; i++){

        let a = new Tile(
            400 + 64*(i%4),
            this.height - this.groundMargin - (100 * i),
            64,
            64,
            16*(i%4),
            0,
            16,
            16,
            "arrows"
        );
        this.arrows.push(a);
    }
  }

  update(deltaTime, context, timeStamp) {
    this.CameraX += this.speedTile;
    this.CameraY += this.speedTileY;
    console.log(this.CameraX, this.CameraY, this.end);

    this.tiles.forEach((tile) => {
      tile.update(this.speedTile, this.speedTileY);
    });
    this.arrows.forEach((arrows) => {
        arrows.update(this.speedTile, -1);
    });
    this.player.update(this.input.keys, deltaTime, context);
  }

  draw(context) {
    this.tiles.forEach((tile) => {
      tile.draw(context);
    });
    this.arrows.forEach((s) => {
      s.draw(context);
    });
    this.enemys = this.enemys.filter((enemy) => !enemy.marked);
    this.player.draw(context);
  }
}

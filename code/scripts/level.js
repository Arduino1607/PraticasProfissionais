import { Player } from "./player.js";
import { InputHandler } from "./input.js";
export class Level {
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

    this.tiles = tiles;
    this.stairs = stairs;
    this.thorns = thorns;
    this.enemys = enemys;
  }

  update(deltaTime, context, timeStamp) {
    this.CameraX += this.speedTile;
    this.CameraY += this.speedTileY;
    console.log(this.CameraX, this.CameraY, this.end);

    this.tiles.forEach((tile) => {
      tile.update(this.speedTile, this.speedTileY);
    });
    this.thorns.forEach((thorn) => {
      thorn.update(this.speedTile, this.speedTileY);
    });
    this.stairs.forEach((s) => {
      s.update(this.speedTile, this.speedTileY);
    });
    this.enemys.forEach((s) => {
      s.update(this.speedTile, this.speedTileY, timeStamp, deltaTime);
    });
    this.player.update(this.input.keys, deltaTime, context);
  }

  draw(context) {
    context.drawImage(fundo, 0, 0, this.width, this.height);
    this.tiles.forEach((tile) => {
      tile.draw(context);
    });
    this.stairs.forEach((s) => {
      s.draw(context);
    });
    this.thorns.forEach((thorn) => {
      thorn.draw(context);
    });
    this.enemys.forEach((s) => {
      s.draw(context);
    });
    this.enemys = this.enemys.filter((enemy) => !enemy.marked);
    this.player.draw(context);
  }
}

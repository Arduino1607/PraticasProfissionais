import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { Crown } from "./crown.js";
import { Mask } from "./mask.js";
import { Tile } from "./tile.js";
export class Level1 {
  constructor(width, height, image, end, tiles, stairs, thorns, enemys) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.speed = 0;
    this.MaxSpeed = 3;
    this.speedTile = 0;
    this.speedTileY = 0;
    this.image = document.getElementById("fundo");

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
        62,
        this.height - this.groundMargin - 560,
        3200,
        266,
        106,
        64,
        1600,
        135,
        "Mapa"
      ),
      new Tile(
        -4,
        this.height - this.groundMargin - 560,
        66,
        560,
        0,
        66,
        30,
        280,
        "Mapa"
      ),
      new Tile(
        0,
        this.height - this.groundMargin,
        580,
        510,
        0,
        385,
        290,
        255,
        "Mapa"
      ),
      new Tile(
        580 + 64,
        this.height - this.groundMargin,
        792,
        192,
        320,
        385,
        353,
        127,
        "Mapa"
      ),
      new Tile(
        580,
        this.height - this.groundMargin + 448,
        300,
        66,
        288,
        607,
        97,
        35,
        "Mapa"
      ),
      new Tile(
        1008,
        this.height - this.groundMargin + 448,
        130,
        64,
        448,
        607,
        64,
        33,
        "Mapa"
      ),
      new Tile(
        1266,
        this.height - this.groundMargin + 448,
        230,
        66,
        575,
        607,
        130,
        33,
        "Mapa"
      ),
      new Tile(
        1496,
        this.height - this.groundMargin,
        128,
        513,
        704,
        385,
        63,
        255,
        "Mapa"
      ),
      new Tile(
        1624,
        this.height - this.groundMargin + 324,
        324,
        188,
        769,
        546,
        162,
        94,
        "Mapa"
      ),
      new Tile(
        1948,
        this.height - this.groundMargin + 260,
        66,
        254,
        930,
        514,
        33,
        127,
        "Mapa"
      ),
      new Tile(
        2014,
        this.height - this.groundMargin + 198,
        188,
        314,
        962,
        482,
        94,
        158,
        "Mapa"
      ),
      new Tile(
        2080 + 188 + 33,
        this.height - this.groundMargin + 198,
        132,
        25,
        1089,
        481,
        60,
        10,
        "Mapa"
      ),
      new Tile(
        2499,
        this.height - this.groundMargin + 198,
        132,
        25,
        1089,
        481,
        60,
        10,
        "Mapa"
      ),
      new Tile(
        2499 + 132 + 99,
        this.height - this.groundMargin + 198,
        64,
        25,
        1313,
        481,
        32,
        10,
        "Mapa"
      ),
      new Tile(
        2858,
        this.height - this.groundMargin + 198,
        386,
        320,
        1377,
        481,
        193,
        160,
        "Mapa"
      ),
      new Tile(
        2858 + 386,
        this.height - this.groundMargin - 572,
        60,
        1086,
        1570,
        96,
        30,
        544,
        "Mapa"
      ),
    ];
    this.stairs = [
      new Tile(
        580,
        this.height - this.groundMargin,
        64,
        450,
        288,
        385,
        32,
        224,
        "Mapa"
      ),
      new Tile(
        1436,
        this.height - this.groundMargin,
        64,
        450,
        672,
        386,
        32,
        224,
        "Mapa"
      ),
    ];
    this.thorns = [
      new Tile(
        580 + 300,
        this.height - this.groundMargin + 448 + 37,
        130,
        25,
        385,
        630,
        65,
        10,
        "Mapa"
      ),
      new Tile(
        1008 + 130,
        this.height - this.groundMargin + 448 + 37,
        130,
        25,
        513,
        630,
        65,
        10,
        "Mapa"
      ),
      new Tile(
        2014 + 188,
        this.height - this.groundMargin + 198 + 310 - 20,
        658,
        25,
        1057,
        630,
        320,
        10,
        "Mapa"
      ),
    ];
    this.enemys = [
      new Crown(700, this.height - this.groundMargin - 96, 96, 96, 1, this, 0.5),
      new Crown(800, this.height - this.groundMargin - 96, 96, 96, -1,this, 0.5),
      new Crown(617+1280, 348 + 360 - 64, 96, 96, 1, this, 0.4,"crown"),
      new Mask(1050, this.height - this.groundMargin  + 390, 96, 96, this),
      new Mask(937 + 1950, 190 + 340, 96, 96, this),
    ];
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

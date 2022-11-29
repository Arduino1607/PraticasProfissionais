//TODO salvar estado inicial para retornar a ele quando o jogo for reiniciado 
import { Background } from "./background.js";
import { Crown } from "./crown.js";
import { InputHandler } from "./input.js";
import { Mask } from "./mask.js";
import { Player } from "./player.js";
import { Stairs } from "./stairs.js";
import { Thorns } from "./thorns.js";
import { Tile } from "./tile.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1350;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.MaxSpeed = 3;
      this.speedTile = 0;
      this.speedTileY = 0;

      this.beginX = 100;
      this.beginY = 250;
      this.CameraX = 0;
      this.CameraY = 0;
      this.end = 1950;

      this.player = new Player(this);
      this.background = new Background(this);
      this.input = new InputHandler();
      this.tiles = [
        new Tile(
          66,
          this.height - this.groundMargin - 560,
          3200,
          270,
          106,
          66,
          1600,
          135
        ),
        new Tile(
          0,
          this.height - this.groundMargin - 560,
          66,
          560,
          0,
          66,
          32,
          280
        ),
        new Tile(
          0,
          this.height - this.groundMargin,
          580,
          510,
          0,
          384,
          290,
          255
        ),
        new Tile(
          580 + 64,
          this.height - this.groundMargin,
          792,
          192,
          320,
          383,
          353,
          127
        ),
        new Tile(
          580,
          this.height - this.groundMargin + 448,
          300,
          66,
          288,
          607,
          97,
          35
        ),
        new Tile(
          1008,
          this.height - this.groundMargin + 448,
          130,
          64,
          448,
          607,
          64,
          33
        ),
        new Tile(
          1266,
          this.height - this.groundMargin + 448,
          230,
          66,
          575,
          607,
          130,
          33
        ),
        new Tile(
          1496,
          this.height - this.groundMargin,
          128,
          513,
          704,
          385,
          64,
          255
        ),
        new Tile(
          1624,
          this.height - this.groundMargin + 324,
          324,
          188,
          769,
          546,
          162,
          94
        ),
        new Tile(
          1948,
          this.height - this.groundMargin + 260,
          66,
          254,
          930,
          514,
          33,
          127
        ),
        new Tile(
          2014,
          this.height - this.groundMargin + 198,
          188,
          314,
          962,
          482,
          94,
          158
        ),
        new Tile(
          2080 + 188 + 33,
          this.height - this.groundMargin + 198,
          132,
          25,
          1089,
          481,
          60,
          10
        ),
        new Tile(
          2499,
          this.height - this.groundMargin + 198,
          132,
          25,
          1089,
          481,
          60,
          10
        ),
        new Tile(
          2499 + 132 + 99,
          this.height - this.groundMargin + 198,
          64,
          25,
          1313,
          481,
          32,
          10
        ),
        new Tile(
          2858,
          this.height - this.groundMargin + 198,
          386,
          320,
          1377,
          481,
          193,
          160
        ),
        new Tile(
          2858 + 386,
          this.height - this.groundMargin - 572,
          60,
          1086,
          1570,
          96,
          30,
          544
        ),
      ];
      this.stairs = [
        new Stairs(
          580,
          this.height - this.groundMargin,
          64,
          450,
          288,
          385,
          32,
          224
        ),
        new Stairs(
          1436,
          this.height - this.groundMargin,
          64,
          450,
          672,
          386,
          32,
          224
        ),
      ];
      this.thorns = [
        new Thorns(
          580 + 300,
          this.height - this.groundMargin + 448 + 37,
          130,
          25,
          385,
          630,
          65,
          10
        ),
        new Thorns(
          1008 + 130,
          this.height - this.groundMargin + 448 + 37,
          130,
          25,
          513,
          630,
          65,
          10
        ),
        new Thorns(
          2014 + 188,
          this.height - this.groundMargin + 198 + 310 - 20,
          658,
          25,
          1057,
          630,
          320,
          10
        ),
      ];
      this.crowns = [
        new Crown(700, this.height - this.groundMargin - 50, 50, 50, 10, this),
        new Crown(1200, this.height - this.groundMargin - 50, 50, 50, 10,this),
        new Crown(442 + 1390, 348 + 340, 50, 50, 6, this),
        new Mask(1050, this.height - this.groundMargin + 350, 50, 50, this),
        new Mask(937 + 1950, 190 + 340, 50, 50, this),
      ];
    }

    update(deltaTime, context, timeStamp) {
      this.CameraX += this.speedTile;
      this.CameraY += this.speedTileY;

      this.background.update();

      this.tiles.forEach((tile) => {
        tile.update(this.speedTile, this.speedTileY);
      });
      this.thorns.forEach((thorn) => {
        thorn.update(this.speedTile, this.speedTileY);
      });
      this.stairs.forEach((s) => {
        s.update(this.speedTile, this.speedTileY);
      });
      this.crowns.forEach((s) => {
        s.update(this.speedTile, this.speedTileY, timeStamp);
      });
      this.player.update(this.input.keys, deltaTime, context);
    }

    draw(context) {
      this.tiles.forEach((tile) => {
        tile.draw(context);
      });
      this.stairs.forEach((s) => {
        s.draw(context);
      });
      this.thorns.forEach((thorn) => {
        thorn.draw(context);
      });
      this.crowns.forEach((s) => {
        s.draw(context);
      });
      this.crowns = this.crowns.filter((crown) => !crown.marked);
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime, ctx, timeStamp);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});

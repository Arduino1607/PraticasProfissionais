//TODO salvar estado inicial para retornar a ele quando o jogo for reiniciado 
//TODO corrigir erros nas cameras
import { firstBoss } from "./firstboss.js";
import {Level1} from "./level1.js"

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

      

      
      this.levels = [new Level1(this.width, this.height, this.image,1950),new firstBoss(this.width, this.height, this.image,1950)]
      this.level = this.levels[1];
    }

    update(deltaTime, context, timeStamp) {
      
      this.level.update(deltaTime, context, timeStamp);
      
    }

    draw(context) {
     
      this.level.draw(context);

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

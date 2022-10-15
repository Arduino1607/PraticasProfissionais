import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {Tile} from './tile.js'
import { Stairs } from './stairs.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1350;
    canvas.height = 500;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.MaxSpeed = 3;
            this.player = new Player(this);
            this.background = new Background(this);
            this.input = new InputHandler();
            this.tile = new Tile(520, 250, 250,140);
            this.tile1 = new Tile(920, 250, 250,70);
            this.tile2 = new Tile(1420, 250, 250,70);
            this.tile3 = new Tile(1820, 250, 250,70);
            this.tile4 = new Tile(2220, 250, 250,70);
            this.tile5 = new Tile(2620, 250, 250,70);
            this.tile6 = new Tile(2920, 250, 250,70);
            this.tile7 = new Tile(3320, 250, 250,70);
            this.tile8 = new Tile(0, this.height - this.groundMargin, 3320,100);
            this.tiles = [this.tile8,this.tile, this.tile1, this.tile2, this.tile3, this.tile4, this.tile5, this.tile6, this.tile7];
            this.stairs = [new Stairs(420,250,40,175), new Stairs(820,250,40,175)];
            this.speedTile = 0;
        }
        
        update(deltaTime, context){
            this.background.update();
            this.tiles.forEach(tile=>{
                tile.update(this.speedTile);
            })
            this.stairs.forEach(s=>{
                s.update(this.speedTile);
            })
            this.player.update(this.input.keys, deltaTime, context);
        }

        draw(context){
            this.tiles.forEach(tile=>{
                tile.draw(context)
            })
            this.stairs.forEach(s=>{
                s.draw(context)
            })
            //this.background.draw(context);
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width,canvas.height);
    //console.log(game);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        //console.log(deltaTime);
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.update(deltaTime, ctx);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});

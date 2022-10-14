import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'
import {Tile} from './tile.js'


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
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
            this.tile = new Tile(120, 230, 100,200);
            this.tile1 = new Tile(350, 230, 100,80);
            this.tiles = [this.tile, this.tile1];
        }
        
        update(deltaTime, context){
            this.background.update();
            this.player.update(this.input.keys, deltaTime, context);
        }

        draw(context){
            this.tiles.forEach(tile=>{
                tile.draw(context)
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

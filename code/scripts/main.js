import {Player} from './player.js'
import {InputHandler} from './input.js'
import {Background} from './background.js'


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
        }
        
        update(deltaTime, context){
            this.background.update();
            this.player.update(this.input.keys, deltaTime, context);
        }

        draw(context){
            this.background.draw(context);
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

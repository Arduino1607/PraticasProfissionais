export class Shoot{
    constructor(x, y, width, height, game, player, origin){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 20;
        this.game = game;
        this.player = player;
        this.marked = false;
        this.origin = origin;
        if(this.player.lastKey == "D")
            this.speed = 15;
        else
            this.speed = -15;

        this.image = document.getElementById("fireball");
        this.framex = 0;
        this.framey = 0;
        this.maxFrame = 2;
        this.fps = 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    update(speedy, deltaTime){
        
        this.x += this.speed;
        this.y -= this.game.speedTileY;
        this.game.tiles.forEach(tile=>{
            if((this.x + this.width > tile.x && this.x + this.width < tile.x + 20) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height)){
                this.marked = true;
            }
            if((this.x > tile.x && this.x  < tile.x + tile.width) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height)){
                this.marked = true;
            }
        })
        if(this.origin == "player"){
            this.game.enemys.forEach(tile=>{
                if((this.x + this.width > tile.x && this.x + this.width < tile.x + 20) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height)){
                    tile.marked = true;
                    this.marked = true;
                }
            }); 
        }
        /*if((this.x > this.player.x && this.x  < this.player.x + this.player.width) && (this.y + this.height >= this.player.y && this.y  < this.player.y + this.player.height)){
            this.player.isDeath = true;
            //this.player.setState(7,0);      
            this.marked = true;
            console.log("oi oi ")
        }*/
        this.animation(deltaTime);
    }

    animation(deltaTime){
        if (this.frameTimer > this.frameInterval) {
          this.frameTimer = 0;
          if (this.framex < this.maxFrame - 1){
           this.framex++;
          }else{
            this.framex = 0;
          } 
        } else {
          this.frameTimer += deltaTime;
        }
    }

    draw(context){
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.framex * 8,
            this.framey * 8 + 1,
            8,
            8,
            this.x,
            this.y,
            this.width,
            this.height
          );
    }

}
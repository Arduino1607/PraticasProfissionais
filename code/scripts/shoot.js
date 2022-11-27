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
    }

    update(speedy){
        
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
            this.game.crowns.forEach(tile=>{
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
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}
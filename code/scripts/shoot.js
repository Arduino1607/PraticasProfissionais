export class Shoot{
    constructor(x, y, width, height, player){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 20;
        this.player = player;
        this.marked = false;
    }

    update(){
        this.x += this.speed;
        this.player.game.tiles.forEach(tile=>{
            if((this.x + this.width > tile.x && this.x + this.width < tile.x + 20) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height)){
                this.marked = true;
            }
        })
        this.player.game.crowns.forEach(tile=>{
            if((this.x + this.width > tile.x && this.x + this.width < tile.x + 20) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height)){
                tile.marked = true;
                this.marked = true;
            }
        })
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}
export class Tile{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(){

    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}
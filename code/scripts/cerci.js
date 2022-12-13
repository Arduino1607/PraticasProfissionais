export class Cerci{
    constructor(x, y, width, height, image){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = document.getElementById(image);
        this.marked = false;
        this.i = 0;
    }

    update(placar){
        if(placar < 0)
            this.i = 4 - Math.round(-1*placar/4);
        else
            this.i = 4;
    }

    draw(context){
        context.drawImage(
            this.image,
            40*this.i,
            0,
            40,
            40,
            this.x,
            this.y,
            this.width,
            this.height
          );
        //context.fillRect(this.x, this.y, this.width, this.height);
    }

}
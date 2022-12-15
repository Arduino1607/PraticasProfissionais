import {Level2} from "./level2.js"

export class Door{
    constructor(x, y, width, height, xi, yi, xf, yf, image, player){
        this.x = x; 
        this.y = y;
        this.xi = xi;
        this.yi = yi;
        this.xf = xf;
        this.yf = yf;
        this.width = width;
        this.height = height;
        this.image = document.getElementById(image);
        this.marked = false;
        this.level = new Level2(this.width, this.height, this.image,1950);
    }

    update(speed, speedy){
        this.x -= speed;
        this.y -= speedy;

       
    }

    draw(context){
        context.drawImage(
            this.image,
            this.xi,
            this.yi,
            this.xf,
            this.yf,
            this.x,
            this.y,
            this.width,
            this.height
          );
        //context.fillRect(this.x, this.y, this.width, this.height);
    }

}
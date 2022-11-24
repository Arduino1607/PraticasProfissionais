export class Stairs{
    constructor(x, y, width, height, xi, yi, xf, yf){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = document.getElementById("Mapa");
        this.xi = xi;
        this.yi = yi;
        this.xf = xf;
        this.yf = yf;
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
        /*context.save();
        context.fillStyle = "#FF0000";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();*/
    }

}
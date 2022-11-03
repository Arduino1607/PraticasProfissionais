export class Thorns{
    constructor(x, y, width, height){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = document.getElementById("Mapa");
    }

    update(speed, speedy){
        this.x -= speed;
        this.y -= speedy;
    }

    draw(context){
        context.save();
        context.fillStyle = "green";
        context.fillRect(this.x, this.y, this.width, this.height);
        
        context.restore();
    }

}
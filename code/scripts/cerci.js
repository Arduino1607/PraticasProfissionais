export class Cerci{
    constructor(x, y, width, height, image){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = document.getElementById(image);
        this.marked = false;
        this.i = 0;

        this.maxFrame = 2;
        this.frameX = 0;
        this.frameY = 0;

        this.fps = 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.lastPlacar = 0;
    }

    update(placar,deltaTime){
        if(placar < 0 && this.frameY < 5){
            if((placar*-1)%4 == 0 && placar != this.lastPlacar){
               console.log(placar)
               this.frameY++;
               this.lastPlacar = placar;
            }
        }else if(placar > 0 && this.frameY > 0){
            if(placar%4 == 0 && placar != this.lastPlacar){
               console.log(placar)
               this.frameY--;
               this.lastPlacar = placar;
            }
        }
        console.log(deltaTime)
        this.animation(deltaTime);
    }
    
    animation(deltaTime){
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame - 1){
            this.frameX++;
            }else{
            this.frameX = 0;
            } 
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context){
        context.drawImage(
            this.image,
            this.frameX*160,
            this.frameY*240,
            160,
            240,
            this.x,
            this.y,
            this.width,
            this.height
          );
        //context.fillRect(this.x, this.y, this.width, this.height);
    }

}
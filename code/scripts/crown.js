export class Crown{
    constructor(x, y, width, height){
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.lastAttack = 0;
        this.speed = 0;
        this.previousState = 0;
        this.followingState = 1;
        this.marked = false;
    }

    update(speed, speedy, time){
        this.x -= speed + this.speed;
        this.y -= speedy;
        if((time/1000) - this.lastAttack >= 1){
        if(this.previousState == 0){
            this.speed = 0;
            if((time/1000) - this.lastAttack >= 0.5){
                this.previousState = this.followingState;
                this.followingState = 0;
                this.lastAttack = time/1000;
            }
        }else{
            if((time/1000) - this.lastAttack >= 1){
                if(this.previousState == -1){
                    this.speed = -5;
                    this.followingState = 1;
                }
                if(this.previousState == 1){
                    this.speed = 5;
                    this.followingState = -1;
                }
                this.previousState = 0;
                this.lastAttack = time/1000;
            }
        }
    }
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}
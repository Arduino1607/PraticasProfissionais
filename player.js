import { Sitting, Running, Jumping, Falling, Attacking, Idle, Climbing, Deading } from "./playerState.js";

export class Player{
    constructor(game){
        this.game = game;
        this.isDeath = false;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.speed = 0;
        this.maxSpeed = 5;
        this.vy = 0;
        this.weight = 1;
        this.framex = 0;
        this.framey = 0;
        this.maxFrame = 5;
        this.fps = 20;  
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.image = document.getElementById('player');
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Attacking(this), new Idle(this), new Climbing(this),new Deading(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime){
        if(this.isDeath == false){
            this.currentState.handleInput(input);
            this.x += this.speed;

            if(input.includes('w')){
                this.vy = -0.5;
                this.setState(6)
            }else if(input.includes(' ')){
                this.vy = 0;
                this.setState(1);
            }
            if(input.includes('ArrowRight'))
                this.speed = this.maxSpeed;
            else if(input.includes('ArrowLeft'))
                this.speed = -this.maxSpeed;
            else
                this.speed = 0;
            if(this.x < 0)
                this.x = 0;
            if(this.x > this.game.width - this.width) 
                this.x = this.game.width - this.width;
        
            //vertical movement
            this.y += this.vy;
            if(input.includes('ArrowUp') && this.onGround())
                this.vy -= 15;
            else if(!this.onGround() && this.currentState.getState() != "CLIMBING")
                this.vy += this.weight ; 
            else if(this.currentState.getState() != "CLIMBING")
                this.vy = 0;
            
            //sprite animation
            if(this.frameTimer > this.frameInterval){
                this.frameTimer = 0;
                if(this.framex < this.maxFrame-1) 
                    this.framex++;
                else if(this.currentState.getState() == "ATTACKING") 
                    this.setState(5)
                else if(this.currentState.getState() == "DEADING")
                    this.isDeath = true;
                else 
                    this.framex = 0;
            }else{
                this.frameTimer += deltaTime;
            }
        }
    }

    draw(context){
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.framex * this.width, this.framey * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state){
            this.currentState = this.states[state];
            this.currentState.enter();
    }
}   
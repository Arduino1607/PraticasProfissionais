import { Sitting, Running, Jumping, Falling, Attacking, Idle, Climbing, Deading, Ball } from "./playerState.js";

export class Player{
    constructor(game){
        //player variables
        this.game = game;
        this.image = document.getElementById('player');
        this.width = 96;
        this.height = 96;

        //position variables
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        
        //movement variables
        this.speed = 0;
        this.maxSpeed = 5;
        this.vy = 0;
        this.weight = 1;

        //animation variables
        this.framex = 0;
        this.framey = 0;
        this.maxFrame = 5;
        this.fps = 5;  
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        //state variables
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this), new Attacking(this), new Idle(this), new Climbing(this),new Deading(this), new Ball(this)];
        this.isDeath = false;
        this.currentState = this.states[5];
        this.currentState.enter();
    }

    update(input, deltaTime, context){
        this.currentState.handleInput(input);
        //console.log(this.isDeath);
        if(this.isDeath == false){
            this.x += this.speed;
            this.y += this.vy;

            //Climbing
            if(input.includes('w')){
                this.vy = -0.5;
                this.setState(6)
            }else if(input.includes(' ') && this.currentState.getState() == "CLIMBING"){
                this.vy = 0;
                this.setState(1);
            }            
            
            //horizontal movement
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
            if(!this.onGround() && this.currentState.getState() != "CLIMBING"){
                this.vy += this.weight ; 
                //ball attack
                if(this.currentState.getState() == "BALL"){
                    this.vy += 4;
                }
            }else if( this.currentState.getState() != "CLIMBING"){
                this.vy = 0;
                this.y = this.game.height - this.height - this.game.groundMargin;
            }
                
            
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
        context.fillRect(0, this.game.height - this.game.groundMargin, this.game.width, 1);
        let posx = 1;
        /*if(this.speed < 0)
           posx = -1;
        context.scale(-1, 1);*/
        context.drawImage(this.image,  this.framex * 32, (this.framey*32)+1, 32, 32,  this.x , this.y, this.width , this.height);
    }
    
    onGround(){
        return this.y + this.speed/2 >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){
            this.currentState = this.states[state];
            this.game.speed = this.game.MaxSpeed * speed;
            this.currentState.enter();
    }
}   
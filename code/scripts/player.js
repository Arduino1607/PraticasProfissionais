import { Sitting, Running, Jumping, Falling, Attacking, Idle, Climbing, Deading, Ball } from "./playerState.js";
import { Shoot } from "./shoot.js";

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

        this.shoots = [];
    }

    update(input, deltaTime, context){
        this.currentState.handleInput(input);
        
        //console.log(this.x);
        if(this.isDeath == false){
            this.x += this.speed;
            this.y += this.vy;
            this.game.speedTile = 0;

            var s = false;
            if(this.currentState.getState() == 'CLIMBING'){
            this.game.stairs.forEach(stair=>{
                if(((this.x + this.width/2 - 10 > stair.x && this.x + this.width/2 + 10 < stair.x + stair.width) && (this.y + this.height  >= stair.y && this.y + this.height  < stair.y + stair.height))){
                    s = true;
                }
            });
            console.log("eai: ", s);
            if(!s){
                this.setState(5);
            }
            }   
            
            console.log(this.currentState.getState());
                    
            this.game.tiles.forEach(tile=>{
                if((this.x + this.width > tile.x + 30 && this.x + this.width < tile.x + 40) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height))
                    this.x = tile.x - this.width + 30;
                if((this.x < tile.x + tile.width - 30 && this.x > tile.x + tile.width - 40) && (this.y + this.height >= tile.y && this.y  < tile.y + tile.height))
                    this.x = tile.x + tile.width - 30;   
            });
            
            //horizontal movement
            if(input.includes('ArrowRight'))
                this.speed = this.maxSpeed;
            else if(input.includes('ArrowLeft'))
                this.speed = -this.maxSpeed;
            else
                this.speed = 0;
            
            
        
            //console.log(this.y)
            if(this.x + 30< 0)
                this.x = -30;
            if(this.x > (this.game.width - this.width + 30) / 2){ 
                this.x = (this.game.width - this.width + 30)/2;
                this.game.speedTile = this.maxSpeed;
            }
            //vertical movement
            let og = this.onGround();
            if( og == 0 && this.currentState.getState() != "CLIMBING"){
                this.vy += this.weight ;
                this.game.thorns.forEach(thorn=>{
                    if((this.x + this.width > thorn.x + 30 && this.x < thorn.x + thorn.width - 30) && (this.y + this.height + this.vy >= thorn.y && this.y + this.height + this.vy < thorn.y + thorn.height)){
                        this.isDeath = true;
                        this.setState(7);
                    }
                    if(this.y > 1000){
                        this.isDeath = true;
                        this.setState(7);
                    }
                });
            }else if(this.currentState.getState() != "CLIMBING"){
                this.vy = 0;
                this.y = og - this.height;
            }
                
            //console.log(this.onGround());
            //sprite animation
            
        }
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.framex < this.maxFrame-1) 
                this.framex++;
            else if(this.currentState.getState() == "ATTACKING") {
                var s = new Shoot(this.x + this.width/2,this.y+this.height/2, 35, 12, this);
                this.shoots.push(s);
                this.setState(5)
            }else if(this.currentState.getState() == "DEADING")
                this.isDeath = true;
            else 
                this.framex = 0;
        }else{
            this.frameTimer += deltaTime;
        }
    }

    draw(context){
        var count = 0;
        //console.log(this.shoots)
        this.shoots.forEach(shoot =>{shoot.update();});
        this.shoots.forEach(shoot =>{shoot.draw(context);});
        this.shoots = this.shoots.filter(shoot => !shoot.marked);
        context.fillRect(0, this.game.height - this.game.groundMargin, this.game.width, 1);
        let posx = 1;
        /*if(this.speed < 0)
           posx = -1;
        context.scale(-1, 1);*/
        //context.fillRect(this.x , this.y, this.width , this.height);
        context.drawImage(this.image,  this.framex * 32, (this.framey*32)+1, 32, 32,  this.x , this.y, this.width , this.height);
    }
    
    onGround(){
        let g = 0;
        this.game.tiles.forEach(tile=>{
            if((this.x + this.width > tile.x + 30 && this.x < tile.x + tile.width - 30) && (this.y + this.height + this.vy >= tile.y && this.y + this.height + this.vy < tile.y + tile.height)){
                g = tile.y;
            }
        });
        this.game.stairs.forEach(stair=>{
            if((this.x + this.width/2 + 10 > stair.x && this.x + this.width/2 - 10 < stair.x + stair.width) && (this.y + this.height  >= stair.y && this.y + this.height  < stair.y + 20)){
                g = stair.y;
            }
        });
        return /*this.y + this.speed/2 >= this.game.height - this.height - this.game.groundMargin ||*/ g;
    }

    setState(state, speed){
            this.currentState = this.states[state];
            this.game.speed = this.game.MaxSpeed * speed;
            this.currentState.enter();
    }
}   
const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ATTACKING: 4,
    IDLE: 5,
    CLIMBING: 6,
    DEADING: 7,
    BALL: 8
}

class State{
    constructor(state){
        this.state = state;
    }
    getState(){
        return this.state;
    }
}

export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.framex = 3;
        this.player.framey = 2;
        this.player.maxFrame = 1;
    }
    handleInput(input){
        if(input.includes('ArrowRight')|| input.includes('ArrowLeft')){
            this.player.setState(states.RUNNING);
        } 
    }
}

export class Running extends State{
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 1;
        this.player.maxFrame = 3;

    }
    handleInput(input){
        /*if(input.includes('ArrowDown')){
            this.player.setState(states.SITTING);
        } else*/ if(input.includes('ArrowUp')){
            this.player.setState(states.JUMPING,1);
        } else if(input.includes('a')){
            this.player.setState(states.ATTACKING,1);
        }else if(input.includes('ArrowRight') == false && input.includes('ArrowLeft') == false){
            this.player.setState(states.IDLE,0);
        }
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        if(this.player.onGround()) 
            this.player.vy -= 20;
        this.player.framex = 0;
        this.player.framey = 2;
        this.player.maxFrame = 2;
    }
    handleInput(input){
        if(this.player.vy > this.player.weight){
            this.player.setState(states.FALLING,1);
        }
        this.player.game.tiles.forEach(tile=>{
            if((this.player.x + this.player.width > tile.x + 30 && this.player.x < tile.x + tile.width - 30) && (this.player.y + 10  < tile.y + tile.height && this.player.y + this.player.height >= tile.y - 10)){
                console.log("True")
                this.player.vy = this.player.weight;
                this.player.setState(states.FALLING);           
            }
        });
    }
}

export class Falling extends State{
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 2;
        this.player.maxFrame = 1;
    }
    handleInput(input){
        if(this.player.onGround() != 0){
            this.player.setState(states.RUNNING, 1);
        }/*else if(input.includes('ArrowDown'))
            this.player.setState(states.BALL)*/
    }
}

export class Attacking extends State{
    constructor(player){
        super('ATTACKING');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 5;
        this.player.maxFrame = 2;
    }
    handleInput(input){
       
    }
}

export class Deading extends State{
    constructor(player){
        super('DEADING');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 4;
        this.player.maxFrame = 2;
    }
    handleInput(input){
       if(input.includes('Enter')){
        this.player.y = 0;
        this.player.isDeath = false;
        this.player.setState(states.FALLING, 1);
       }
    }
}

export class Ball extends State{
    constructor(player){
        super('BALL');
        this.player = player;
    }
    enter(){
        this.player.framex = 3;
        this.player.framey = 2;
        this.player.maxFrame = 1;
    }
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.IDLE);
        }
    }
}

export class Climbing extends State{
    constructor(player){
        super('CLIMBING');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 3;
        this.player.maxFrame = 2;
        let t = false;
        this.player.game.stairs.forEach(stair=>{
            if((this.player.x + this.player.width/2 + 10 > stair.x && this.player.x + this.player.width/2 - 10 < stair.x + stair.width) && (this.player.y + this.player.height  >= stair.y && this.player.y + this.player.height  < stair.y + 20)){
                t = true;
            }
        });
        console.log(t);
        if(t == false){
            this.player.vy = -1;
         }else{
            this.player.y += 20;
            this.player.vy = 1;
         } 
    }
    handleInput(input){
       if(input.includes(' ')){
            this.player.setState(states.IDLE,0);
       }
    }
}

export class Idle extends State{
    constructor(player){
        super('IDLE');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 0;
        this.player.maxFrame = 3;
    }
    handleInput(input){
        if(input.includes('ArrowRight')|| input.includes('ArrowLeft')){
            this.player.setState(states.RUNNING,1);
        }else if(input.includes('a')){
            this.player.setState(states.ATTACKING,0);
        }/*else if(input.includes('ArrowDown')){
            this.player.setState(states.SITTING);
        }*/else if(input.includes('d')){
            this.player.setState(states.DEADING,0)
        } else if(input.includes('w')){
            this.player.game.stairs.forEach(stair=>{
                if((this.player.x + this.player.width > stair.x + 30 && this.player.x < stair.x + stair.width - 30) && (this.player.y + this.player.height  >= stair.y && this.player.y + this.player.height  < stair.y + stair.height)){
                    this.player.setState(states.CLIMBING);
                }
            });
        }else if(input.includes('ArrowUp')){
            var s = false;
            this.player.game.stairs.forEach(stair=>{
                if((this.player.x + this.player.width > stair.x + 30 && this.player.x < stair.x + stair.width - 30) && (this.player.y + this.player.height  >= stair.y && this.player.y + this.player.height  < stair.y + stair.height)){
                    s = true;
                }
            });
            if(!s)
                this.player.setState(states.JUMPING,1);
            else
                this.player.setState(states.CLIMBING);
        }
    }
}
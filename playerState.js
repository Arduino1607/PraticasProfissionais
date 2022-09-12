const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,

}

class State{
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 5
        this.player.maxFrame = 5;
    }
    handleInput(input){
        if(input.includes('ArrowRight')|| input.includes('ArrowLeft')){
            console.log("hello");
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
        this.player.framey = 3;
        this.player.maxFrame = 8;

    }
    handleInput(input){
        if(input.includes('ArrowDown')){
            console.log("hallo");
            this.player.setState(states.SITTING);
        } else if(input.includes('ArrowUp')){
            this.player.setState(states.JUMPING);
        }
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        if(this.player.onGround()) this.player.vy -= 20;
        this.player.framex = 0;
        this.player.framey = 1;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if(this.player.vy > this.player.weight){
            console.log("hallo");
            this.player.setState(states.FALLING);
        } 
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
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING);
        } 
    }
}
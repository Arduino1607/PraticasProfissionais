const states = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
    IDLE: 4
}

class State{
    constructor(state){
        this.state = state;
    }
    getState(){
        return this.state;
    }
}

export class Left extends State{
    constructor(player){
        super('LEFT');
        this.player = player;
    }
    enter(){
        this.player.framex = 2;
        this.player.framey = 0;
        this.player.maxFrame = 1;

    }
    handleInput(input){
        
    }
}

export class Right extends State{
    constructor(player){
        super('RIGHT');
        this.player = player;
    }
    enter(){
        this.player.framex = 0;
        this.player.framey = 0;
        this.player.maxFrame = 1;

    }
    handleInput(input){
        
    }
}

export class Up extends State{
    constructor(player){
        super('UP');
        this.player = player;
    }
    enter(){
        this.player.framex = 1;
        this.player.framey = 0;
        this.player.maxFrame = 1;

    }
    handleInput(input){
        
    }
}

export class Down extends State{
    constructor(player){
        super('DOWN');
        this.player = player;
    }
    enter(){
        this.player.framex = 3;
        this.player.framey = 0;
        this.player.maxFrame = 1;

    }
    handleInput(input){
        
    }
}

export class IDLE extends State{
    constructor(player){
        super('IDLE');
        this.player = player;
    }
    enter(){
        this.player.framex = 4;
        this.player.framey = 0;
        this.player.maxFrame = 1;

    }
    handleInput(input){
        
    }
}
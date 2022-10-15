export class InputHandler{
    constructor(){
        this.keys = [];
        this.controls = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'a', 'd', 'w', ' ', 'Enter','z','c']
        window.addEventListener('keydown', e=>{
            if(this.controls.includes(e.key) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            //console.log(e.key, this.keys);
        });
        
        window.addEventListener('keyup', e=>{
            if(this.controls.includes(e.key)){
                this.keys.splice( this.keys.indexOf(e.key),1);
            }
            //console.log(e.key, this.keys);
        });

    }
}
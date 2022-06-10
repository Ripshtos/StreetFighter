const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0 ,0 , canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
    constructor({position,velocity})
    {
        this.position = position; 
        this.velocity = velocity;
        this.height = 150;
    }
    
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x,this.position.y, 50 , this.height);
    }
    
    update(){
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height){ // set floor
            this.velocity.y = 0;
        }
        else {this.velocity.y += gravity;}

        if(this.position.x + this.velocity.x < 5 ) { // set border right
            this.position.x = 5;
        }
      
        if(this.position.x + this.velocity.x > 970){ // set border left
            this.position.x = 970;
        }  
        
        if( this.position.y + this.velocity.y + this.height <= 0) // set border up
        {
            this.position.y = 50;
        } 
    } 
}




const player = new Sprite({ //player character
    position :{
    x:10,
    y:0},
    velocity : {
    x : 0,
    y : 10
    }});

const enemy = new Sprite({ //enemy character
    position :{
    x:600,
    y:0},
    velocity : {
    x : 0,
    y : 10
    }});


const keys = { //constant that contains the if current key is pressed 
a: { pressed : false} ,
d: { pressed : false } ,
w: { pressed : false}
}

let lastkey = 'z';



function animate() { //animation loop
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
    if( keys.d.pressed && lastkey === 'd' )
    { player.velocity.x = 3;}
    
    if( keys.a.pressed && lastkey === 'a' )
    { player.velocity.x = -3;}

    player.update();
    enemy.update();
    window.requestAnimationFrame(animate);
    
}
animate();

window.addEventListener('keydown' , (event) => { 
    console.log(event); 
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
            lastkey ='d';
            break;
        
        case 'a':
            keys.a.pressed = true;
            lastkey ='a';
            break;

        case 'w':
            keys.w.pressed = true;
            player.velocity.y = -2;
            
            break;
    }
});

window.addEventListener('keyup' , (event) => { 
    console.log(event);
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
            lastkey = 'd';
            break;
        
        case 'a':
            keys.a.pressed = false;
            lastkey ='a';
            break;

        case 'w':
            keys.w.pressed = true;
            lastkey ='w';
            break;
    }
});
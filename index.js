const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0 ,0 , canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({position,velocity})
    {
        this.position = position; 
        this.velocity = velocity;
        this.height = 150;
        this.lastkey;
        this.hitbox = { 
            position : this.position,
            width : 100,
            height : 50
        }
    }
    
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x,this.position.y, 50 , this.height);
        c.fillStyle = 'green';
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
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
        
        if( this.position.y + this.velocity.y + this.height <= 100) // set border up
        {
            this.position.y = 100;
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
d: { pressed : false } 
}
let lastkey = 'd';



function animate() { //animation loop
    window.requestAnimationFrame(animate);  
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
    player.update();
    enemy.update();

    if( keys.d.pressed && lastkey === 'd' )
    { player.velocity.x = 3;}
    else if( keys.a.pressed && lastkey === 'a' )
    { player.velocity.x = -3;}  
    
    if( player.hitbox.position.x + player.hitbox.width >= enemy.position.x && player.hitbox.position.x <= enemy.hitbox.position.x + enemy.hitbox.width)
    {
        console.log('go');
    }
    
}

animate();

window.addEventListener('keydown' , (event) => {
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
            player.velocity.y = -10;
            
            break;
    }
});

window.addEventListener('keyup' , (event) => { 

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
            lastkey ='w';
            break;
    }
});
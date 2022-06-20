const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastkey;
        this.width = 50;
        this.isAttacking = false;
        this.hitbox = { 
            position : this.position,
            width : 100,
            height : 50
        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.fillStyle = 'green';
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) { // set floor
            this.velocity.y = 0;
        }
        else { this.velocity.y += gravity; }

        if (this.position.x + this.velocity.x < 5) { // set border right
            this.position.x = 5;
        }

        if (this.position.x + this.velocity.x > 970) { // set border left
            this.position.x = 970;
        }
    }

    Attacking(){
        this.isAttacking = true;
        setTimeout(() => { this.isAttacking = false;} , 100)
    }
}




const player = new Sprite({ //player character
    position: {
        x: 10,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
});

const enemy = new Sprite({ //enemy character
    position: {
        x: 600,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
});


const keys = { //constant that contains the if current key is pressed 
    a: { pressed: false },
    d: { pressed: false },
    arrowLeft : { pressed: false },
    arrowRight : { pressed: false }}

let lastkey = 'z';

function RectangularCollision({ rectangal1 , rectangal2}){ // collision detection
    if( rectangal1.hitbox.position.x + rectangal1.hitbox.width >= rectangal2.position.x && rectangal1.hitbox.position.x <= rectangal2.hitbox.position.x + rectangal2.hitbox.width
        && rectangal1.hitbox.position.y + rectangal1.hitbox.height >= rectangal2.position.y && rectangal1.isAttacking ){
            return true;
    }
}

function animate() //animation loop
{
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);


    if (keys.d.pressed && lastkey === 'd') { player.velocity.x = 3; }
    else if (keys.a.pressed && lastkey === 'a') { player.velocity.x = -3; }
    else { } 


    if (keys.arrowRight.pressed && lastkey === 'arrowRight') { enemy.velocity.x = 3; }
    else if (keys.arrowLeft.pressed && lastkey === 'arrowLeft') { enemy.velocity.x = -3; }
    else { } 


    player.update();
    enemy.update();
    window.requestAnimationFrame(animate);

    if( RectangularCollision ( { rectangal1 : player , rectangal2 : enemy })) // detect collision player points
    {
        console.log('go');
    } 

    
    if( RectangularCollision ( { rectangal1 : enemy , rectangal2 : player })) // detect collision enemy points
    {
        console.log('go');
    } 

}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event);
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            lastkey = 'd';
            break;

        case 'a':
            keys.a.pressed = true;
            lastkey = 'a';
            break;

        case 'w':
            if(player.position.y > 0)
            {
                player.velocity.y = -10;
            }
            break;
        
        case ' ':
            player.Attacking();
            break;
        
    }
    console.log(event);
    switch (event.key) {
        case 'ArrowRight':
            keys.arrowRight.pressed = true;
            lastkey = 'arrowRight';
            break;

        case 'ArrowLeft':
            keys.arrowLeft.pressed = true;
            lastkey = 'arrowLeft';
            break;

        case 'ArrowUp':
            if(enemy.position.y > 0)
            {
                enemy.velocity.y = -10;
            }
            break;
        
        case 'ArrowDown':
            enemy.Attacking();
            break;
        
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event);
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            lastkey = 'd';
            break;

        case 'a':
            keys.a.pressed = false;
            lastkey = 'a';
            break;

        case 'w':
            break;
    }
});
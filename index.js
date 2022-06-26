const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
    constructor({position, velocity,color,offset}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastkey;
        this.width = 50;
        this.isAttacking = false;
        this.health = 100;
        this.isDead = false;
        this.hitbox = {
            position : { x : this.position.x, 
            y : this.position.y },    
            offset,
            width : 100,
            height : 50
        }
        this.color = color;
        this.offset = offset;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        if(this.isAttacking){
            c.fillStyle = 'green';
            c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);    
        }
    }

    update() {
        this.draw() 
        if(this.lastkey === 'd' || this.lastkey === 'arrowRight'){
            this.hitbox.offset.x = 0;
        }
        else if(this.lastkey === 'a' || this.lastkey === 'arrowLeft') {
            this.hitbox.offset.x = -50 ;
        }

        
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x;        
        this.hitbox.position.y = this.position.y;

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

        if(this.health <= 0)//
        {
            this.isDead = true;
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
    },
    color :'red',
    offset: {
        x:0,
        y:0
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
    },
    color: 'blue',
    offset:{
        x:-50,
        y:0
    }
});


const keys = { //constant that contains the if current key is pressed 
    a: { pressed: false },
    d: { pressed: false },
    arrowLeft : { pressed: false },
    arrowRight : { pressed: false }};


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
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if(!player.isDead){
        if (keys.d.pressed && player.lastkey === 'd') { player.velocity.x = 3; }
        else if (keys.a.pressed && player.lastkey === 'a') { player.velocity.x = -3; }
        else { } 
    }

    if(!enemy.isDead){
        if (keys.arrowRight.pressed && enemy.lastkey === 'arrowRight') { enemy.velocity.x = 3; }
        else if (keys.arrowLeft.pressed && enemy.lastkey === 'arrowLeft') { enemy.velocity.x = -3; }
        else { } 
    }

    player.update();
    enemy.update();
    window.requestAnimationFrame(animate);

    if( RectangularCollision ( { rectangal1 : player , rectangal2 : enemy })) // detect collision if player hits enemy
    {
        console.log("player hit enemy");
        enemy.health -= 2;
        document.querySelector('#bar-enemy').style.width = enemy.health + "%";
        console.log(enemy.health);
    } 

    
    if( RectangularCollision ( { rectangal1 : enemy , rectangal2 : player })) // detect collision if enemy hits player
    {
        console.log("enemy hit player");
        player.health -= 2;
        document.querySelector('#bar-player').style.width = player.health + "%";
        console.log(player.health);
    } 

}

function counter(){ //game timer set to 60 seconds
    var timeleft = 60;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){// when timer ends
        clearInterval(downloadTimer);
        console.log("fin")
        if (player.health > enemy.health){
            enemy.isDead = true;
            console.log("player wins");

        }
        else{
            player.isDead = true;
            console.log("enemy wins");
        }
    }
    document.getElementById("progressBar").value = 60 - timeleft;
    timeleft -= 1;
    }, 1000);
    
}

counter();
animate();


  
  






window.addEventListener('keydown', (event) => {
    console.log(event);
    if (!player.isDead){
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastkey = 'd';
                break;

            case 'a':
                keys.a.pressed = true;
                player.lastkey = 'a';
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
    }
    console.log(event);
    if(!enemy.isDead){
    switch (event.key) {
        case 'ArrowRight':
            keys.arrowRight.pressed = true;
            enemy.lastkey = 'arrowRight';
            break;

        case 'ArrowLeft':
            keys.arrowLeft.pressed = true;
            enemy.lastkey = 'arrowLeft';
            break;

        case 'ArrowUp':
            if(enemy.position.y > 0 ) 
            {
                enemy.velocity.y = -10;
            }
            break;
        
        case 'ArrowDown':
            enemy.Attacking();
            break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event);
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;

        case 'w':
            break;
    }
      switch (event.key) {
        case 'ArrowRight':
            keys.arrowRight.pressed = false;
            break;

        case 'ArrowLeft':
            keys.arrowLeft.pressed = false;
            break;

        case 'ArrowUp':
            break;
    } 
});
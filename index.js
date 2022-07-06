const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
const background = new Sprite({ 
    position :{
    x:0,
    y:0
},
imgSrc :'./img/background2.png',

})


const player = new Fighter({ //player character
    position: {
        x: 10,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    },
    imgSrc:'./img/ken/kenIdle4.png',
    framemax : 4,
    scale : 2,
    offset :{
        x:30,
        y:100
    },sprites:{
        idle :{
            imgSrc:'./img/ken/kenIdle4.png',
            framemax : 4
        },
        run :{
            imgSrc:'./img/ken/kenRun5.png',
            framemax : 5
        },
        jump :{
            imgSrc:'./img/ken/kenJump7.png',
            framemax : 7
        },
        punch :{
            imgSrc:'./img/ken/kenPunch3.png',
            framemax : 3
        }
    } 
});

const enemy = new Fighter({ //enemy character
    position: {
        x: 1000,
        y: 0
    },
    velocity: { 
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    },
    imgSrc:'./img/ken/kenIdle4.png',
    framemax : 4,
    scale : 2,
    offset :{
        x:30,
        y:100
    },
    sprites:{
        idle :{
            imgSrc:'./img/ken/kenIdle4.png',
            framemax : 4
        },
        run :{
            imgSrc:'./img/ken/kenRun5.png',
            framemax : 5
        },
        jump :{
            imgSrc:'./img/ken/kenJump7.png',
            framemax : 7
        }
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
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    if(!player.isDead){
        if (keys.d.pressed && player.lastkey === 'd') { player.velocity.x = 3;
        player.SwitchSprite('run'); }
        else if (keys.a.pressed && player.lastkey === 'a') { player.velocity.x = -3; player.SwitchSprite('run') }
        else {  player.SwitchSprite('idle');  } 
    }

    if(!enemy.isDead){
        if (keys.arrowRight.pressed && enemy.lastkey === 'arrowRight') { enemy.velocity.x = 3; }
        else if (keys.arrowLeft.pressed && enemy.lastkey === 'arrowLeft') { enemy.velocity.x = -3; }
        else { } 
    }

    if(player.velocity.y > 0){
        player.SwitchSprite('jump');
    }

    player.update();
    enemy.update();
    
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
                player.SwitchSprite('punch');
                break;
            }
    }

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
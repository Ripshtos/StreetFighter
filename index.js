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

const ken = new Sprite({ 
    position :{
    x:0,
    y:0
},
imgSrc :'./img/ken/KenWins.png'});

const ryu = new Sprite({ 
    position :{
    x:0,
    y:0
},
imgSrc :'./img/ryu/ryuWins.png'});


const player = new Fighter({ //player character
    position: {
        x: 10,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    imgSrc:'./img/ken/kenIdle4.png',
    framemax : 4,
    scale : 1.6,
    offset :{
        x:18,
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
        },
        death :{
            imgSrc:'./img/ken/kenDeath5.png',
            framemax : 5
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
    imgSrc:'./img/ryu/ryuIdle4.png',
    framemax : 4,
    scale : 1.6,
    offset :{
        x:20,
        y:100
    },
    sprites:{
        idle :{
            imgSrc:'./img/ryu/ryuIdle4.png',
            framemax : 4
        },
        run :{
            imgSrc:'./img/ryu/ryuRun5.png',
            framemax : 5
        },
        jump :{
            imgSrc:'./img/ryu/ryuJump7.png',
            framemax : 7
        },
        punch :{
            imgSrc:'./img/ryu/ryuPunch3.png',
            framemax : 3.05
        },
        death :{
            imgSrc:'./img/ryu/ryuIdle4.png',
            framemax : 1
        }
    }
});


const keys = { //constant that contains the if current key is pressed 
    a: { pressed: false },
    d: { pressed: false },
    arrowLeft : { pressed: false },
    arrowRight : { pressed: false }};




counter();


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
    if(player.velocity.y < 0){
        player.SwitchSprite('jump');
    }


    if(!enemy.isDead){
        if (keys.arrowRight.pressed && enemy.lastkey === 'arrowRight') { enemy.velocity.x = 3; 
            enemy.SwitchSprite('run');}
        else if (keys.arrowLeft.pressed && enemy.lastkey === 'arrowLeft') { enemy.velocity.x = -3;
            enemy.SwitchSprite('run');}
        else { enemy.SwitchSprite('idle'); } 
    }

    
    if(enemy.velocity.y < 0){
        enemy.SwitchSprite('jump');
    }


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

    if(player.health <= 0 || enemy.health <= 0)// checks if anyone died
    {
        Winner(player,enemy,downloadTimer);
    }


    player.update();
    enemy.update();
}

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
            enemy.SwitchSprite('punch');
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
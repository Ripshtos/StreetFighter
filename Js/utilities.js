let timeleft = 60;
let downloadTimer;

function counter(){ //game timer set to 60 seconds
    if(timeleft > 0){// when timer ends
        downloadTimer = setTimeout(counter,1000)
        timeleft--;
        document.getElementById("progressBar").value = 60 - timeleft;
    }

    if (timeleft === 0 ){
        Winner(player,enemy,downloadTimer);
    }
}


function RectangularCollision({ rectangal1 , rectangal2}){ // collision detection
    if( rectangal1.hitbox.position.x + rectangal1.hitbox.width >= rectangal2.position.x &&
         rectangal1.hitbox.position.x <= rectangal2.hitbox.position.x + rectangal2.hitbox.width &&
        rectangal1.hitbox.position.y + rectangal1.hitbox.height >= rectangal2.position.y &&
        rectangal1.hitbox.position.y <= rectangal2.position.y + rectangal2.height && rectangal1.isAttacking ){
            return true;
    }
}




function Winner(player,enemy,downloadTimer){ // function that displays the winners logo
    clearTimeout(downloadTimer)

    if ( player.health <= enemy.health) //ryu wins
    {
        player.isDead = true
        console.log('ryu wins');
        ryu.update();
        document.getElementById('HealthBars').style.display = "none";
    }
    else if (enemy.health <= player.health )
    {
        enemy.isDead = true
        console.log('ken wins')
        ken.update();
        document.getElementById('HealthBars').style.display = "none";
    }
}



class Sprite {
    constructor({position , imgSrc , scale = 1, framemax = 1}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
        this.height = 50;
        this.width = 150;
        this.scale = scale;
        this.framemax = framemax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameHold = 10;    
    }

    draw() {
        c.drawImage(
        this.image,
        this.framesCurrent * ( this.image.width / this.framemax),
        0,
        this.image.width / this.framemax,
        this.image.height,
        this.position.x,
        this.position.y,
        (this.image.width / this.framemax) * this.scale,
        this.image.height * this.scale)
        }

    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesElapsed % this.frameHold === 0){
            if(this.framesCurrent < this.framemax - 1){
                this.framesCurrent++;
            } else{
                this.framesCurrent = 0;
            }
        }
    }
}

class Fighter {
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

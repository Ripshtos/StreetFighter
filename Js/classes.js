class Sprite {
    constructor({position , imgSrc , scale = 1, framemax = 1, offset = {x: 0 , y : 0}}) {
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
        this.offset = offset;
    }

    draw() {
        c.drawImage(
        this.image,
        this.framesCurrent * ( this.image.width / this.framemax),
        0,
        this.image.width / this.framemax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framemax) * this.scale,
        this.image.height * this.scale)
        }

    update() {
        this.draw();
        this.animateFrame();
    }

    animateFrame(){
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




class Fighter extends Sprite { // player 
    constructor({
        position,
        velocity,
        color,
        imgSrc,
        scale = 1,
        framemax = 1,
        offset = {x: 0,
        y: 0},
        sprites
    })
    {
        super({
        position,
        imgSrc,
        scale,
        framemax,
        offset
        })

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
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameHold = 10; 
        this.sprites = sprites;
        
        for ( const sprite in this.sprites){
            sprites[sprite].Image = new Image();
            sprites[sprite].Image.src = sprites[sprite].imgSrc;
        }

    }


    update() {
        this.draw() 
      
        /*
        if(this.lastkey === 'd' || this.lastkey === 'arrowRight'){
            this.hitbox.offset.x = 0;
        }
        else if(this.lastkey === 'a' || this.lastkey === 'arrowLeft') {
            this.hitbox.offset.x = -50 ;
        }
        */
       
        this.animateFrame();
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x;        
        this.hitbox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) { // set floor
            this.velocity.y = 0;
        }
        else { this.velocity.y += gravity; }
 
        if (this.position.x + this.velocity.x  < 0) { // set border right
            this.position.x = 0;
        }

        if (this.position.x + this.velocity.x  > 970) { // set border left
            this.position.x = 970;
        }

        if(this.health <= 0)//check if dead 
        {
            this.isDead = true;
        }    
    }

    Attacking(){
        this.isAttacking = true;
        setTimeout(() => { this.isAttacking = false;} , 100)
    }

    SwitchSprite(sprite){
        switch (sprite) {
            case 'idle':
              if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
              }
              break
            case 'run':
              if (this.image !== this.sprites.run.image) {
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.framesCurrent = 0
              }
              break
            case 'jump':
              if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
              }
              break;
        }
      
    }



}

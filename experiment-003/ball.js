class Ball {

    x = 0;
    y = 0;
    vx = 1;
    vy = 0;
    radius = 10;
    gravity = 0.1;
    bounceLoss = 0.9;

    constructor(radius, gravity, bounceLoss, boundingArea ) {
        this.radius = radius;
        this.gravity = gravity;
        this.bounceLoss = bounceLoss;

        this.Initialise(boundingArea);
    }

    Initialise(boundingArea) {
        this.vx= (Math.random()*20)-10;
        this.vy = 0;
        this.x = (boundingArea.width * Math.random()/2) + boundingArea.width/2;
        this.y = -this.radius*2; // start just off screen
    }

    Update(bounds) {
        let applyGravity = true;
        
        // animate ball
        this.x+=this.vx;
        this.y+=this.vy;
        
        // bounds check
        if( this.x > bounds.width-this.radius ) this.x = bounds.width-this.radius;

        // following bounds detection could be made much more simpler, but user
        // might resize bounds when ball is outside...
        if( this.vx<0) {
            if( (this.x-this.radius) <= 0 ) {
                this.x = this.radius;
                this.vx = -this.vx*this.bounceLoss;
            }
        } else {
            if( (this.x+this.radius) >= bounds.width ) {
                this.x = bounds.width-this.radius;
                this.vx = -this.vx*this.bounceLoss;
            }
        }


        if( this.vy<0) {
            // travelling up
            if( (this.y-this.radius) <= 0 ) {
                this.y = this.radius;
                this.vy = -this.vy;
            }

        } else {
            // travelling down
            if( (this.y+this.radius) > bounds.height ) {
            	this.y = bounds.height-(this.radius);
                
                // don't apply gravity if we're at rock bottom; can't accelerate downwards at this point!
                if( Math.abs(this.vy) <2 ) { // is ground sticky, any vy < 0.8 doesn't result in a bounce!
                    this.vy = 0;
                    applyGravity = false;   
                    
                    //some friction to x
                    this.vx *= 0.99;
                    
                } else {
                    this.vy = -(this.vy*this.bounceLoss);
                   
                    // not a perfect bounce, introduce some vx
                    this.vx+=(Math.random()-0.5)/4;
                    
                }
            }
        }

        if(applyGravity) {
            // simulate some gravity (not proper physics!)
            this.vy+=0.5;
        }
    }
}
"use strict";

(function(){
    console.log("Initialising");

    window.addEventListener("load", e => {
        console.log("Window Loaded");

        let engine = new Engine("screen");
    });
})();

class Marble {
    x = 0;
    y = 0;
    vx = 2;
    vy = 1;
    radius = 1;

    gravity = 0.8;

    constructor(r, g) {
        this.gravity = g;
        this.radius = r;
    }

    update(bounds) {

        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x > bounds.width - this.radius ) {
            this.x = bounds.width - this.radius;
            this.vx =- this.vx;
        }

        if(this.x < 0 + this.radius ) {
            this.x = 0 + this.radius;
            this.vx =- this.vx;
        }

        if(this.y > bounds.height - this.radius ) {
            this.y = bounds.height - this.radius;
            this.vy =- this.vy;
        }

        if(this.y < 0 + this.radius ) {
            this.y = 0 + this.radius;
            this.vy =- this.vy;
        }

        // friction
        this.vx*=0.99;
        this.vy*=0.99;
    }

}



class Engine {
    _host = null;
    _ballElm = null;
    _bounds = {
        width: null,
        height: null
    };

    // create a new marble
    _marble = new Marble(16, 0.9);

    constructor(elementId) {
        this._host = document.getElementById(elementId);

        let self = this;

        // add a single ball element
        this._ballElm = document.createElement('img');
        this._ballElm.src = "ball.png";
        this._ballElm.style = "position: absolute;";

        this._host.appendChild(this._ballElm);



        // hook-up handler for orientation
        window.addEventListener("deviceorientation", o => {
            console.log(o);

            // de
        });

        // hook-up animation tick
        window.setInterval( () => {

            self._marble.update({ width: 200, height: 200});
            
            self._ballElm.style.left = (self._marble.x+16)+"px";
            self._ballElm.style.top = (self._marble.y+16)+"px";

        }, 10);

    }
}
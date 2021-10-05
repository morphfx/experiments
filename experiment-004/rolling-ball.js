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
    vx = 0;
    vy = 0;
    radius = 1;

    gravity = 0.8;
    bounceLoss = 0.6;

    constructor(r, g) {
        this.gravity = g;
        this.radius = r;
    }

    update(bounds, g, b) {

        this.x+=this.vx;
        this.y+=this.vy;

        // bounds and bounce
        if(this.x > bounds.width - this.radius ) {
            this.x = bounds.width - this.radius;
            this.vx =- this.vx*this.bounceLoss;;
        }

        if(this.x < 0 + this.radius ) {
            this.x = 0 + this.radius;
            this.vx =- this.vx*this.bounceLoss;;
        }

        if(this.y > bounds.height - this.radius ) {
            this.y = bounds.height - this.radius;
            this.vy =- this.vy*this.bounceLoss;;
        }

        if(this.y < 0 + this.radius ) {
            this.y = 0 + this.radius;
            this.vy =- this.vy*this.bounceLoss;
        }

        // acceleration due to tilt
        let gx = (this.gravity * Math.sin((g*Math.PI)/180)/1);
        let gy = (this.gravity * Math.sin((b*Math.PI)/180)/1);

        console.log(gx, gy);

        this.vx += gx;
        this.vy += gy;

        // friction
        this.vx*=0.996;
        this.vy*=0.996;
    }

}



class Engine {
    _host = null;
    _ballElm = null;
    _bounds = {
        width: null,
        height: null
    };

    _tilt = {
        a: null,
        b: null,
        g: null
    }

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

            self._tilt.a = o.alpha;
            self._tilt.b = o.beta;
            self._tilt.g = o.gamma;
        });

        // hook-up animation tick
        window.setInterval( () => {

            self._bounds.width = this._host.offsetWidth;
            self._bounds.height = this._host.offsetHeight;

            self._marble.update(self._bounds, self._tilt.g, self._tilt.b);
            
            self._ballElm.style.left = (self._marble.x-16)+"px";
            self._ballElm.style.top = (self._marble.y-16)+"px";

        }, 10);

    }
}
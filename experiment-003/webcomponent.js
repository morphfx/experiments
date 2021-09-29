class BouncyBalls extends HTMLElement {

    _shadow = null;     // reference to the shaow dom
    _ballArea = null;   // reference to the svg

    _balls = new Array();   // array of balls
    _me = null;

     
    // default size of the svg; will be modifed on component resize
     _bounds = {
         width: 300,
         height: 200
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this._shadow = this.attachShadow({mode: 'open'});
        this.render();
        
        // kick off a ball at the start
        this.newBall(this);

        let self = this;
        // start the animation timer
        window.setInterval( () => {
            // update the boundaries just in case there has been a resize 
            self._bounds.width = self._ballArea.clientWidth || self._ballArea.parentNode.clientWidth;
            self._bounds.height = self._ballArea.clientHeight || self._ballArea.parentNode.clientHeight;

            // now update all of the balls
            self._balls.forEach( kvp => {
            	// get the ball and corresponding svg element
            	let theBall = kvp.value;
            	let theCircle = kvp.key;

            	// update the ball position
            	theBall.Update(self._bounds);
            	            	
            	// now update position of the circle in the svg that represents the ball
            	theCircle.style.cx = theBall.x;
            	theCircle.style.cy = theBall.y;
            });
        }, 10 ); // timer interval

    }

    // create a new ball instance and add
    newBall(self) {

        // create the svg object
        let elm = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        
        self._ballArea.appendChild(elm);
        const minSize = 4;
        const maxSize = 30-minSize;
        let radius= minSize + Math.random()*maxSize;
        let bounceLoss = 0.98-0.6*(radius/maxSize); // bigger ones don't bounce as well!
        let ball = new Ball( radius, 0.1, bounceLoss, self._bounds );    

        elm.setAttribute("cx", ball.x);
        elm.setAttribute("cy", ball.y);
        elm.setAttribute("r", ball.radius);
        elm.setAttribute("fill", "#ffffff");
        elm.setAttribute("stroke", "#d0d0d0");
        elm.setAttribute("stroke-width", "1px");
        
        self._ballArea.appendChild(elm);
        
        // need to remember or 'pair' the ball object with its corresponding svg circle
        let wpr = new KeyValuePair(elm, ball);
        self._balls.push(wpr);
    }

    render() {
        if(!this._shadow) return; // not ready yet, don't render
        let html="";

        // center div in a div; refer to: https://www.freecodecamp.org/news/how-to-center-anything-with-css-align-a-div-text-and-more/
        html+='<div style="position: relative; background-color: #867ade; width: 100%; height: 100%; display: inline-block; user-select: none;">';
        html+='  <div style="width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif;">';
        html+='    <svg id="ball-screen" style="background-color: #483aaa; width: 100% ;height: 100%; ">';
        html+='      <text x="10" y="20" font-size="1em" style="fill: white; user-select: none; ">CLICK/TOUCH TO THROW BALL IN</text>';
        html+='  </div>';
        html+='</div>';
    
        this._shadow.innerHTML = html;

        // cache references
        this._ballArea = this._shadow.querySelector("#ball-screen");

        // set-up the click handler to throw in a new ball...
        let self = this; // little trick so we can access the instance of this object
        this.addEventListener("click", () => { self.newBall(self); } );         
    }
} 
customElements.define('mfx-bouncy-balls', BouncyBalls );
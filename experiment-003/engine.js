class Engine {

	_targetElement = null;
	_balls = new Array();   // array of balls
	
	_bounds = {
         width: 400,
         height: 300
    }
	
	constructor(targetElement) {
		this._targetElement = document.getElementById(targetElement);
		this.newBall(this);
		
		// lexical scope of arrow functions, so we can reference the engine!
		let self = this;
		
		// add a click handler to create a new ball
		this._targetElement.addEventListener("click", () => {
			self.newBall(self);
		}); 
		
		// kick off a timer to run the animation
		window.setInterval( () => {		 
	            // now update all of the balls
	            self._balls.forEach( kvp => {
	               // get the ball and corresponding svg element
	               let theBall = kvp.value;
	               let theImg = kvp.key;
	               
	               // re-calculate the bounds
	               self._bounds.width = self._targetElement.offsetWidth;
	               self._bounds.height = self._targetElement.offsetHeight;

	               // update the ball position
	               theBall.Update(self._bounds);
	                              
	               // now update position of the ball
	               // the style is position in pixels, hence the "px"
	               theImg.style.top = (theBall.y-16)+"px";
	               theImg.style.left = (theBall.x-16)+"px";
	            });
	        }, 10 ); // timer interval

	}
	
	newBall(self) {
		// create a new ball image and add to the div
		let elm = document.createElement('img');
		
		// link to the image for the ball, the ball image is 32, 32 pixels
		elm.src = 'ball.png';
		
		// bit more css to get it working, absolutely positioned and
		// a little css hack to stop the balls from being selected when clicking
		// the screen
		elm.style = "position: absolute; user-select: none; top: -32px;";
		
		// add a new image to the host div element
		self._targetElement.appendChild(elm);
		
		// now create an instance of a ball; all balls have a radius of 16 pixels
		let ball = new Ball( 16, 0.1, 0.85, self._bounds);
		
		let kpv = new KeyValuePair(elm, ball);
        self._balls.push(kpv);
	}
}

window.addEventListener('load',  (event) => {
	let engine = new Engine('ball-screen');
});
namespace Example2 {
    export class ClassA extends EventTarget {

        private _onTimerComplete: Event = new Event('onTimerComplete');

        constructor() {
            super();
            console.log("Instance of class A created");
            setTimeout( () => {
                console.log("Class A dispatching event");
                this.dispatchEvent(this._onTimerComplete);
            }, 5000);
        }
    }
}

function doExample2() {
    console.log("Starting Example 2");
    const ex2a = new Example2.ClassA();
    ex2a.addEventListener('onTimerComplete', () => {
        console.log("onTimerComplete received from class C");
    });
}




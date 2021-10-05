namespace Example1 {
    export class ClassA {
        private _styling: string = "color: blue;";

        constructor() {
            console.log("%cClass A instantiated", this._styling);
        }

        onCallback() : void {
            console.log("%cClass A has received a callback", this._styling);
        }
    }

    export class ClassB {
        private _styling: string = "color: red;";

        constructor(parent:ClassA) {
            console.log("%cClass B instantiated", this._styling);
            console.log("%cClass B has started a 5 second time-out, please wait...", this._styling);
            setTimeout( () => {
                console.log("%cClass B calling back to Class A", this._styling);
                parent.onCallback();
            }, 5000);
        }
    }
}

function doExample1() {
    console.log("Starting Example 1");
    const ex1a = new Example1.ClassA();
    new Example1.ClassB(ex1a);
}




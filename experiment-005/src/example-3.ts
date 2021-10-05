namespace Example3 {

    export interface Id {
        name: string,
        value: number
    }

    export class ClassA extends EventTarget {

        constructor() {
            super();
            setTimeout( () => {
                console.log("Class dispatching event to all listeners...");
                
                let myObj:Id = {
                    name: "Hello World",
                    value: 23      
                };

                // dispatch event to all registered listeners
                this.dispatchEvent(
                    new CustomEvent('onTimerComplete', { detail: myObj }));
            }, 5000);
        }
    }
}


function doExample3() {
    console.log("Starting Example 3");
    const ex3a = new Example3.ClassA();

    // add two different event listeners...
    ex3a.addEventListener('onTimerComplete', (event: CustomEvent) => {
        console.log("Listener 1: onTimerComplete received from class with:");
        console.log(event.detail);
    });

    ex3a.addEventListener('onTimerComplete', (event: CustomEvent) => {
        console.log("Listener 2: onTimerComplete received from class with:");
        
        // use type assertion to tell TypeScript that 'data' is an interface
        // of type Example3.Id This is not necessarily type-safe at runtime, 
        // what if something different was dispatched?
        let data = event.detail as Example3.Id;

        console.log("  Name: " + data.name);
        console.log("  Value: " + data.value);
    });
}



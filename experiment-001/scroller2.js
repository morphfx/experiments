"use strict";
class SVGScroller2 extends HTMLElement {
    _shadow = null;
    _graph = null;
    _pane1 = null;
    _channel1 = null;
    _channel2 = null;
    _x = 500;

    constructor() {
        super();
    }

    connectedCallback() {
        this._shadow = this.attachShadow({mode: 'open'});
        console.log("connected");
        this.render();
        
        window.setInterval( () => { 

            let points = "";
            let x=0;
            let y=0;
            let x1=null;
            let y1=null;
            let numPoints = 500;

            for(let i=0; i<numPoints; i+=1) {
                x = i/(numPoints/100);
                y=15+(9*Math.sin((x-(this._x/70))/2));
                points+=x+","+y+" ";
            }
            this._channel1.setAttribute("points", points);

            
            points = "";
            for(let i=0; i<numPoints; i+=1) {
                x = i/(numPoints/100);
                y=20+(15*Math.cos((x-(this._x/70))/10));
                points+=x+","+y+" ";
            }
            this._channel2.setAttribute("points", points);
            this._x--;

        } , 10 );

    }
    
    render() {
        if(!this._shadow) return; // not ready yet, don't render

        let html="";
        let y=0;
        let x = 0;
        let numPoints = 500;

        html+='<style>:host { width: 100%; height: 100px; display: inline-block; text-align: center; }</style>';
        html+='<span>Two traces of 500 points each regenerated at 10 Hz</span>';
        html+='<svg id="graph" viewbox="0 0 100 60">';
        html+='  <g id="pane1" transform="translate(0 0)">';

        let points = "";
        for(let i=0; i<numPoints; i+=1) {
            x = i;
            y=50+(Math.sin(i/6)* 45);
            points+=x+","+y+" ";
        }
        html+='    <polyline id="channel1" points="'+points+'" style="fill:none;stroke:blue;stroke-width:0.2;"/>';

        points = "";
        for(let i=0; i<numPoints; i+=1) {
            x = i;
            y=10+(Math.cos(i/2)* 15);
            points+=x+","+y+" ";
        }
        html+='    <polyline id="channel2" points="'+points+'" style="fill:none;stroke:red;stroke-width:0.2;"/>';


        html+='  </g">';
        html+='</svg>';

        this._shadow.innerHTML = html;
        this._graph = this._shadow.querySelector("#graph");
        this._pane1 = this._graph.querySelector("#pane1");
        this._channel1 = this._graph.querySelector("#channel1");
        this._channel2 = this._graph.querySelector("#channel2");

        
    }
} 

customElements.define('svg-scroller-2', SVGScroller2 );
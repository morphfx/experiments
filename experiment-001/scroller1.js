"use strict";
class SVGScroller1 extends HTMLElement {
    _shadow = null;
    _graph = null;
    _pane1 = null;
    _x = 500;

    constructor() {
        super();
    }

    connectedCallback() {
        this._shadow = this.attachShadow({mode: 'open'});
        console.log("connected");
        this.render();
        
        window.setInterval( () => { 
            this._pane1.setAttribute("transform", 'translate('+(this._x/5)+' 0)');
            this._x--;
        } , 25 );

    }
    
    render() {
        if(!this._shadow) return; // not ready yet, don't render

        let html="";
        let y=0;
        let x = 0;

        html+='<style>:host { width: 100%; height: 100px; display: inline-block; text-align: center; }</style>';
        html+='<span>2 Channels, each with 500 points.  Scrolling (translate) < gap between points; no new points added or old points removed, just translating.</span>';
        html+='<svg id="graph" viewbox="0 0 100 100">';
        html+='  <g id="pane1" transform="translate(0 0)">';

        let points = "";
        for(let i=0; i<500; i+=1) {
            x = i;
            y=50+(Math.sin(i/6)* 45);
            points+=x+","+y+" ";
        }
        html+='    <polyline id="channel1" points="'+points+'" style="fill:none;stroke:blue;stroke-width:0.5;"/>';

        points = "";
        for(let i=0; i<500; i+=1) {
            x = i;
            y=30+(Math.cos(i/2)* 15);
            points+=x+","+y+" ";
        }
        html+='    <polyline id="channel2" points="'+points+'" style="fill:none;stroke:red;stroke-width:0.5;"/>';


        html+='  </g">';
        html+='</svg>';

        this._shadow.innerHTML = html;
        this._graph = this._shadow.querySelector("#graph");
        this._pane1 = this._graph.querySelector("#pane1");

        
    }
} 

customElements.define('svg-scroller-1', SVGScroller1 );
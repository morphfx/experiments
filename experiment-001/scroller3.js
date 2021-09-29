"use strict";

class SVGScroller extends HTMLElement {
    _shadow = null;
    _graph = null;
    _pane1 = null;
    _channel1 = null;
    _channel2 = null;
    _x = 500;

    _points_ch1 = [];
    _points_ch1_ptr = 0;
    _points_ch2 = [];
    _points_ch2_ptr = 0;

    _tickCount = 0;

    constructor() {
        super();
        let numPoints = 500;
        let y=0;

        // pre-populate the circular buffers for channels 1-2
        for( let i=0; i<numPoints; i++ ) {
        	this._points_ch1[i] = 33.3+10*Math.sin(i/70);
        	this._points_ch2[i] = 11+10*Math.cos(i/5);
        }
    }

    connectedCallback() {
        this._shadow = this.attachShadow({mode: 'open'});
        this.render();

        // start the animation timer
        window.setInterval( () => { 
            let points = "";
            let x=0;
            let y=0;
            let x1=null;
            let y1=null;
            let numPoints;
            let i=0;
            let idx = 0;
            let convx=0;

            numPoints = this._points_ch1.length;
            convx = ((numPoints-1)/100);

            points="";
            for(i=0; i<numPoints; i++) {
                x = i/convx;
                idx = i + this._points_ch1_ptr;
                if(idx>=(numPoints)) idx-=(numPoints);
                y=this._points_ch1[idx];
                points+=x.toFixed(2)+","+y.toFixed(2)+" ";
            }
            this._channel1.setAttribute("points", points);

            numPoints = this._points_ch2.length;
            points="";
            for(i=0; i<numPoints; i++) {
                x = i/convx;
                idx = i + this._points_ch2_ptr;
                if(idx>=(numPoints)) idx-=(numPoints);
                y=this._points_ch2[idx];
                points+=x.toFixed(2)+","+y.toFixed(2)+" ";
            }
            this._channel2.setAttribute("points", points);

            this._points_ch1[this._points_ch1_ptr] = 36+8*Math.sin(this._tickCount/40)+5*Math.cos(this._tickCount/33)-3*Math.sin(this._tickCount/76);
            this._points_ch2[this._points_ch2_ptr] = 20+10*Math.sin(this._tickCount/60);

            if(++this._points_ch1_ptr>=(numPoints)) this._points_ch1_ptr=0;
            if(++this._points_ch2_ptr>=(numPoints)) this._points_ch2_ptr=0;
           
            this._tickCount++;

        }, 10 );

    }
    
    render() {
        if(!this._shadow) return; // not ready yet, don't render

        let html="";
        let y=0;
        let x = 0;
        let points = "0,30 100,30";

        html+='<style>:host { width: 100%; height: 100px; display: inline-block; text-align: center; }</style>';
        html+='<svg id="graph" viewbox="0 0 100 60">';
        html+='  <g id="pane1" transform="translate(0 0)">';
        html+='    <polyline id="channel1" points="'+points+'" style="fill:none;stroke:blue;stroke-width:0.6;opacity:0.6;"/>';
        html+='    <polyline id="channel2" points="'+points+'" style="fill:none;stroke:red;stroke-width:0.6;opacity:0.6;"/>';
        html+='  </g">';
        html+='</svg>';

        this._shadow.innerHTML = html;
        this._graph = this._shadow.querySelector("#graph");
        this._pane1 = this._graph.querySelector("#pane1");
        this._channel1 = this._graph.querySelector("#channel1");
        this._channel2 = this._graph.querySelector("#channel2");
    }
} 

customElements.define('mfx-scroller', SVGScroller );
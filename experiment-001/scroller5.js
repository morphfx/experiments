"use strict";
class SVGScrollerTranslate extends HTMLElement {
    
    // reference to the shadow DOM
    _shadow = null;

    // cache references to elements 
    _graph = null;      
    _pane1 = null;
    _pointsCh1 = null;
    _pointsCh2 = null;

    _x = 0;             // scroll position
    _ticks = 0;         // count of timer ticks
    _timeId = null;     // Id of the timer

    constructor() {
        super();
    }

    connectedCallback() {
        this._shadow = this.attachShadow({mode: 'open'});
        this.render();
        
        this._timeId = window.setInterval( () => { 
            // how many points between each logical division
            let divisions=10;

             // this can probably be optimised without setting the attribute!
            this._pane1.setAttribute("transform", 'translate('+(this._x/divisions)+' 0)');
            
            // time position (x axis) - svg is 100 units wide, starting at 100 adds points to the right side which will then be scrolled into view
            let chx = 100+(this._ticks/divisions);

            // add some data - channel 1
            let ch1y = 35+(Math.sin(this._ticks/(30))*12)+(Math.sin(this._ticks/(22*1))*9)+2+(Math.cos(this._ticks/(22*2))*7);
            let point1 = this._graph.createSVGPoint();
            point1.x = chx;
            point1.y = ch1y;
            this._pointsCh1.appendItem(point1);

            // add some data - channel 2
            let ch2y = 35+(Math.cos(this._ticks/50)* 15);
            let point2 = this._graph.createSVGPoint();
            point2.x = chx;
            point2.y = ch2y;
            this._pointsCh2.appendItem(point2);

            // start removing points as soon as we have a screen width; this keeps the performance over time!
            if(this._pointsCh1.length > (200*divisions)) this._pointsCh1.removeItem(0);
            if(this._pointsCh2.length > (200*divisions)) this._pointsCh2.removeItem(0);  

            this._ticks++; // just a count of how many times the timer has fired!
            this._x--; // scroll left; there will be an upper (or lower limit)

        } , 10 ); // timer interval
    }
    
    render() {
        if(!this._shadow) return; // not ready yet, don't render

        let html="";

        html+='<style>:host { width: 100%; display: inline-block; text-align: center; }</style>';
        html+='<svg style="border: solid silver 1px;" width="100%" height="360px" preserveAspectRatio="none" id="graph" viewbox="0 10 100 60">';

        // defs - create a grid pattern which will be used to make the axis
        html+='';
        html+='<defs>';
        html+='  <pattern id="pattern1"';
        html+='    x="10" y="10" width="20" height="20"';
        html+='     patternUnits="userSpaceOnUse" >';

        for(let i=1; i<21; i+=2) {
            let stroke = (i==1||i==11) ? "0.05" : "0.02";
            html+='       <line x1="'+i+'" y1="0" x2="'+i+'" y2="20" style="stroke-width: '+stroke+'; stroke: #8080ff"; />';
            html+='       <line y1="'+i+'" x1="0" y2="'+i+'" x2="20" style="stroke-width: '+stroke+'; stroke: #8080ff"; />';
        }
        html+='  </pattern>';
        html+='</defs>';

        // create a graphic group, this will be translated to produce the scrolling
        html+='  <g id="pane1" transform="translate(0 0)">';

        // render a rectangle filled with the grid pattern
        html+='    <rect x="0" y="0" width="1000000" height="100" style="stroke: none; fill: url(#pattern1);" />';

        // create two polyline for each channel - these will be populated with points later
        html+='    <polyline id="channel1" style="fill:none;stroke:blue;stroke-width:0.2;opacity:0.7;"/>';
        html+='    <polyline id="channel2" style="fill:none;stroke:red;stroke-width:0.5;opacity:0.7;/>';
        
        html+='  </g">';
        html+='</svg>';

        // cache references to objecs
        this._shadow.innerHTML = html;
        this._graph = this._shadow.querySelector("#graph");
        this._pane1 = this._graph.querySelector("#pane1");
        this._pointsCh1 = this._graph.querySelector("#channel1").points;
        this._pointsCh2 = this._graph.querySelector("#channel2").points;
    }
} 

customElements.define('svg-scroller-translate', SVGScrollerTranslate );

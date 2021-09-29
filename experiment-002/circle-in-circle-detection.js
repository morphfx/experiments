(function() {
    // create svg element in div element with name "demo"
    var host = document.getElementById("demo-circle-in-circle");
    
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("width","100%");
    svg.setAttribute("height","400");
    svg.setAttribute("style", "background-color: silver;");
    host.appendChild(svg);

    // create objects to keep track of where the circles are...

    // add circle c1
    var circle1 = {
        "id": "circle1",
        "x": 200,
        "y": 200,
        "r": 100,
        "fill": "green"
    };

    // create an SVG circle based on the definition of circle1
    var c1 = createCircle(circle1, svg);   

    // add circle c2
    var circle2 = {
        "id": "circle2",
        "x": 30,
        "y": 30,
        "r": 40,
        "fill": "yellow"
    };

    // create an SVG circle based on the definition of circle2
    var c2 = createCircle(circle2, svg);

    // add mouse move handler to svg
    svg.addEventListener('mousemove',function(e) {
        var loc = cursorPoint(e);
        c2.setAttribute("cx", loc.x);
        c2.setAttribute("cy", loc.y);

        circle2.x = loc.x;
        circle2.y = loc.y;

        if( isCircleContained(circle1, circle2)) {
            c2.setAttribute("fill", "red");
        } else {
            c2.setAttribute("fill", circle2.fill);
        }
      },false);

    // need to translate the position to the SVG coordinate space
    var svgPoint = svg.createSVGPoint();
    function cursorPoint(evt){
        svgPoint.x = evt.clientX;
        svgPoint.y = evt.clientY;
        return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    }

    // here's where the maths is applied...
    function isCircleContained(parent, child) {
        // triangle sides
        var a = child.x - parent.x;
        var b = child.y - parent.y;

        // apply Pythagoras...
        var h = Math.sqrt( Math.pow(a,2) + Math.pow(b,2));

        // now the detection part
        return parent.r > (h + child.r);
    }

    function createCircle(circle, svg) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        element.setAttribute("id", circle.id);
        element.setAttribute("cx", circle.x);
        element.setAttribute("cy", circle.y);
        element.setAttribute("r", circle.r);
        element.setAttribute("fill",circle.fill);
        element.setAttribute("fill-opacity","80%");
        svg.appendChild(element);
        return element;
    }
})();
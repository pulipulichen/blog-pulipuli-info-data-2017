var div_graph = function (_selector) {
    var _container = $(_selector);
    //_container.addClass("div_graph-hide-position");
    
    var _div_list = _container.find("div");
    _div_list.addClass("div_graph-node");
    
    var _container_width = _container.outerWidth();
    var _container_height = _container.outerHeight();
    
    var _g = new Graph();
    
    var _id = _container.attr("id");
    if (_id === undefined) {
        _id = 'div_graph' + (new Date()).toISOString().slice(0,10).replace(/-/g,"");
        _container.attr('id', _id);
    }
    
    
    // ------------------------------
    
    var _div_graph_render = function (r, _n) {
        var _node_id = _n.label;
        var _node = _container.find('[node_id="' + _node_id + '"]');
        var _c = $('<div></div>').addClass("div_graph-node-wrapper").append(_node).appendTo(_container);
        var _w = _c.outerWidth();
        var _h = _c.outerHeight();
        var _x = _n.point[0];
        var _y = _n.point[1];
        /*
        console.log(JSON.stringify({
            h: _h,
            w: _w,
            x: _x,
            y: _y
        }));
        */
        var _stroke_width = 1;
        var _m = 0;
        var _rect = r.rect((_y - (_h / 2)), (_x - (_w / 2)), (_w + (_stroke_width) + (_m / 2)), (_h + (_stroke_width) + (_m / 2)))
                .attr({"fill": "#FFF", "stroke-width": _stroke_width});
        //console.log([_h / 2, _stroke_width]);
        //var _margin = 9;
        _c.addClass('appned-to-svg');

        var _offset = $(_rect.node).offset();
        _c.css({
            "top": (_offset.top + (_stroke_width / 2)) + "px",
            "left": (_offset.left + (_stroke_width / 2)) + "px"
        });
        //console.log(["c", (_offset.top + (_stroke_width / 2)), (_offset.left + (_stroke_width / 2))]);
        var start = function () {
            _c.addClass("moving");
        };
        var up = function (e) {
            var _offset = $(_rect.node).offset();
            _c.css({
                "top": (_offset.top + (_stroke_width / 2)) + "px",
                "left": (_offset.left + (_stroke_width / 2)) + "px"
            });
            _c.removeClass("moving");
        };
        var set = r.set().push(_rect);
        set.mousedown(start);
        set.mouseup(up);
        
        return set;
    };
    
    // -------------------------------
    // 畫點
    _div_list.each(function (_i, _div) {
        _div = $(_div);
        var _node_id = _div.attr("node_id");
        if (_node_id === undefined) {
            _node_id = _id + "_" + _i;
            _div.attr("node_id", _node_id);
        }
        _g.addNode(_node_id, {
            label: _node_id,
            render: _div_graph_render
        });
        //console.log(_node_id);
    });
    
    // -------------------------------
    // 劃線
    _div_list.each(function (_i, _div) {
        _div = $(_div);
        var _node_id = _div.attr("node_id");
        var _parent_node = _div.attr("parent_node");
        if (_parent_node !== undefined) {
            _parent_node = JSON.parse(_parent_node);
            if (Object.prototype.toString.call( _parent_node ) === '[object Array]') {
                for (var _p = 0; _p < _parent_node.length; _p++ ) {
                    _g.addEdge(_parent_node[_p], _node_id, { directed : true });
                    //console.log([_node_id, _parent_node[_p]]);
                }
            }
            //console.log(_parent_node);
        }
    });
    //_g.addEdge("A", "B", { directed : true });
    
    // -------------------------------
    
    //container.show();
    var _layouter = new Graph.Layout.Spring(_g);
    _layouter.layout();
    
    
    /* draw the graph using the RaphaelJS draw implementation */
    
    //var _renderer = new Graph.Renderer.Raphael(_id, _g, _container_width, _container_height);
    var _renderer = new Graph.Renderer.Raphael(_id, _g, _container_height, _container_width);
    _renderer.draw();
    var _svg = _container.find('svg:first');
    _svg.addClass("div_graph-svg")
            .attr('width', _container_width)
            .attr('height', _container_height)
            .find("rect").addClass("div_graph-rect");
    _renderer.width = _container_width;
    _renderer.height =  _container_height;
    
    
    setTimeout(function () {
        //_container.removeClass("div_graph-hide-position");
        //_layouter.layout();
        //_renderer.draw();
        //_container.hide();
        //_container.fadeIn();
    }, 100);
};

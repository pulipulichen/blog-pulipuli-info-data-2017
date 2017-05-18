var div_graph = function (_selector) {
    var _container = $(_selector);
    _container.addClass("div_graph-hide-position");
    
    var _div_list = _container.find("div");
    _div_list.addClass("div_graph-node");
    
    var _container_width = _container.width();
    var _container_height = _container.height();
    
    var _g = new Graph();
    
    var _id = _container.attr("id");
    if (_id === undefined) {
        _id = 'div_graph' + (new Date()).toISOString().slice(0,10).replace(/-/g,"");
        _container.attr('id', _id);
    }
    
    
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
            label: _node_id
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
    
    var _renderer = new Graph.Renderer.Raphael(_id, _g, _container_width, _container_height);
    _renderer.draw();
    
    setTimeout(function () {
        _container.removeClass("div_graph-hide-position");
        _container.hide();
        _container.fadeIn();
    }, 100);
};


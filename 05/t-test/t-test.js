var _draw_box_plot = function (_variables) {
    // https://dc-js.github.io/dc.js/examples/box-plot.html
    
    console.log(_variables);
    
    // ----------------------
    // 想辦法把variables轉換成experiments的資料吧
    var experiments = [];
    for (var _name in _variables) {
        var _values = _variables[_name];
        for (var _v = 0; _v < _values.length; _v++) {
            experiments.push({
                "Expt": _name,
                "Speed": _values[_v]
            });
        }
    }
    
    // -----------------------
    
    var _box_plot = $("#box_plot").empty();
    if (_box_plot.length === 0) {
        _box_plot = $('<div id="box_plot"></div>').appendTo($("body"));
    }
    
    var chart = dc.boxPlot("#box_plot");
    //d3.csv("dc-js/morley_two_col.csv", function(error, experiments) {
        console.log(experiments);

      experiments.forEach(function(x) {
        x.Speed = +x.Speed;
      });

      var ndx                 = crossfilter(experiments),
          //runDimension        = ndx.dimension(function(d) {return +d.Run;}),
          //runGroup            = runDimension.group(),
          experimentDimension = ndx.dimension(function(d) {return d.Expt;}),
          speedArrayGroup     = experimentDimension.group().reduce(
            function(p,v) {
              p.push(v.Speed);
              return p;
            },
            function(p,v) {
              p.splice(p.indexOf(v.Speed), 1);
              return p;
            },
            function() {
              return [];
            }
          );

      chart
        .width(768)
        .height(480)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(experimentDimension)
        .group(speedArrayGroup)
        .elasticY(true)
        .elasticX(true);

      dc.renderAll();
    /*
      var i=0;
      setInterval(function() {
        runDimension.filterAll();
        runDimension.filter([i++,21]);
        dc.renderAll();
      }, 2000);
    */
    //});
    
    return _box_plot;
};
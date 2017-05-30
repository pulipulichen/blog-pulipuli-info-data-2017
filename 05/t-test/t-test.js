var _draw_box_plot = function (_variables) {
    // https://dc-js.github.io/dc.js/examples/box-plot.html
    
    //console.log(_variables);
    
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
        //console.log(experiments);

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
};  // var _draw_box_plot = function (_variables) {

// --------------------------------------------

var _draw_descriptive_table = function (_variable) {
    var _table = $('<div class="analyze-result">'
        + '<div class="caption" style="text-align:center;display:block">樣本敘述統計量<sup>I</sup>：</div>'
        + '<table border="1" cellpadding="0" cellspacing="0">'
            + '<thead><tr>'
                + '<th>' + '分組變數 <br /> Grouping Vairable' + '</th>'
                + '<th>' + '樣本數 <br /> Count' + '</th>'
                + '<th>' + '平均數 <br /> Mean' + '</th>'
                + '<th>' + '中位數 <br /> Median' + '</th>'
                + '<th>' + '最小值 <br /> Minimum' + '</th>'
                + '<th>' + '最大值 <br /> Maximum' + '</th>'
                + '<th>' + '標準差 <br /> Std. dev.' + '</th>'
            + '</tr></thead>'
            + '<tbody></tbody>'
        + '</table>'
        + '<div>I: 樣本敘述統計量皆不包含遺失值</div>'
        + '</div>');
    
    var _tbody = _table.find('tbody');
    
    for (var _name in _variable) {
        var _values = _variable[_name];
        var _tr = $('<tr></tr>').appendTo(_tbody);
        
        $('<td>' + _name + '</td>').appendTo(_tr);
        
        $('<td>' + _values.length + '</td>').appendTo(_tr);
        
        $('<td>' + precision_string(_calc_avg(_values), 4) + '</td>').appendTo(_tr);
        
        $('<td>' + _calc_median(_values) + '</td>').appendTo(_tr);
        
        $('<td>' + _calc_minimum(_values) + '</td>').appendTo(_tr);
        
        $('<td>' + _calc_maximum(_values) + '</td>').appendTo(_tr);
        
        $('<td>' + precision_string(_calc_stdev(_values), 4) + '</td>').appendTo(_tr);
    }
    
    return _table;
};  // var _draw_descriptive_table = function (_variable) {


// --------------------------------------------

var _draw_f_test_table = function (_variable) {
    
    var _data = [];
    for (var _name in _variable) {
        _data.push(_variable[_name]);
    }
    
    if (_data[0].length < _data[1].length) {
        var _temp = _data[0];
        _data[0] = _data[1];
        _data[1] = _temp;
    }
    /*
    var _s1 = _calc_var(_data[0]);
    var _s2 = _calc_var(_data[1]);
    if (_s1 < _s2) {
        var _temp = _data[0];
        _data[0] = _data[1];
        _data[1] = _temp;
        console.log('交換');
    }
    */
    var _df_numerator = _data[0].length - 1;
    var _df_denominator = _data[1].length - 1;
    
    var _f_stat, _p_value, _lower, _upper;
    
        _f_stat = F_TEST.calc_f_stat(_data[0], _data[1]);
        _p_value = jStat.centralF.cdf(_f_stat, _df_numerator, _df_denominator)*2;

        _lower = F_TEST.calc_confidence_interval_lower(_data[0], _data[1]);
        _upper = F_TEST.calc_confidence_interval_upper(_data[0], _data[1]);
    
    //console.log();
    
    var _pass = false;
    if (_p_value < 0.05) {
        _pass = true;
    }
    
    var _table = $('<div class="analyze-result">'
        + '<div class="caption" style="text-align:center;display:block">雙樣本變異數(標準差)差異檢定：</div>'
        + '<table border="1" cellpadding="0" cellspacing="0" class="var_test" var_test="' + _pass + '">'
            + '<thead>'
                + '<tr><th colspan="6"><strong>虛無假設</strong>：兩組資料的變異數相等<br />H<sub>0</sub>: σ<sub>1</sub><sup>2</sup>/σ<sub>2</sub><sup>2</sup> = 1</th></tr>'
                + '<tr><th rowspan="2">' + 'F檢定統計量 <br /> F-statistics' + '</th>'
                + '<th rowspan="2">' + '分子自由度 <br /> d.f. of numerator' + '</th>'
                + '<th rowspan="2">' + '分母自由度 <br /> d.f. of denominator' + '</th>'
                + '<th rowspan="2">' + 'p-值<sup>I</sup> <br /> p-value' + '</th>'
                + '<th colspan="2">' + '母體變異數比值的95%信賴區間 <br /> 95% C.I. for ratio' + '</th></tr>'
                + '<tr>'
                + '<th>' + '下界 <br /> lower' + '</th>'
                + '<th>' + '上界 <br /> upper' + '</th>'
            + '</tr></thead>'
            + '<tbody><tr>'
                + '<td>' + precision_string(_f_stat, 4) + '</td>'
                + '<td>' + _df_numerator + '</td>'
                + '<td>' + _df_denominator + '</td>'
                + '<td>' + precision_string(_p_value, 4) + '</td>'
                + '<td>' + precision_string(_lower, 4) + '</td>'
                + '<td>' + precision_string(_upper, 4) + '</td>'
            + '</tr></tbody>'
        + '</table>'
        + '<div>I: 顯著性代碼： \'***\': < 0.001, \'**\': < 0.01, \'*\': < 0.05, \'#\': < 0.1, </div>'
        + '</div>');

    return  _table;
};

var _draw_levene_test_table = function (_variable) {
    // https://jstat.github.io/all.html#jStat.centralF.pdf
    
    var _data = [];
    for (var _name in _variable) {
        _data.push(_variable[_name]);
    }
    
    if (_data[0].length < _data[1].length) {
        var _temp = _data[0];
        _data[0] = _data[1];
        _data[1] = _temp;
    }
    
    var _f_stat, _p_value, _crit = 0;
    _f_stat = LEVENE_TEST.calc_levene_test(_variable);
    var k = LEVENE_TEST.calc_k(_data);
    var N = LEVENE_TEST.calc_N(_variable);

    _crit = LEVENE_TEST.calc_critical_value(k, N, 0.05);

    //_p_value = jStat.centralF.pdf(_f_stat, k-1, N-k )*2;
    _p_value = LEVENE_TEST.calc_p_value(k, N, _f_stat);
    
    var _pass = false;
    if (_p_value < 0.05) {
        _pass = true;
    }
    
        var _table = $('<div class="analyze-result">'
        + '<div class="caption" style="text-align:center;display:block">(獨立)多樣本變異數(標準差)差異檢定：</div>'
        + '<table border="1" cellpadding="0" cellspacing="0" class="var_test" var_test="' + _pass + '">'
            + '<thead>'
                + '<tr><th colspan="5"><strong>虛無假設</strong>：兩組資料的變異數相等<br />H<sub>0</sub>: σ<sub>1</sub><sup>2</sup> = σ<sub>2</sub><sup>2</sup></th></tr>'
                + '<tr><th>' + 'F檢定統計量 <br /> F-statistics' + '</th>'
                + '<th>' + '分子自由度 <br /> d.f. of numerator' + '</th>'
                + '<th>' + '分母自由度 <br /> d.f. of denominator' + '</th>'
                + '<th>' + '臨界值 <br /> F(d.f.1, d.f.2, 1-α)' + '</th>'
                + '<th>' + 'p-值<sup>I</sup> <br /> p-value' + '</th>'
            + '</tr></thead>'
            + '<tbody><tr>'
                + '<td>' + precision_string(_f_stat, 4) + '</td>'
                + '<td>' + (k-1) + '</td>'
                + '<td>' + (N-k) + '</td>'
                + '<td>' + precision_string(_crit, 4) + '</td>'
                + '<td>' + precision_string(_p_value, 4) + '</td>'
            + '</tr></tbody>'
        + '</table>'
        + '<div>I: 顯著性代碼： \'***\': < 0.001, \'**\': < 0.01, \'*\': < 0.05, \'#\': < 0.1, </div>'
        + '</div>');

    return  _table;
};
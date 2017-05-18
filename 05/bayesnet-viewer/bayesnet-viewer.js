var _draw_result_table = function (_xml_text) {
    var _container = $("#preview_html");
    var _node_width_unit = 200;
    
    var _xml = $($.parseXML(_xml_text));
    //console.log(_xml.find('VARIABLE[TYPE="nature"]').length);
    
    var _variables = _xml.find('VARIABLE[TYPE="nature"]');
    
    // ------------------------------------
    
    var _square = Math.ceil(Math.sqrt(_variables.length));
    _container.css({
        "border": "1px solid red",
        //"width": (_node_width_unit * _square) + "px",
        "height": (_node_width_unit * _square) + "px"
    });
    
    // ----------------------------------------
    var _given = {};
    var _cpt = {};
    var _outcome = {};
    _xml.find("DEFINITION").each(function (_i, _ele) {
        _ele = $(_ele);
        
        var _for = _ele.find("FOR:first").text();
        var _g = [];
        _ele.find("GIVEN").each(function (_j, _ele_given) {
            _g.push($(_ele_given).text());
        });
        _given[_for] = _g;
        
        var _table = _ele.find("TABLE:first").text();
        _cpt[_for] = _table;
    });
    
    // ------------------------------------
    
    _variables.each(function (_i, _ele) {
        _ele = $(_ele);
        var _name = _ele.find('NAME:first');
        if (_name.length === 0) {
            _name = _ele.find('name:first');
        }
        _name = _name.text();
        
        // -------------------------
        var _o = [];
        _ele.find("OUTCOME").each(function (_j, _ele_given) {
            _o.push($(_ele_given).text());
        });
        _outcome[_name] = _o;
        
        // -------------------------
        
        var _div = $('<div node_id="' + _name + '"><span class="attr-name">' + _name + '</span></div>');
        _div.appendTo(_container);
        
        if (_given[_name].length > 0) {
            _div.attr("parent_nodes", JSON.stringify(_given[_name]));
        }
        
        //_div.css("background-color", 'yellow');
        
        var _outcome_click_handler = function () {
            var _d_li = $(this);
            _d_li.addClass("current");
            var _ul = _d_li.parent();
            // 先把其他人的checked都移除掉
            _ul.find('li:not(.current) :checked').prop('checked', false);
            _ul.find(".set").removeClass("set");
            //_d_li.find("input").attr("checked", "checked");
            if (_d_li.find("input").prop("checked") === true) {
                _d_li.addClass("set");
            }
            _d_li.removeClass("current");
        };
        
        var _domain_ul = $("<ul></ul>").appendTo(_div);
        for (var _o in _outcome[_name]) {
            var _d = _outcome[_name][_o];
            var _d_li = $('<li><label><input type="checkbox" /> ' + _d + ': <span class="prob">100.00</span>%</label></li>').appendTo(_domain_ul);
            _d_li.click(_outcome_click_handler);
        }
    });
    
    // ----------------------------------
    
    div_graph("#preview_html");
};
var DEBUG = {
    enable_bayes: true
};

var _draw_result_table = function (_xml_text) {
    var _container = $("#preview_html");
    var _node_width_unit = 250;
    
    var _xml = $($.parseXML(_xml_text));
    //console.log(_xml.find('VARIABLE[TYPE="nature"]').length);
    
    var _variables_ele = _xml.find('VARIABLE[TYPE="nature"]');
    
    // ------------------------------------
    
    var _square = Math.ceil(Math.sqrt(_variables_ele.length));
    _container.css({
        //"border": "1px solid red",
        //"width": (_node_width_unit * _square) + "px",
        "height": (_node_width_unit * _square) + "px",
        "border-width": 0
    });
    
    if (_container.outerWidth() < (_node_width_unit * _square)) {
        _container.css("width", (_node_width_unit * _square) + "px");
    }
    
    // ----------------------------------------
    var _given = {};
    var _cpt = {};
    var _outcome = {};
    var _bayes_nodes = {};
    _xml.find("DEFINITION").each(function (_i, _ele) {
        _ele = $(_ele);
        
        var _for = _ele.find("FOR:first").text();
        var _g = [];
        _ele.find("GIVEN").each(function (_j, _ele_given) {
            _g.push($(_ele_given).text());
        });
        _given[_for] = _g;
        
        var _table = _ele.find("TABLE:first").text();
        var _cpt_table = [];
        var _lines = _table.trim().split("\n");
        for (var _l = 0; _l < _lines.length; _l++) {
            var _field = _lines[_l].trim().split(" ");
            var _cpt_row = [];
            for (var _f = 0; _f < _field.length; _f++) {
                _cpt_row.push(eval(_field[_f]));
            }
            _cpt_table.push(_cpt_row);
        }
        _cpt[_for] = _cpt_table;
    });
    //console.log(_cpt);
    
    // ------------------------------------
    
    var _outcome_click_handler = function () {
        var _d_li = $(this);
        _d_li.addClass("current");
        var _ul = _d_li.parent();
        var _div = _d_li.parents("[node_id]:first");
        var _name = _div.attr("node_id");
        var _setted_evi = _div.find(".setted-evidence");
        var _value_index = parseInt(_d_li.attr("value_index"), 10);
        // 先把其他人的checked都移除掉
        _ul.find('li:not(.current) :checked').prop('checked', false);
        _ul.find(".set").removeClass("set");
        //_d_li.find("input").attr("checked", "checked");
        _d_li.removeClass("current");

        // ------------------------------------------
        //console.trace(_name);
        if (_d_li.find("input").prop("checked") === true) {
            _d_li.addClass("set");
            _bayes_nodes[_name].value = _value_index;
            _bayes_nodes[_name].isObserved = true;
            _setted_evi.text("=" + _d_li.attr("outcome"));
            _div.addClass("set");
        }
        else {
            _bayes_nodes[_name].isObserved = false;
            _setted_evi.empty();
            _div.removeClass("set");
        }
        _display_bayesnet_prob_dis();
    };
    
    var _variables = [];
    _variables_ele.each(function (_i, _ele) {
        _ele = $(_ele);
        var _name = _ele.find('NAME:first');
        if (_name.length === 0) {
            _name = _ele.find('name:first');
        }
        _name = _name.text();
        _variables.push(_name);
        
        // -------------------------
        var _o = [];
        _ele.find("OUTCOME").each(function (_j, _ele_given) {
            _o.push($(_ele_given).text());
        });
        _outcome[_name] = _o;
        
        // -------------------------
        
        var _div = $('<div node_id="' + _name + '"><span class="attr-name">' + _name + '</span><span class="setted-evidence"></span></div>');
        _div.appendTo(_container);
        
        if (_given[_name].length > 0) {
            _div.attr("parent_nodes", JSON.stringify(_given[_name]));
        }
        
        //_div.css("background-color", 'yellow');
        
        
        
        var _domain_ul = $('<ul></ul>').appendTo(_div);
        for (var _o = 0; _o < _outcome[_name].length; _o++) {
            var _d = _outcome[_name][_o];
            var _d_li = $('<li outcome="' + _d + '"><label><input type="checkbox" /> ' + _d + ': <span class="prob">100.00</span>%</label></li>').appendTo(_domain_ul);
            _d_li.attr("value_index", _o).click(_outcome_click_handler);
            //_d_li
        }
        //_domain_ul.find("li");
        
        
    });
    
    // --------------------------
    // 重整cpt表格
    if (DEBUG.enable_bayes === true) {
        var _reorganize_cpt = function (_config, _pi) {
            //var _parents = _given[_name];
            if (_config.p.length === 0) {
                return _config.c[0];
            }
            else if (_pi === _config.p.length) {
                var _c = _config.c[_config.l];
                _config.l++;
                return _c;
            }
            else {
                var _c = [];
                var _parent_name = _config.p[_pi];
                var _parent_outcome = _outcome[_parent_name];
                //console.log(_pi);
                //_config.pi++;
                for (var _p = 0; _p < _parent_outcome.length; _p++) {
                    _c.push(_reorganize_cpt(_config, (_pi+1) ));
                    //var _parent_outcome_list = _outcome[_parent_name];
                }
                while (_c.length === 1) {
                    _c = _c[0];
                }
                return _c;
            }
        };
        
        for (var _name in _cpt) {
            var _config = {
                c: _cpt[_name],
                l: 0,
                p: _given[_name]
            };
            //console.log(_config);
            _cpt[_name] = _reorganize_cpt(_config, 0);
        }
       /*
        var _reorganize_cpt = function (_c, _parents_list, _p_index) {
            var _parent_name = _parents_list[_p_index];
            
        };
       
        for (var _name in _cpt) {
            if (_cpt[_name].length === 1) {
                _cpt[_name] = _cpt[_name][0];
            }
            else {
                var _parents_list = _given[_name];
                //var _new_parents_list = [];
                _cpt[_name] = _reorganize_cpt(_cpt[_name], _parents_list, 0);
            }
        }
        */
        //console.log(_cpt);
    }
    
    
    // -----------------------
    // 設定貝氏網路\
    if (DEBUG.enable_bayes === true) {
        for (var _v = 0; _v < _variables.length; _v++) {
            var _name = _variables[_v];
            var _bn  = new Bayes.Node(_name,_outcome[_name]);
            _bn.cpt = _cpt[_name];
            _bayes_nodes[_name] = _bn;
            //Bayes.nodes.push(_bn);
        }
    }
    
    
    // 設定parent
    if (DEBUG.enable_bayes === true) {
        for (var _name in _given) {
            var _parents = _given[_name];
            for (var _i = 0; _i < _parents.length; _i++) {
                var _parent_name = _parents[_i];
                _bayes_nodes[_name].parents.push(_bayes_nodes[_parent_name]);
            }
        }
        
        for (var _name in _bayes_nodes) {
            Bayes.nodes.push(_bayes_nodes[_name]);
        }
    }
    
    var _display_bayesnet_prob_dis = function () {
        if (DEBUG.enable_bayes === true) {
            Bayes.sample(10000);
        }
        for (var _name in _bayes_nodes) {
            var _probs = _display_prob_dis(_bayes_nodes[_name].sampledLw);
            for (var _i = 0; _i < _probs.length; _i++) {
                var _p = _probs[_i];
                _container.find('div[node_id="' + _name + '"] li[value_index="' + _i + '"] .prob').text(_p);
            }
        }
    };
    
    // ----------------------------------
    
    div_graph("#preview_html");
    _display_bayesnet_prob_dis();
    $("#preview_html_wrapper").addClass("wrapper");
    //console.log(Bayes);
};

var _display_prob_dis = function (_ary) {
    //console.log(_ary);
    var _sum = _ary.reduce(function(a, b) { return a + b; }, 0);
    var _ary2 = [];
    for (var _i = 0; _i < _ary.length; _i++ ) {
        var _p = _ary[_i] / _sum;
        _p = Math.round(_p * 10000) / 100;
        if (isNaN(_p)) {
            console.log("NaN");
        }
        _ary2.push(_p);
    }
    return _ary2;
};

var _DEBUG = {
    force_fisher: false
};

_ct_json = {};

var _load_csv_to_ct_json = function (_csv) {
    if (_csv === undefined || _csv.trim() === "") {
        return;
    }
    
    _ct_json = {};
    
    // ,性別:男性,性別:女性
    // 錄取結果:通過,35,20
    // 錄取結果:不通過,45,40
    
    // ,性別:男性,性別:女性\n錄取結果:通過,35,20\n錄取結果:不通過,45,40
    
    var _lines = _csv.trim().split("\n");
    
    // x var
    var _x_vars = _lines[0].trim().split(",");
    var _var_x_list = [];
    var _x_name = "X";
    for (var _i = 1; _i < _x_vars.length; _i++) {
        var _name = _x_vars[_i].trim();
        var _pos = _name.indexOf(":");
        if (_pos > -1) {
            _x_name = _name.substr(0, _pos).trim();
            _name = _name.substring(_pos+1, _name.length).trim();
        }
        _var_x_list.push(_name);
    };
    $("#variable_x_name").val(_x_name);
    
    // --------------------
    
    // y var
    var _y_name = "Y";
    var _var_y_list = [];
    for (var _i = 1; _i < _lines.length; _i++) {
        var _fields = _lines[_i].trim().split(",");
        
        var _name = _fields[0];
        var _pos = _name.indexOf(":");
        if (_pos > -1) {
            _y_name = _name.substr(0, _pos).trim();
            _name = _name.substring(_pos+1, _name.length ).trim();
        }
        _var_y_list.push(_name);
    }
    $("#variable_y_name").val(_y_name);
    
    // --------------------
    for (var _i = 1; _i < _lines.length; _i++) {
        var _fields = _lines[_i].trim().split(",");
        var _y = _i-1;
        for (var _j = 1; _j < _fields.length; _j++) {
            var _x = _j-1;
            
            var _x_name = _var_x_list[_x];
            var _y_name = _var_y_list[_y];
            
            // ----------
            
            var _cell = _fields[_j].trim();
            if (isNaN(_cell)) {
                _cell = 0;
            }
            _cell = eval(_cell);
            
            // ----------
            
            if (typeof(_ct_json[_x_name]) !== "object") {
                _ct_json[_x_name] = {};
            }
            _ct_json[_x_name][_y_name] = _cell;
        }
    }
    
    _draw_contingency_table_from_ct_json();
};

var _get_ct_json_from_ui = function () {
    _ct_json = {};
    var _table = $("#contingency_table");
    
    var _var_x_name = _table.find("#variable_x_name").val().trim();
    if (_var_x_name === "") {
        _var_x_name = "X";
    }
    var _var_y_name = _table.find("#variable_y_name").val().trim();
    if (_var_y_name === "") {
        _var_y_name = "Y";
    }
    
    // --------------------------
    
    var _var_x_list = [];
    _table.find(".variable_x").each(function (_i, _input) {
        var _name = _input.value.trim();
        if (_name === "") {
            _name = "X" + _i;
        }
        _var_x_list.push(_name);
    });
    
    var _var_y_list = [];
    _table.find(".variable_y").each(function (_i, _input) {
        var _name = _input.value.trim();
        if (_name === "") {
            _name = "Y" + _i;
        }
        _var_y_list.push(_name);
    });
    
    // --------------------------
    
    _table.find("tbody tr").each(function (_y, _y_tr) {
        $(_y_tr).find(".vairable_cell").each(function (_x, _cell) {
            var _cell_value = _cell.value.trim();
            if (isNaN(_cell_value)) {
                _cell_value = 0;
            }
            _cell_value = eval(_cell_value);
            
            var _x_attr = _var_x_list[_x];
            var _y_attr = _var_y_list[_y];
            
            if (typeof(_ct_json[_x_attr]) === "undefined") {
                _ct_json[_x_attr] = {};
            }
            _ct_json[_x_attr][_y_attr] = _cell_value;
        });
    });
    
    return _ct_json;
};

/**
 * 
 * @param {type} _dimension [x|y]
 * @param {type} _name
 * @returns {undefined}
 */
var _remove_ct_json_attr = function (_dimension, _name) {
    if (_dimension === undefined) {
        return;
    }
    
    _ct_json = _get_ct_json_from_ui();
    if (_dimension === "x" && typeof(_ct_json[_name]) === "object") {
        delete _ct_json[_name];
    }
    else if (_dimension === "y") {
        for (var _x_name in _ct_json) {
            if (typeof(_ct_json[_x_name][_name]) !== "undefined") {
                delete _ct_json[_x_name][_name];
            }
        }
    }
    
    _draw_contingency_table_from_ct_json();
};

$(function () {
    $('.contingency-table-col-plus button').click(function () {
        _add_ct_json_attr('x');
    });
    $('.contingency-table-row-plus button').click(function () {
        _add_ct_json_attr('y');
    });
});

var _add_ct_json_attr = function (_dimension) {
    _ct_json = _get_ct_json_from_ui();
    var _id = _dimension.toUpperCase() + (_count_attr(_dimension) + 1);
    if (_dimension === "x") {
        _ct_json[_id] = {};
        var _y_list = _get_attr('y');
        for (var _i = 0; _i < _y_list.length; _i++) {
            _ct_json[_id][_y_list[_i]] = 0;
        }
    }
    else {
        for (var _x in _ct_json) {
            _ct_json[_x][_id] = 0;
        }
    }
    
    
    _draw_contingency_table_from_ct_json();
};

var _count_attr = function (_dimension) {
    var _count = 0;
    if (_dimension === "x") {
        for (var _x in _ct_json) {
            _count++;
        }
    }
    else {
        for (var _x in _ct_json) {
            for (var _y in _ct_json[_x]) {
                _count++;
            }
            break;
        }
    }
    return _count;
};

var _get_attr = function (_dimension) {
    var _attr_list = [];
    if (_dimension === 'x') {
        for (var _x in _ct_json) {
            _attr_list.push(_x);
        }
    }
    else {
        for (var _x in _ct_json) {
            for (var _y in _ct_json[_x]) {
                _attr_list.push(_y);
            }
            break;
        }
    }
    return _attr_list;
};

var _draw_contingency_table_from_ct_json = function () {
    //console.log(_ct_json);
    
    _reset_contingency_table();
    
    // -------------------------------
    
    var _x_count = 0;
    var _y_count;
    
    var _table = $("#contingency_table");
    var _tbody = _table.find("tbody");
    var _x_tr = _table.find(".variable_x_tr");
    for (var _x_name in _ct_json) {
        _x_tr.append(_create_vairable_th("x",_x_name));
        _x_count++;
        
        _y_count = 0;
        for (var _y_name in _ct_json[_x_name]) {
            
            
            if (_tbody.find('.variable_y[value="' + _y_name + '"]').length === 0) {
                var _y_th = _create_vairable_th("y",_y_name);
                
                var _tr = _tbody.find('tr:first');
                if (_tr.find("th").length > 1) {
                    // 表示第一列已經有資料
                    _tr = $('<tr></tr>').appendTo(_tbody);
                }
                
                _tr.append(_y_th);
                
                // ---------------------------
            }
            
            // -------------------------------
            
            var _cell_td = _create_cell_td(_ct_json[_x_name][_y_name]);
            _tbody.find('tr:eq(' + _y_count + ')').append(_cell_td);
            
            _y_count++;
        }
    }
    
    // ------------------------------
    // 設定span
    if (_x_count < 1) {
        _x_count = 1;
    }
    if (_y_count < 1) {
        _y_count = 1;
    }
    $(".variable_x_th").attr("colspan", _x_count);
    $(".variable_y_th").attr("rowspan", _y_count);
    
    _draw_result_table();
};

var _reset_contingency_table = function () {
    var _table = $("#contingency_table");
    _table.find(".cell_td").remove();
    _table.find(".variable_th").remove();
    _table.find("tbody tr:not(:first)").remove();
};

var _create_remove_attr_button = function (_dimension, _name) {
    var _ele = $('<button class="ui icon button" type="button" data-dimension="' + _dimension + '" data-name="' + _name + '">'
        + '<i class="minus square icon remove_attr" ></i>'
        + '</button>');
    _ele.click(function () {
        var _this = $(this);
        var _dimension = _this.data("dimension");
        var _name = _this.data("name");
        _remove_ct_json_attr(_dimension, _name);
    });
    return _ele;
};

var _create_vairable_th = function (_dimension, _name) {
    var _ele = $('<th class="variable_th">'
            + '<div class="ui action input">'
            + '<input type="text" value="' + _name + '" class="variable_' + _dimension + '" />'
            + '</div>'
            + '</th>');
    _ele.find("div").append(_create_remove_attr_button(_dimension, _name));
    _ele.find('.variable_' + _dimension).change(function () {
        _draw_result_table();
    });
    return _ele;
};

var _create_cell_td = function (_cell) {
    var _ele = $('<td class="cell_td"><input type="text" value="' + _cell + '" class="vairable_cell" /></td>');
    _ele.find('input').change(function () {
        _draw_result_table();
    });
    return _ele;
};

// --------------------------------------

var _cramer_v_k;
var _x_var_count;
var _y_var_count;
var _draw_result_table = function () {
    _ct_json = _get_ct_json_from_ui();
    _reset_result();
    
    //var _n = 0.07215074898001728;
    //console.log([precision_string(_n, 3), _n]);
    //return;
    
    var _panel = $(".file-process-framework");
    var _result = _panel.find("#preview_html");
    
    var _cross_table = $('<div class="cross-table"><table border="1" cellpadding="0" cellspacing="0">'
        + '<thead>'
            + '<tr class="x-var-tr"><th colspan="3" rowspan="2"></th><th class="x-var-name"></th><th rowspan="2" valign="bottom">' + '總合' + '</th></tr>'
            + '<tr class="x-vars-tr"></tr></thead>'
        + '<tbody></tbody>'
        + '<tfoot>'
            + '<tr class="x-sum num-tr"><th rowspan="5" colspan="2" align="left" valign="top">' + '總合' + '</th><th align="left" valign="top">' + '個數' + '</th></tr>'
            + '<tr class="x-sum exp-tr"><th align="left" valign="top">' + '期望個數' + '</th></tr>' 
            + '<tr class="x-sum y-per-tr"><th align="left" valign="top">' + '(<span class="y-var-name"></span>)列之內的百分比' + '</th></tr>'
            + '<tr class="x-sum x-per-tr"><th align="left" valign="top">' + '(<span class="x-var-name"></span>)欄之內的百分比' + '</th></tr>'
            + '<tr class="x-sum per-tr"><th align="left" valign="top">' + '整體百分比' + '</th></tr>'
        + '</tfoot>'
        + '</table></div>');

    if ($("#input_table_style_display:checked").length === 0) {
        _cross_table.addClass("analyze-result");
    }
    _cross_table.appendTo(_result);
    
    // ------------------
    // 先畫出x變數
    
    var _x_var_name = _cross_table.find(".x-var-name:first");
    var _x_name = $("#variable_x_name").val().trim();
    _x_var_name.html(_x_name);
    
    var _x_vars_tr = _cross_table.find('.x-vars-tr');
    _x_vars_count = 0;
    var _x_vars_list = [];
    $("#contingency_table input.variable_x").each(function (_i, _input) {
        var _name = _input.value.trim();
        if (_name !== "") {
            $('<th>' + _name + '</th>').appendTo(_x_vars_tr);
            _x_vars_list.push(_name);
            _x_vars_count++;
        }
    });
    _x_var_name.attr("colspan", _x_vars_count);
    
    // ----------------------
    // 再畫出y變數
    
    
    var _tbody = _cross_table.find('tbody');
    var _y_var_name;
    _y_vars_count = 0;
    var _y_name = $("#variable_y_name").val().trim();
    $("#contingency_table input.variable_y").each(function (_i, _input) {
        var _name = _input.value.trim();
        if (_name === "") {
            return;
        }
        
        // -----------
        
        var _tr_num = $('<tr y_var="' + _name + '" class="num-tr"><th rowspan="8" class="bottom-border-thin" valign="top" align="left">' + _name + '</th>'
                + '<th valign="top" align="left">' + '個數' + '</th></tr>').appendTo(_tbody);
        var _tr_exp = $('<tr y_var="' + _name + '" class="exp-tr"><th valign="top" align="left">' + '期望個數' + '</th></tr>').appendTo(_tbody);
        var _tr_y_per = $('<tr y_var="' + _name + '" class="y-per-tr"><th valign="top" align="left">' + '(<span class="y-var-name"></span>)列之內的百分比' + '</th></tr>').appendTo(_tbody);
        var _tr_x_per = $('<tr y_var="' + _name + '" class="x-per-tr"><th valign="top" align="left">' + '(<span class="x-var-name"></span>)欄之內的百分比' + '</th></tr>').appendTo(_tbody);
        var _tr_global = $('<tr y_var="' + _name + '" class="global-tr"><th valign="top" align="left">' + '整體百分比' + '</th></tr>').appendTo(_tbody);
        var _tr_residual = $('<tr y_var="' + _name + '" class="residual-tr"><th valign="top" align="left">' + '殘差' + '</th></tr>').appendTo(_tbody);
        var _tr_std_residual = $('<tr y_var="' + _name + '" class="std-residual-tr"><th valign="top" align="left">' + '標準化殘差' + '</th></tr>').appendTo(_tbody);
        var _tr_adj_residual = $('<tr y_var="' + _name + '" class="adj-residual-tr bottom-border-thin"><th valign="top" align="left">' + '調整後殘差' + '</th></tr>').appendTo(_tbody);
        
        // -----------
        
        if (_y_vars_count === 0) {
            // 插入y變數的名字
            _y_var_name = $('<th class="y-var-name" valign="top" align="left"></th>')
                    .prependTo(_tr_num);
            _y_var_name.html(_name);
        }
        _y_vars_count++;
        
        // -----------
        
        for (var _j = 0; _j < _x_vars_count+1; _j++) {
            var _td = $('<td align="right"></td>');
            if (_j < _x_vars_count) {
                _td.attr('x_var', _x_vars_list[_j]);
            }
            else {
                _td.addClass('y-sum');
            }
            _td.clone().appendTo(_tr_num);
            _td.clone().appendTo(_tr_exp);
            _td.clone().appendTo(_tr_y_per);
            _td.clone().appendTo(_tr_x_per);
            _td.clone().appendTo(_tr_global);
            _td.clone().appendTo(_tr_residual);
            _td.clone().appendTo(_tr_std_residual);
            _td.clone().appendTo(_tr_adj_residual);
        }
        
        // -------------------
        
    }); // $("#contingency_table input.variable_y").each(function (_i, _input) {
    
    _y_var_name.attr('rowspan', _y_vars_count * 8);
    _cross_table.find('.x-var-name').html(_x_name);
    _cross_table.find('.y-var-name').html(_y_name);
    
    //return;
    
    // ------------------------
    // 結尾
    
    var _tfoot_num_tr = _cross_table.find('tfoot > .x-sum.num-tr');
    var _tfoot_exp_tr = _cross_table.find('tfoot > .x-sum.exp-tr');
    var _tfoot_y_per_tr = _cross_table.find('tfoot > .x-sum.y-per-tr');
    var _tfoot_x_per_tr = _cross_table.find('tfoot > .x-sum.x-per-tr');
    var _tfoot_per_tr = _cross_table.find('tfoot > .x-sum.per-tr');
    
    for (var _j = 0; _j < _x_vars_count+1; _j++) {
        var _td = $('<td align="right"></td>');
        if (_j < _x_vars_count) {
            _td.attr('x_var', _x_vars_list[_j]);
        }
        else {
            _td.addClass('total-sum');
        }
        _td.clone().appendTo(_tfoot_num_tr);
        _td.clone().appendTo(_tfoot_exp_tr);
        _td.clone().appendTo(_tfoot_y_per_tr);
        _td.clone().appendTo(_tfoot_x_per_tr);
        _td.clone().appendTo(_tfoot_per_tr);
    }
    
    //_result.html("1");
    
    _cramer_v_k = _x_vars_count;
    if (_y_vars_count < _x_vars_count) {
        _cramer_v_k = _y_vars_count;
    }
    
    _draw_num_cell();
};

var _x_sum_list;
var _y_sum_list;
var _total_sum;

var _is_sum_too_small;
var _is_zero_cell_existed;

var _draw_num_cell = function () {
    _x_sum_list = {};
    _y_sum_list = {};
    _total_sum = 0;
    _is_sum_too_small = true;
    _is_zero_cell_existed = false;
    
    var _cross_table = $("#preview_html .cross-table");
    
    for (var _x_var_name in _ct_json) {
        for (var _y_var_name in _ct_json[_x_var_name]) {
            var _num = _ct_json[_x_var_name][_y_var_name];
            
            if (_num === 0) {
                _is_zero_cell_existed = true;
            }
            
            _cross_table.find('.num-tr[y_var="' + _y_var_name + '"] [x_var="' + _x_var_name +'"]').html(_num);
            
            if (typeof(_x_sum_list[_x_var_name]) === 'undefined') {
                _x_sum_list[_x_var_name] = 0;
            }
            _x_sum_list[_x_var_name] += _num;
            
            if (typeof(_y_sum_list[_y_var_name]) === 'undefined') {
                _y_sum_list[_y_var_name] = 0;
            }
            _y_sum_list[_y_var_name] += _num;
            
            _total_sum += _num;
        }
    }
    
    for (var _x_var_name in _x_sum_list) {
        var _sum = _x_sum_list[_x_var_name];
        if (_sum >= 20) {
            _is_sum_too_small = false;
        }
        _cross_table.find('.x-sum.num-tr [x_var="' + _x_var_name + '"]').html(_sum);
        _cross_table.find('.x-sum.exp-tr [x_var="' + _x_var_name + '"]').html(_sum);
    }
    
    _cross_table.find('tbody .y-per-tr .y-sum').html(precision_string(100, 1) + '%');
    
    for (var _y_var_name in _y_sum_list) {
        var _sum = _y_sum_list[_y_var_name];
        if (_sum >= 20) {
            _is_sum_too_small = false;
        }
        
        _cross_table.find('.num-tr[y_var="' + _y_var_name + '"] .y-sum').html(_sum);
        _cross_table.find('.exp-tr[y_var="' + _y_var_name + '"] .y-sum').html(_sum);
    }
    
    _cross_table.find('.x-sum.x-per-tr td[x_var]').html(precision_string(100, 1) + '%');
    
    _cross_table.find('.x-sum.num-tr .total-sum').html(_total_sum);
    _cross_table.find('.x-sum.exp-tr .total-sum').html(_total_sum);
    _cross_table.find('.x-sum.y-per-tr .total-sum').html(precision_string(100, 1) + '%');
    _cross_table.find('.x-sum.x-per-tr .total-sum').html(precision_string(100, 1) + '%');
    _cross_table.find('.x-sum.per-tr .total-sum').html(precision_string(100, 1) + '%');
    
    _draw_x_percent_cell();
    _draw_y_percent_cell();
    _draw_cell_percent_cell();
};

_x_per_list = {};
var _draw_x_percent_cell = function () {
    var _cross_table = $("#preview_html .cross-table");
    for (var _x_var_name in _x_sum_list) {
        var _num = _x_sum_list[_x_var_name];
        var _per = (_num) / _total_sum * 100;
        _x_per_list[_x_var_name] = _per / 100;
        var _per_text = precision_string(_per, 1) + '%';
        //console.log([_x_var_name, _num, _per]);
        
        _cross_table.find('.x-sum.y-per-tr [x_var="' + _x_var_name + '"]').html(_per_text);
        _cross_table.find('.x-sum.per-tr [x_var="' + _x_var_name + '"]').html(_per_text);
    }
};

_y_per_list = {};
var _draw_y_percent_cell = function () {
    var _cross_table = $("#preview_html .cross-table");
    for (var _y_var_name in _y_sum_list) {
        var _num = _y_sum_list[_y_var_name];
        var _per = (_num) / _total_sum * 100;
        _y_per_list[_y_var_name] = _per / 100;
        var _per_text = precision_string(_per, 1) + '%';
        //console.log([_x_var_name, _num, _per]);
        
        _cross_table.find('.x-per-tr[y_var="' + _y_var_name + '"] .y-sum').html(_per_text);
        _cross_table.find('.global-tr[y_var="' + _y_var_name + '"] .y-sum').html(_per_text);
    }
};

var _get_percent_text = function (_per) {
    _per = _per*100;
    return precision_string(_per, 1) + '%';
};

var _is_cell_exp_too_small;
var _draw_cell_percent_cell = function () {
    
    _is_cell_exp_too_small = false;
    
    var _chi_squared = 0;
    var _yates_chi_squared = 0;
    
    var _cross_table = $("#preview_html .cross-table");
    var _tbody = _cross_table.find("tbody");
    for (var _x_var_name in _ct_json) {
        for (var _y_var_name in _ct_json[_x_var_name]) {
            var _num = _ct_json[_x_var_name][_y_var_name];
            
            var _total_per = _num / _total_sum;
            _tbody.find('tr.global-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(_get_percent_text(_total_per));
            
            var _y_per = _num / _y_sum_list[_y_var_name];
            _tbody.find('tr.y-per-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(_get_percent_text(_y_per));
            
            var _x_per = _num / _x_sum_list[_x_var_name];
            _tbody.find('tr.x-per-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(_get_percent_text(_x_per));
            
            var _exp = (_x_sum_list[_x_var_name] * _y_sum_list[_y_var_name]) / _total_sum;
            _tbody.find('tr.exp-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(precision_string(_exp, 1));
            if (_num === 5) {
                console.log({
                    "exp": _exp,
                    "x": _x_sum_list[_x_var_name],
                    "y": _y_sum_list[_y_var_name],
                    "n": _total_sum
                });
            }
            
            if (_exp < 5) {
                _is_cell_exp_too_small = true;
            }
            
            var _residual = _num - _exp;
            _tbody.find('tr.residual-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(precision_string(_residual, 1));
            
            var _std_residual = _residual / Math.sqrt(_exp);
            _tbody.find('tr.std-residual-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(precision_string(_std_residual, 1));
            
            var _adj_residual = _residual / Math.sqrt( _exp * (1 - _x_per_list[_x_var_name]) * (1 - _y_per_list[_y_var_name]) );
            //console.log([_residual, _exp, _x_per_list[_x_var_name], _y_per_list[_y_var_name]]);
            _tbody.find('tr.adj-residual-tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').html(precision_string(_adj_residual, 1));
            
            if (Math.abs(_adj_residual) > 1.96) {
                _tbody.find('tr[y_var="' + _y_var_name + '"] td[x_var="' + _x_var_name + '"]').addClass("sig");
            }
            
            _chi_squared += (_std_residual * _std_residual);
            _yates_chi_squared += ( Math.pow((Math.abs(_num - _exp) - 0.5), 2) / _exp );
        }
    }
    
    // ------------------------
    
    var _panel = $(".file-process-framework");
    var _result = _panel.find("#preview_html");
    //console.log(_chi_squared);
    var _chi_squared_container = $('<ul class="chi-squared-container"></ul>').appendTo(_result);
    if ($("#input_table_style_display:checked").length === 0) {
        _chi_squared_container.addClass("analyze-result");
    }
    
    //console.log([_x_var_count, _y_var_count]);
    var _fisher_mode = false;
    if ($("#input_enable_fisher:checked").length === 1 
            && _is_cell_exp_too_small === true
            && _is_sum_too_small === true
            && _x_vars_count === 2
            && _y_vars_count === 2) {
        _fisher_mode = true;
    }
    if (_DEBUG.force_fisher === true) {
        _fisher_mode = true;
    }
    
    if (_fisher_mode) {
        var _p;
        if (_is_zero_cell_existed === false) {
            _p = _calc_fisher_exact_test();
        }
        else {
            //console.log(1);
            _p = _calc_fisher_exact_test_with_zero();
        }
        if (Math.abs(_p) < 0.05) {
            _chi_squared_container.append('<li>Fisher x2: ' + precision_string(_p, 10) + '，顯著</li>');
        }
        else {
            _chi_squared_container.append('<li>Fisher x2: ' + precision_string(_p, 10) + '，不顯著</li>');
        }
    }
    else if ($("#input_enable_yates:checked").length === 1 
            && _is_cell_exp_too_small === true
            && _total_sum >= 20
            && _x_vars_count === 2
            && _y_vars_count === 2) {
        if (Math.abs(_yates_chi_squared) > 1.96) {
            _chi_squared_container.append('<li>Yates x2: ' + precision_string(_yates_chi_squared, 3) + '，顯著</li>');
        }
        else {
            _chi_squared_container.append('<li>Yates x2: ' + precision_string(_yates_chi_squared, 3) + '，不顯著</li>');
        }
    }
    else {
        if (Math.abs(_chi_squared) > 1.96) {
            _chi_squared_container.append('<li>x2: ' + precision_string(_chi_squared, 3) + '，顯著</li>');
        }
        else {
            _chi_squared_container.append('<li>x2: ' + precision_string(_chi_squared, 3) + '，不顯著</li>');
        }
    }
    
    var _cramer_v = Math.sqrt(_chi_squared / (_total_sum * (_cramer_v_k - 1)) );
    _chi_squared_container.append('<li>Cramer\'s V coefficient: ' + precision_string(_cramer_v, 3) + '</li>');
    
    // ---------------------------
    // x tau
    
    _chi_squared_container.append('<li>X->Y tau: ' + precision_string(_calc_x2y_tau(), 3) + '</li>');
    
    // ---------------------------
    // y tau
    
    _chi_squared_container.append('<li>Y->X tau: ' + precision_string(_calc_y2x_tau(), 3) + '</li>');
};

var _calc_fisher_exact_test = function () {
    var _p = 0;
    
    var _ext_ary = [];
    
    // 先找出最小的那個值
    var _min; 
    var _max;
    var _min_pos = 0;
    var _i = 0;
    var _origin_first;
    
    _traverse_ct_json(function (_x, _y, _num) {
        if (_i === 0) {
            _origin_first = _num;
        }
        
        if (_min === undefined) {
            _min = _num;
        }
        else if (_num < _min) {
            _min = _num;
            _min_pos = _i;
        }
        
        if (_max === undefined) {
            _max = _num;
        }
        else if (_num > _max) {
            _max = _num;
        }
        
        _ext_ary.push(_num);
        _i++;
    });
    
    var _adj_pos = _min + 1;
    if (_min_pos % 2 === 1) {
        _adj_pos = _min - 1;
    }
    
    // ---------------------
    
    // 調整成極端值
    for (var _i = 0; _i < _ext_ary.length; _i++) {
        if (_min_pos === 1 || _min_pos === 2) {
            if (_i === 0 || _i === 3 ) {
                _ext_ary[_i] = _ext_ary[_i]+_min;
            }
            else {
                _ext_ary[_i] = _ext_ary[_i]-_min;
            }
        }
        else {
            if (_i === 0 || _i === 3 ) {
                _ext_ary[_i] = _ext_ary[_i]-_min;
            }
            else {
                _ext_ary[_i] = _ext_ary[_i]+_min;
            }
        }
    }
    
    //console.log(_ext_ary);
    
    // ---------------------
    // p1跟p2都是固定的，先算p1跟p2
    
    var _p1 = 1;
    for (var _x in _x_sum_list) {
        var _sum = _x_sum_list[_x];
        _p1 = _p1 * _calc_factorial(_sum);
    }
    for (var _y in _y_sum_list) {
        var _sum = _y_sum_list[_y];
        _p1 = _p1 * _calc_factorial(_sum);
    }
    
    var _p2 = _calc_factorial(_total_sum);
    
    var _calc_p3 = function (_ary) {
        var _p = 1;
        for (var _i = 0; _i < _ary.length; _i++) {
            _p = _p * _calc_factorial(_ary[_i]);
        }
        return _p;
    };
    
    // --------------------------------
    var _p4;
    var _original_p4;
    var _p4_list = [];
    
    for (var _i = 0; _i < _max+1; _i++) {
        var _ext_ary2 = [];
        var _has_zero = false;
        var _over_original_flag = false;
        for (var _e = 0; _e < _ext_ary.length; _e++) {
            var _n;
            if (_e === 0 || _e === 3) {
                if (_min_pos === 1 || _min_pos === 2) {
                    _n = _ext_ary[_e]-_i;
                }
                else {
                    _n = _ext_ary[_e]+_i;
                }
                _ext_ary2.push(_n);
            }
            else {
                if (_min_pos === 1 || _min_pos === 2) {
                    _n = _ext_ary[_e]+_i;
                }
                else {
                    _n = _ext_ary[_e]-_i;
                }
                _ext_ary2.push(_n);
            }

            if (_i > 0 && _n === 0) {
                _has_zero = true;
            }

            if (_e === 0 && _n === _origin_first) {
                _over_original_flag = true;
            }
        }

        _p4 = (_p1 / (_p2 * _calc_p3(_ext_ary2)) );
        if (_over_original_flag === true) {
            _original_p4 = _p4;
        }

        //console.log(_ext_ary2);
        //console.log((_p1 / (_p2 * _calc_p3(_ext_ary2)) ));


        //if (_over_original === false) {
            //console.log(['p4', _p4]);
        //    _p += _p4;
        //}
        _p4_list.push(_p4);

        //if (_over_original_flag === true) {
        //    _over_original = true;
        //}
        
        if (_has_zero === true) {
            //console.log(['last p4', _last_p4]);
            //console.log(['p4', _p4]);
            //_p += _p4 + _last_p4;
            break;
        }
        //_last_p4 = _p4;
    }
    
    for (var _i = 0; _i < _p4_list.length; _i++) {
        if (_p4_list[_i] <= _original_p4) {
            _p += _p4_list[_i];
        }
    }
    
    return _p;
};

var _calc_fisher_exact_test_with_zero = function () {
    
    var _p1 = 1;
    for (var _x in _x_sum_list) {
        var _sum = _x_sum_list[_x];
        _p1 = _p1 * _calc_factorial(_sum);
    }
    for (var _y in _y_sum_list) {
        var _sum = _y_sum_list[_y];
        _p1 = _p1 * _calc_factorial(_sum);
    }

    var _i = 0;
    var _tmp_num;
    var _p2 = _calc_factorial(_total_sum);
    
    _traverse_ct_json(function (_x, _y, _num) {
        _p2 = _p2 * _calc_factorial(_num);
    });

    var _p = _p1 / _p2;
    return _p;
};

var _calc_x2y_tau = function () {
    var _n = _total_sum;
    
    var _e1 = 0;
    for (var _y_var_name in _y_sum_list) {
        var _f = _y_sum_list[_y_var_name];
        
        _e1 += (( _f * (_n - _f) ) / _n);
    }
    
    var _e2 = 0;
    for (var _x_var_name in _ct_json) {
        var _e = 0;
        var _sum = _x_sum_list[_x_var_name];
        for (var _y_var_name in _ct_json[_x_var_name]) {
            var _f = _ct_json[_x_var_name][_y_var_name];
            
            _e += (_f * (_sum - _f) );
        }
        _e2 += (_e / _sum);
    }
    
    var _tau = 1 - (_e2 / _e1);
    //console.log([_tau, _e2, _e1]);
    //_tau = _tau * 100;
    return _tau;
};

var _calc_y2x_tau = function () {
    var _n = _total_sum;
    var _e1 = 0;
    for (var _x_var_name in _x_sum_list) {
        var _f = _x_sum_list[_x_var_name];
        
        _e1 += (( _f * (_n - _f) ) / _n);
    }
    
    var _e2 = 0;
    var _e_y = {};
    for (var _x_var_name in _ct_json) {
        for (var _y_var_name in _ct_json[_x_var_name]) {
            
            var _sum = _y_sum_list[_y_var_name];
            var _f = _ct_json[_x_var_name][_y_var_name];
            
            if (typeof(_e_y[_y_var_name]) === "undefined") {
                _e_y[_y_var_name] = 0;
            }
            _e_y[_y_var_name] += (_f * (_sum - _f) );
        }
        //_e2 += (_e / _sum);
    }
    
    for (var _y_var_name in _e_y) {
        _e2 += (_e_y[_y_var_name] / _y_sum_list[_y_var_name] );
    }
    
    var _tau = 1 - (_e2 / _e1);
    return _tau;
};

var _calc_factorial = function (num) {
    //num = Math.ceil(num);
    if (num < 0) {
        throw "Error num: " + num;
    }
    
    if (num === 0) { 
        return 1; 
    }
    else { 
        return num * _calc_factorial( num - 1 ); 
    }
};

//console.log(_calc_factorial(24));

var _traverse_ct_json = function (_callback) {
    for (var _x_var_name in _ct_json) {
        for (var _y_var_name in _ct_json[_x_var_name]) {
            _callback(_x_var_name, _y_var_name, _ct_json[_x_var_name][_y_var_name]);
        }
    }
};
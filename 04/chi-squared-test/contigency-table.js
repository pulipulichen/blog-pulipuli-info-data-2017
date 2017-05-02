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

var _draw_result_table = function () {
    _reset_result();
    
    var _panel = $(".file-process-framework");
    var _result = _panel.find("#preview_html");
    
    var _table = $('<div><table><thead></thead><tbody></tbody></table></div>');
    _table.appendTo(_result);
};
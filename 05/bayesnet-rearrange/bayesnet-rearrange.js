var _parse_bif_xml = function (_xml) {
    var _result = _xml;
    
    // 先取出頭尾吧
    var _head_needle = '<VARIABLE TYPE="nature">';
    var _head_pos = _xml.indexOf(_head_needle);
    var _xml_head = _xml.substr(0, _head_pos);
    
    var _foot_needle = '<DEFINITION>';
    var _foot_pos = _xml.indexOf(_foot_needle);
    var _xml_foot = _xml.substring(_foot_pos, _xml.length);
    
    // ---------------------------------
    var _xml_body = _xml.substring(_head_pos, _foot_pos);
    
    var _var_xml_list = _xml_body.split('</VARIABLE>');
    var _pos_config = [];
    var _col_count = 0;
    var _last_x_pos;
    for (var _i = 0; _i < _var_xml_list.length; _i++) {
        var _x = _var_xml_list[_i];
        
        _head_needle = "<NAME>";
        _foot_needle = "</NAME>";
        var _name = _x.substring(_x.lastIndexOf(_head_needle) + _head_needle.length, _x.lastIndexOf(_foot_needle));
        if (_name.trim() === "") {
            continue;
        }
        
        // 取得pos資料
        _head_needle = "<PROPERTY>position = (";
        _foot_needle = ")</PROPERTY>";
        var _pos = _x.substring(_x.lastIndexOf(_head_needle) + _head_needle.length, _x.lastIndexOf(_foot_needle)).split(",");
        
        var _x_pos = eval(_pos[0]);
        var _y_pos = eval(_pos[1]);
        
        if (_last_x_pos === undefined) {
            _last_x_pos = _x_pos;
        }
        if (_x_pos > _last_x_pos) {
            _col_count++;
        }
        else {
            _col_count = 0;
        }
        
        //_x_pos += _col_count * 100;
        //_y_pos += (_i*50);
         
        _pos_config.push([_name, _x_pos, _y_pos ]);
        
        var _replace = "{{POSITION}}";
        //var _replace = _x_pos + "," + _y_pos;
        _x = _x.substr(0, _x.lastIndexOf(_head_needle)) + _head_needle + _replace  + _foot_needle + '\n</VARIABLE>\n';
        _var_xml_list[_i] = _x;
    }
    
    // ---------------------------------
    // 來分level
    //console.log(_pos_config);
    
    var _y_level = [];
    var _x_level = {};
    for (var _i = 0; _i < _pos_config.length; _i++) {
        var _y = _pos_config[_i][2];
        if ($.inArray(_y, _y_level) === -1) {
            _y_level.push(_y);
        }
        
        var _x = _pos_config[_i][1];
        if (typeof(_x_level[_y]) === "undefined") {
            _x_level[_y] = [];
        }
        if ($.inArray(_x, _x_level[_y]) === -1) {
            _x_level[_y].push(_x);
            _x_level[_y].sort(function (_a, _b) {
                return _a - _b;
            });
        }
    }
    
    _y_level.sort(function (_a, _b) {
        return _a - _b;
    });
    //console.log(_y_level);
    //console.log(_x_level);
    
    var _margin = 10;
    for (var _i = 0; _i < _pos_config.length; _i++) {
        var _y = _pos_config[_i][2];
        var _lv = $.inArray(_y, _y_level);
        var _new_x = _margin + _lv * 300;
        
        var _x = _pos_config[_i][1];
        var _x_lv = $.inArray(_x, _x_level[_y]);
        var _new_y = _margin + _x_lv * 100;
        
        console.log([_new_x,_new_y]);
        _var_xml_list[_i] = _var_xml_list[_i].replace("{{POSITION}}", _new_x+","+_new_y);
    }
    
    
    // -----------------------------
    
    _xml_body = _var_xml_list.join("");
    
    //console.log(_var_xml_list);
    
    
    
    //----------------------------------
    _result = _xml_head + _xml_body + _xml_foot;
    //_result = _xml_body;
    
    return _result;
};
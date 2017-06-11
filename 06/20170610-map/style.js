var _main = function () {
    $.get("desc.txt", function (_desc) {
        var _desc_lines = _process_desc(_desc);

        $.get("dict.csv", function (_dict) {
            var _dict = _process_dict(_dict);
            _recode_desc(_desc_lines, _dict);
        });
    });    
};

var _process_desc = function (_desc) {
    var _lines = _desc.trim().split("\n");
    return _lines;
};

var _dict_types = [];

var _process_dict = function (_dict) {
    var _lines = _dict.trim().split("\n");
    var _d = {};
    for (var _l = 0; _l < _lines.length; _l++) {
        var _fields = _lines[_l].trim().split(",");
        var _type = _fields[1].trim().split(";");
        _d[_fields[0]] = _type;
        
        for (var _t = 0; _t < _type.length; _t++) {
            if (_type[_t].trim() === "") {
                continue;
            }
            
            if ($.inArray(_type[_t], _dict_types) === -1) {
                _dict_types.push(_type[_t]);
            }
        }
    }
    _dict_types.sort();
    return _d;
};

var _recode_desc = function (_desc_lines, _dict) {
    var _results = [];
    for (var _l = 1; _l < _desc_lines.length; _l++) {
        var _d = _desc_lines[_l];
        var _types_match = _create_null_types();
        for (var _key in _dict) {
            if (_d.indexOf(_key) > -1) {
                var _type = _dict[_key];
                for (var _t = 0; _t < _type.length; _t++) {
                    if (_type[_t].trim() === "") {
                        continue;
                    }
                    _types_match[_type[_t]] = 1;
                }
            }
        }
        var _line = [];
        for (var _t in _types_match) {
            _line.push(_types_match[_t]);
        }
        _results.push(_line.join(","));
    }
    var _result = _results.join("<br />\n");
    _result = _dict_types.join(",") + "<br />\n" + _result;
    _finish(_result);
};

var _create_null_types = function () {
    var _types_match = {};
    for (var _d = 0; _d < _dict_types.length; _d++) {
        _types_match[_dict_types[_d]] = 0;
    }
    return _types_match;
};

var _finish = function (_result) {
    //console.log(_result);
    $("body").html(_result);
};

_main();
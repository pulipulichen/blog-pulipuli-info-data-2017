$(function () {
    $('.contingency-table-row-plus button.download-dynamic-classification-button').click(function () {
        _download_dynamic_classification_file();
    });
    $('.contingency-table-row-plus button.download-bayes-net-xml-button').click(function () {
        _download_bayes_net_xml_file();
    });
});

var _download_dynamic_classification_file = function () {
    
    // 要先取得csv的資料
    var _csv = $("#input_data").val();
    var _lines = _csv.trim().split("\n");
    
    var _users_seq = {};
    
    for (var _l = 1; _l < _lines.length; _l++) {
        var _fields = _lines[_l].trim().split(",");
        
        var _user = _fields[0].trim();
        var _seq_id = eval(_fields[1].trim());
        var _events = _fields[2].trim().split(";");
        for (var _e = 0; _e < _events.length; _e++) {
            _events[_e] = _events[_e].trim();
        }
        
        if (typeof(_users_seq[_user]) === "undefined") {
            _users_seq[_user] = [];
        }
        _users_seq[_user].push([_seq_id, _events]);
    }
    
    var _lags = $("#input_dynamic_lag").val();
    _lags = eval(_lags);
    
    // ----------------------------
    
    var _get_lags = function (_ary, _seq, _i, _lags) {
        if (_i === 0 || _lags === 0) {
            return _ary;
        }
        // 先取得上一個事件
        var _last_events = _seq[(_i-1)][1];
        //console.log(_last_events);
        
        var _result = [];
        for (var _e0 = 0; _e0 < _last_events.length; _e0++) {
            var _e0_name = _last_events[_e0];
            //console.log(["e0", _e0_name]);
            for (var _e1 = 0; _e1 < _ary.length; _e1++) {
                var _line = [];
                var _a = _ary[_e1];
                for (var _e3 = 0; _e3 < _a.length; _e3++) {
                    _line.push(_a[_e3]);
                }
                _line.push(_e0_name);
                //var _a = _ary[_e1].push(_e0_name);
                //console.log(_line);
                _result.push(_line);
            }
        }
        //console.log("result");
        //console.log(_result);
        _i--;
        _lags--;
        return _get_lags(_result, _seq, _i, _lags);
    };
    
    _lines = [];
    for (var _u in _users_seq) {
        var _seq = _users_seq[_u];
        
        _seq.sort(function(_a,_b) {
           return _a[0] - _b[0]; 
        });
        
        for (var _s = 1; _s < _seq.length; _s++) {
            var _events = _seq[_s][1];
            
            for (_e = 0; _e < _events.length; _e++) {
                var _event_name = _events[_e];
                var _seqs = _get_lags([[_event_name]], _seq, _s, _lags);
                //console.log(_event_name);
                
                
                //return;
                for (var _i = 0; _i < _seqs.length; _i++) {
                    var _lag_seq = _seqs[_i];
                    // 補?
                    while (_lag_seq.length < _lags+1) {
                        _lag_seq.push("?");
                    } 
                    _lines.push(_lag_seq.reverse().join(","));
                }
            }
        }
        
        //if (_u === "2") {
        //    console.log(_seq);
        //}
        //console.log("下一人");
    }
    
    
    // ----------------------------------------------
    var _headers = [];
    // 2
    for (var _i = 0; _i < _lags; _i++) {
        _headers.push("lag" + (_lags-_i));
    }
    _headers.push("class");
    var _result = _headers.join(",") + "\n" + _lines.join("\n");
    //console.log(_result);
    _download_file(_result, "lag-events-" + _create_current_date_string() + ".csv", "text/csv");
};

// ----------------------------------

var _download_bayes_net_xml_file = function () {
    var _lags = $("#input_dynamic_lag").val();
    _lags = eval(_lags);
    
    var _name = "bayes-net-config-" + _create_current_date_string() + ".xml";
    
    var _var_list = [];
    for (var _i = 0; _i < _lags; _i++) {
        _var_list.push("lag" + (_lags-_i));
    }
    _var_list.push('class');
    
    var _variables = "";
    var _var_head = '<VARIABLE TYPE="nature"><NAME>';
    //var _var_foot = '</NAME></VARIABLE>';
    for (var _i = 0; _i < _var_list.length; _i++) {
        var _v = _var_head 
                + _var_list[_i] 
                + '</NAME>'
                + '<PROPERTY>position = (10, ' + ((_i*100) + 10) + ')</PROPERTY>'
                + '</VARIABLE>';
        _variables += _v;
    }
    
    
    
    var _definition = "";
    var _reverse = false;
    for (var _i = 0; _i < _var_list.length; _i++) {
        var _d = '<DEFINITION><FOR>' + _var_list[_i] + '</FOR>';
        if (_reverse === false) {
            if (_i > 0) {
                _d += '<GIVEN>' + _var_list[(_i-1)] + '</GIVEN>';
            }
        }
        else {
            if (_i < _var_list.length-1) {
                _d += '<GIVEN>' + _var_list[(_i+1)] + '</GIVEN>';
            }
        }
        _d += '<TABLE></TABLE></DEFINITION>';
        _definition += _d;
    }
    
    
    $.get("bayes-net-template.txt", function (_xml) {
        _xml = _xml.replace("{{NAME}}", _name);
        _xml = _xml.replace("{{VARIABLE}}", _variables);
        _xml = _xml.replace("{{DEFINITION}}", _definition);
        //console.log(_xml);
        
        _download_file(_xml, _name, "text/xml");
    });
};
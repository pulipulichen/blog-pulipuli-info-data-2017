$(function () {
    $('.contingency-table-row-plus button.dynamic-classification-button').click(function () {
        _download_dynamic_classification_file();
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
    _download_file(_result, "lag-events.csv", "text/csv");
};
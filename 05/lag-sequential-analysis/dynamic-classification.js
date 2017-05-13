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
    
    
    // --------------------------------------
    var _lines = [];
    
    for (var _e0 in _ct_json) {
        for (var _e1 in _ct_json[_e0]) {
            var _count = _ct_json[_e0][_e1];
            for (var _i = 0; _i < _count; _i++) {
                _lines.push([_e0, _e1].join(","));
            }
        }
    }
    
    var _csv = "event,class" + "\n" + _lines.join("\n");
    //console.log(_csv);
    _download_file(_csv, "events.csv", "text/csv");
};

var _combine_input = function () {
    // 開頭設定
    _reset_result();
    var _result = "";
    var _panel = $(".file-process-framework");

    // ------------------------------------------
    // 資料處理設定
    
    
    _result = _calc_pearson_correlation();
    


    // ------------------------------------------
    // 結束設定

    var _input = _panel.find("#preview");
    _input.val(_result);

    _panel.find("#preview_html").html(_result);
};	// var _combine_input = function () {

var _calc_pearson_correlation = function () {
    var _result = "";
    var _panel = $(".file-process-framework");
    
    var _csv_lines = _panel.find("#input_data").val().trim().split("\n");
    
    if (_csv_lines.length === 0) {
        return "";
    }
    
    var _data = {};
    var _pair_number;
    var _attr_list = [];
    
    // ----------------------------
    
    for (var _i = 0; _i < _csv_lines.length; _i++) {
        var _line = _csv_lines[_i].split(",");
        if (_pair_number === undefined) {
            _pair_number = _line.length;
        }
        else if (_pair_number !== _line.length) {
            return "";
        }
        
        for (var _j = 0; _j < _line.length; _j++) {
            var _value = _line[_j];
            
            if (_i === 0) {
                _data[_value] = [];
                _attr_list[_j] = _value;
            }
            else {
                _value = eval(_value);
                _data[(_attr_list[_j])].push(_value);
            }
        }
    }
    
    // console.log(_data);
    
    // ------------------------
    // 先畫表格吧...
    var _result_data = {};
    for (var _i = 0; _i < _attr_list.length; _i++) {
        var _x_attr = _attr_list[_i];
        var _ary1 = _data[_x_attr];
        for (var _j = 0; _i !== _attr_list.length -1 && _j < _i; _j++) {
            if (typeof(_result_data[_x_attr]) === "undefined") {
                _result_data[_x_attr] = {};
            }
            var _y_attr = _attr_list[_j];
            if (_j !== _i) {
                _result_data[_x_attr][_y_attr] = null;
            }
        }
        
        for (var _j = _i+1; _j < _attr_list.length; _j++) {
            if (typeof(_result_data[_x_attr]) === "undefined") {
                _result_data[_x_attr] = {};
            }
            
            var _y_attr = _attr_list[_j];
            var _ary2 = _data[_y_attr];
            _result_data[_x_attr][_y_attr] = _get_pearson_correlation(_ary1, _ary2);
        }
    }
    
    //console.log(_result_data);
    // -----------------------------------
    
    var _precision = $("#input_precise").val();
    _precision = eval(_precision);
    
    
    var _display_detail = ($("#input_display_detail:checked").length === 1);
    var _colspan = 2;
    if (_display_detail === false) {
        _colspan = 1;
    }
    
    var _table = $('<div class="analyze-result"><table border="1"><tbody><tr class="x-attr"><td colspan="' + _colspan + '"></td></tr></tbody></table></div>')
    var _tr_x_attr = _table.find("tr.x-attr");
    
    var _tbody = _table.find("tbody");
    var _sign = {
        "*": false,
        "**": false,
        "***": false
    };
    
    for (var _x_attr in _result_data) {
        
        if (_tr_x_attr.find('th[data-attr="' + _x_attr + '"]').length === 0) {
            _tr_x_attr.append('<th data-attr="' + _x_attr + '">' + _x_attr + '</th>');
        }
        //console.log(['x', _x_attr]);
        
        for (var _y_attr in _result_data[_x_attr]) {
            
            var _d = _result_data[_x_attr][_y_attr];
            var _tr_y_attr = _tbody.find('tr[data-attr="' + _y_attr + '"]');
            if (_tr_y_attr.length === 0) {
                if (_d !== null) {
                    _tr_y_attr = $('<tr class="row" data-attr="' + _y_attr + '"></tr>');
                    _tbody.append(_tr_y_attr);
                }

                _tr_y_attr.append('<th>' + _y_attr + '</th>');
                
                if (_display_detail === true) {
                    _tr_y_attr.append('<td>Pearson相關<br />顯著性(雙尾)<br />個數</td>');
                }
            }
            
            //console.log(['y', _y_attr, _d]);
            
            var _td = $('<td></td>').appendTo(_tr_y_attr);
            if (_d !== null) {
                var _text = [];
                var _r =  precision_string(_d.r, _precision);
                if (_d.p < 0.001) {
                    _r = _r + '***';
                    _sign["***"] = true;
                }
                else if (_d.p < 0.01) {
                    _r = _r + '**';
                    _sign["**"] = true;
                }
                else if (_d.p < 0.05) {
                    _r = _r + '*';
                    _sign["*"] = true;
                }
                _text.push(_r);
                if (_display_detail === true) {
                    var _p =  precision_string(_d.p, _precision);
                    //var _p = _d.p;
                    _text.push(_p);
                    var _n =  _d.n;
                    _text.push(_n);
                }
                _td.html(_text.join('<br />'));
            }
        }
    }
    
    // -------------------------------------------------
    
    var _tr_td = 0;
    var _rows = _table.find("tr.row");
    for (var _i = 0; _i < _rows.length; _i++) {
        var _len = _rows.eq(_i).find("td").length;
        if (_len > _tr_td) {
            _tr_td = _len;
        }
    }
    
    for (var _i = 0; _i < _rows.length; _i++) {
        while (_rows.eq(_i).find("td").length < _tr_td) {
            _rows.eq(_i).append('<td></td>');
        }
    }
    
    // -------------------------------------------------
    
    var _div = $('<div></div>').append(_table);
    
    for (var _i in _sign) {
        if (_sign[_i] === true) {
            var _s = 0.05;
            if (_i === "**") {
                _s = 0.01;
            }
            else if (_i === "***") {
                _s = 0.001;
            }
            _div.append('<div>' + _i + ': 在顯著水準為' + _s + '時(雙尾)，相關顯著。</div>');
        }
    }
    
    return _div.html();
};

var _get_pearson_correlation = function (_ary1, _ary2) {
    
    var _r = pearsonCorrelation(_ary1, _ary2);
    var _n = _ary1.length;
    
    var _t = _r * Math.sqrt( (_n-2) / (1-(_r*_r)) );
    _t = Math.abs(_t);
    var _p = ((tprob((_n-2), _t))*2);
    //console.log(_p);
    if (_p === 2) {
        _p = 0;
    }
    
    return {
        r: _r,
        p: _p,
        n: _n
    };
};

// -----------------------------------------------------

tinyMCE.init({
	mode : "specific_textareas",
	editor_selector : "mceEditor",
	plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
  ],
  toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image  tableprops',
  toolbar2: 'print preview media | forecolor backcolor emoticons | codesample code ',

	setup:function(ed) {
	   ed.on('change', function(e) {
		   //console.log('the content ', ed.getContent());
		   _combine_input();
	   });
    }
});


var _reset_result = function () {
    
    var _panel = $(".file-process-framework");
    var _input = _panel.find("#preview");
    _input.val("");

    _panel.find("#preview_html").html("");
};

// --------------------------

var _process_file = function(_input, _callback) {
    _callback(_input);        
};

var _output_filename_surffix="_output";

// -------------------------------------

var _load_file = function(evt) {
    //console.log(1);
    if(!window.FileReader) return; // Browser is not compatible

    var _file_input = this;
    var _selector = $(this).data("file-to-textarea");
    _selector = $(_selector);
    
    if (_selector.length === 0) {
        return;
    }
    //console.log(_selector);
    //return;
    
    var reader = new FileReader();
    var _result;

    var _file_name = evt.target.files[0].name;
    
    reader.onload = function(evt) {
        if(evt.target.readyState !== 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        //filecontent = evt.target.result;

        //document.forms['myform'].elements['text'].value = evt.target.result;
        _result =  evt.target.result;

        _process_file(_result, function (_result) {
            _selector.val(_result);
            _selector.change();
            $(_file_input).val("");
        });
    };

//    var _pos = _file_name.lastIndexOf(".");
//    _file_name = _file_name.substr(0, _pos)
//        + _output_filename_surffix
//        + _file_name.substring(_pos, _file_name.length);

    //console.log(_file_name);

    reader.readAsText(evt.target.files[0]);
};

var _load_textarea = function(evt) {
    var _panel = $(".file-process-framework");
    
    // --------------------------

    var _result = _panel.find(".input-mode.textarea").val();
    if (_result.trim() === "") {
        return;
    }

    // ---------------------------
    
    _panel.find(".loading").removeClass("hide");

    // ---------------------------
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  
    var local = new Date(utc);
    var _file_name = local.toJSON().slice(0,19).replace(/:/g, "-");
    _file_name = "output_" + _file_name + ".txt";

    // ---------------------------

    _process_file(_result, function (_result) {
        _panel.find(".preview").val(_result);
        _panel.find(".filename").val(_file_name);

        _panel.find(".loading").addClass("hide");
        _panel.find(".display-result").show();
        _panel.find(".display-result .encoding").hide();

        var _auto_download = (_panel.find('[name="autodownload"]:checked').length === 1);
        if (_auto_download === true) {
            _panel.find(".download-file").click();
        }
    });
};

var _download_file_button = function () {
    var _panel = $(".file-process-framework");
    
    var _file_name = _panel.find(".filename").val();
    var _data = _panel.find(".preview").val();
    
    _download_file(_data, _file_name, "txt");
};


var _download_file = function (data, filename, type) {
    var a = document.createElement("a"),
        file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }

};

var pearsonCorrelation = function (_ary1, _ary2) {
    var _avg1 = _calc_avg(_ary1);
    var _avg2 = _calc_avg(_ary2);
    
    //console.log([_avg1, _avg2]);
    
    var _a = 0;
    var _b1 = 0;
    var _b2 = 0;
    for (var _i = 0; _i < _ary1.length; _i++) {
        var _x = (_ary1[_i]-_avg1);
        var _y = (_ary2[_i]-_avg2);
        _a += _x*_y;
        _b1 += _x*_x;
        _b2 += _y*_y;
    }
    
    if (_b1*_b2 === 0) {
        return 0;
    }
    return _a / (Math.sqrt(_b1) * Math.sqrt(_b2));
};

var _calc_avg = function (_ary) {
    if (_ary.length === 0) {
        return;
    }
    var _sum = 0;
    for (var _i = 0; _i < _ary.length; _i++) {
        _sum += _ary[_i];
    }
    return _sum / _ary.length;
};

/**
 * https://gist.github.com/ronaldsmartin/47f5239ab1834c47088e
 * @returns {undefined}
 */
/*
var _load_google_spreadsheet = function () {
    var _url = this.value.trim();
    
    if (_url.indexOf('https://docs.google.com/spreadsheets/d/') !== 0
            || _url.indexOf('/edit?usp=sharing') === -1) {
        return;
    }
    
    var _id = _url.substring(('https://docs.google.com/spreadsheets/d/').length, _url.length - ('/edit?usp=sharing').length);
    
    var _input = this;
    var _selector = $(_input).data("file-to-textarea");
    _selector = $(_selector);
    
    var _sheet = $(_input).data("sheet-selector");
    _sheet = $(_sheet).val().trim();
    
    if (_sheet === "") {
        return;
    }
    
    //var _json_url = 'https://spreadsheets.google.com/feeds/list/' + _id + '/od6/public/values?alt=json-in-script&callback=?';
    var _json_url = "https://script.google.com/macros/s/AKfycbzGvKKUIaqsMuCj7-A2YRhR-f7GZjl4kSxSN1YyLkS01_CfiyE/exec?id=" + _id + '&sheet=' + _sheet + '&callback=?';
    //console.log(_json_url);
    $.getJSON(_json_url, function (_data) {
        _data = _data["records"];
        var _text = [];
        var _attr_list = [];
        
        //console.log(_data);
        for (var _i = 0; _i < _data.length; _i++) {
            var _line = [];
            for (var _attr in _data[_i]) {
                if (_i === 0) {
                    _attr_list.push(_attr);
                }
                
                var _value = _data[_i][_attr];
                //console.log(_value);
                _line.push(_value);
            }
            _text.push(_line.join(','));
        }
        
        _text = _attr_list.join(",") + "\n" + _text.join("\n");
        //console.log(_text);
        
        // ----------------------------
        
        _selector.val(_text).change();
        
        //console.log(_data);
    });
    
    // https://script.google.com/macros/s/AKfycbzGvKKUIaqsMuCj7-A2YRhR-f7GZjl4kSxSN1YyLkS01_CfiyE/exec
    
    //console.log(_id);
};
*/
var _load_google_spreadsheet = function () {
    var _url = this.value.trim();
    
    if (_url.indexOf('https://docs.google.com/spreadsheets/d/') !== 0
            || _url.indexOf('/pubhtml') === -1) {
        return;
    }
    
    // https://docs.google.com/spreadsheets/d/1KL07qS2txPpnZSvLt0gBWJ2_lGsVTr51s5JkE4bg2tY/pubhtml?gid=539063364&single=true
    
    // https://docs.google.com/spreadsheets/d/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/pubhtml
    // https://docs.google.com/spreadsheets/d/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/pubhtml
    // https://docs.google.com/spreadsheets/d/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/pubhtml?gid=1213777536&single=true
    // 
    // https://docs.google.com/spreadsheets/d/0AtMEoZDi5-pedElCS1lrVnp0Yk1vbFdPaUlOc3F3a2c/pubhtml
    // 
    // https://spreadsheets.google.com/feeds/list/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/data/public/values?alt=json-in-script&gid=1213777536&callback=a&
    
    // https://spreadsheets.google.com/feeds/list/0AtMEoZDi5-pedElCS1lrVnp0Yk1vbFdPaUlOc3F3a2c/od6/public/values?alt=json-in-script&callback=a
    
    // https://spreadsheets.google.com/feeds/list/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/od6/public/values?alt=json&gid=1213777536&callback=a
    
    
    // https://docs.google.com/spreadsheets/d/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/pub?gid=1213777536&single=true&output=csv
    // https://spreadsheets.google.com/feeds/list/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/1/public/values?alt=json&gid=1213777536&callback=a
    
    // https://docs.google.com/spreadsheets/d/1zwOPqpkcX2YRDEXLQEd2eM8OVz24FEXT5WT5eFP6ZsA/pubhtml
    
    var _id = _url.substring(('https://docs.google.com/spreadsheets/d/').length, _url.length - ('/pubhtml').length);
    console.log(_id);
    
    var _input = this;
    var _selector = $(_input).data("file-to-textarea");
    _selector = $(_selector);
    
    //var _json_url = 'https://spreadsheets.google.com/feeds/list/' + _id + '/od6/public/values?alt=json-in-script&callback=?';
    var _json_url = 'https://spreadsheets.google.com/feeds/list/' + _id + '/1/public/values?alt=json-in-script&gid=1213777536&callback=?';
    //console.log(_json_url);
    $.getJSON(_json_url, function (_data) {
        _data = _data.feed.entry;
        var _text = [];
        var _attr_list = [];
        
        //console.log(_data);
        for (var _i = 0; _i < _data.length; _i++) {
            var _line = _data[_i].content.$t.split(", ");
            for (var _j = 0; _j < _line.length; _j++) {
                var _t = _line[_j].split(": ");
                var _attr = _t[0];
                var _value = _t[1];
                
                if (_i === 0) {
                    _attr_list.push(_attr);
                }
                _line[_j] = _value;
            }
            _text.push(_line.join(','));
        }
        
        _text = _attr_list.join(",") + "\n" + _text.join("\n");
        console.log(_text);
        
        // ----------------------------
        
        _selector.val(_text).change();
        
        //console.log(_data);
    });
    
    // https://script.google.com/macros/s/AKfycbzGvKKUIaqsMuCj7-A2YRhR-f7GZjl4kSxSN1YyLkS01_CfiyE/exec
    
    //console.log(_id);
};

var _load_data = function (_selector, _file_path, _callback) {
    $.get(_file_path, function (_data) {
        $(_selector).val(_data);
        _callback();
    });
};

var _change_tirgger_input = function () {
    var _selector = $(this).data("trigger-selector");
    $(_selector).change();
};

$(function () {
    $('.menu .item').tab();
    var _panel = $(".file-process-framework");
    //_panel.find(".input-mode.textarea").click(_load_textarea).keyup(_load_textarea);
    
    _panel.find(".download-file").click(_download_file_button);
    _panel.find(".change-trigger").change(_combine_input);
    _panel.find(".key-up-trigger").keyup(_combine_input);

    _panel.find(".focus_select").focus(function () {
        $(this).select();
    });
    
    _panel.find(".file-change-trigger").change(_load_file);
    _panel.find(".google-spreadsheet-trigger")
            .change(_load_google_spreadsheet)
            //.change();
    _panel.find(".change-trigger-input").change(_change_tirgger_input);

    //$('.menu .item').tab();
    
    _load_data("#input_data", "data.csv", _combine_input);


    $('#copy_source_code').click(function () {
        PULI_UTIL.clipboard.copy($("#preview").val());
    });

    $('#copy_source_code_html').click(function () {
        PULI_UTIL.clipboard.copy($("#preview_html_source").val());
    });
});
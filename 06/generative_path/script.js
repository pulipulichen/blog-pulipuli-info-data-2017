var _process_file = function(_callback) {
    _loading_enable(function () {
    
        var _result = DGP.main();

        // --------------------------
        // 完成
        _loading_disable();
        if (typeof (_callback) === "function") {
            _callback(_result);
        }
    
    }); // _loading_enable(function () {
};

// ----------------------


var _



// ---------------------

var _loading_enable = function (_callback) {
    $("#preloader").show().fadeIn(_callback);
};

var _loading_disable = function () {
    $("#preloader").fadeOut().hide();
};

// ---------------------

// -------------------------------------

var _change_to_fixed = function () {
    var _to_fixed = $("#decimal_places").val();
    _to_fixed = parseInt(_to_fixed, 10);

    var _tds = $(".stat-result td[data-ori-value]");
    for (var _i = 0; _i < _tds.length; _i++) {
            var _td = _tds.eq(_i);
            var _value = _td.data("ori-value");
            _value = parseFloat(_value, 10);
            _value = DGP_STATISTICS.float_to_fixed(_value, _to_fixed);
            _td.text(_value);
    }
};

// -------------------------------------

var _output_filename_surffix="-result";
//var _output_filename_test_surffix="_test_set";
var _output_filename_ext=".csv";
var _output_filename_prefix="csv_result-";


// -------------------------------------

var _file_temp;

var _load_file = function(evt) {
    //console.log(1);
    if(!window.FileReader) return; // Browser is not compatible

    var _panel = $(".file-process-framework");
    
    _panel.find(".loading").removeClass("hide");

    var reader = new FileReader();
    var _result;

    var _original_file_name = evt.target.files[0].name;
    //var _pos = _original_file_name.lastIndexOf(".");
    //var _pos = _original_file_name.length;
    var _pos = _original_file_name.indexOf(".");
    //var _file_name = _original_file_name.substr(0, _pos)
    //    + _output_filename_surffix
    //    //+ _original_file_name.substring(_pos, _original_file_name.length);
    var _file_name = _output_filename_prefix + _original_file_name.substr(0, _pos);
    _file_name = _file_name + _output_filename_ext;
    
    _panel.find(".filename").val(_file_name);
    
    reader.onload = function(evt) {
        if(evt.target.readyState !== 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        //filecontent = evt.target.result;

        //document.forms['myform'].elements['text'].value = evt.target.result;
        _result =  evt.target.result;
        _file_temp = _result;
        _start_process_file();
    };
    
    
    var _start_process_file = function () {
        _process_file(_result, undefined, function (_result) {
            _panel.find(".preview").val(_result);
                        
            $(".file-process-framework .myfile").val("");
            $(".file-process-framework .loading").addClass("hide");
            _panel.find(".display-result").show();
            _panel.find(".display-result .encoding").show();

            var _auto_download = (_panel.find('[name="autodownload"]:checked').length === 1);
            if (_auto_download === true) {
                _panel.find(".download-file").click();
            }
            
            //_download_file(_result, _file_name, "txt");
        });
    };

    //console.log(_file_name);

    reader.readAsText(evt.target.files[0]);
};

var _load_file_buffer = function(evt) {
    //console.log(1);
    if(!window.FileReader) return; // Browser is not compatible

    var _panel = $(".file-process-framework");
    
    _panel.find(".loading").removeClass("hide");

    var reader = new FileReader();
    var _result_buffer;

    reader.onload = function(evt) {
        if(evt.target.readyState !== 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        //filecontent = evt.target.result;

        //document.forms['myform'].elements['text'].value = evt.target.result;
        _result_buffer =  evt.target.result;
        _result =  _file_temp;
        if (_result === undefined) {
            $(".file-process-framework .myfile_buffer").val("");
            alert("Test ARFF is not ready.");
            return;
        }
        _start_process_file();
    };
    
    
    var _start_process_file = function () {
        _process_file(_result, _result_buffer, function (_result) {
            _panel.find(".preview").val(_result);
                        
            $(".file-process-framework .myfile_buffer").val("");
            $(".file-process-framework .loading").addClass("hide");
            _panel.find(".display-result").show();
            _panel.find(".display-result .encoding").show();

            var _auto_download = (_panel.find('[name="autodownload"]:checked').length === 1);
            if (_auto_download === true) {
                _panel.find(".download-file").click();
            }
            
            //_download_file(_result, _file_name, "txt");
        });
    };

    //console.log(_file_name);

    reader.readAsText(evt.target.files[0]);
};


var _load_textarea = function(evt) {
    var _panel = $(".file-process-framework");
    
    // --------------------------

    var _result = _panel.find(".input-mode#input_mode_textarea").val();
    var _buffer = _panel.find(".input-mode#input_mode_textarea_buffer").val();
    if (_result.trim() === "") {
        return;
    }

    // ---------------------------
    
    _panel.find(".loading").removeClass("hide");

    // ---------------------------
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  
    var local = new Date(utc);
    //var _file_date = local.toJSON().slice(0,19).replace(/:/g, "-");
    var time = new Date();
    var _file_date = ("0" + time.getHours()).slice(-2)
            + ("0" + time.getMinutes()).slice(-2);
    var _file_name = "csv_result-" + _file_date + _output_filename_ext;
    var _test_file_name = "test_document_" + _file_date + _output_filename_ext;

    _panel.find(".filename").val(_file_name);
    _panel.find(".test_filename").val(_test_file_name);
    
    // ---------------------------

    _process_file(_result, _buffer, function (_result) {
        _panel.find(".preview").val(_result);

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
    
    _download_file(_data, _file_name, "arff");
};

var _download_test_file_button = function () {
    var _panel = $(".file-process-framework");
    
    var _file_name = _panel.find(".test_filename").val();
    var _data = _panel.find(".test_preview").val();
    
    _download_file(_data, _file_name, "arff");
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

// ----------------------------

var _copy_table = function () {
	var _button = $(this);
	
	var _table = $($(this).data("copy-table"));
	var _tr_coll = _table.find("tr");
	
	var _text = "";
	for (var _r = 0; _r < _tr_coll.length; _r++) {
		if (_r > 0) {
			_text = _text + "\n";
		}
		
		var _tr = _tr_coll.eq(_r);
		var _td_coll = _tr.find("td");
		if (_td_coll.length === 0) {
			_td_coll = _tr.find("th");
		}
		for (var _c = 0; _c < _td_coll.length; _c++) {
			var _td = _td_coll.eq(_c);
			var _value = _td.text();
			
			if (_c > 0) {
				_text = _text + "\t";
			}
			_text = _text + _value.trim();
		}
	}
	
	_copy_to_clipboard(_text);
};

var _copy_csv_table = function () {
	var _button = $(this);
	
	var _text = $("#preview").val().replace(/,/g , "\t");
	
	_copy_to_clipboard(_text);
};

var _copy_to_clipboard = function(_content) {
	//console.log(_content);
	var _button = $('<button type="button" id="clipboard_button"></button>')
		.attr("data-clipboard-text", _content)
		.hide()
		.appendTo("body");
		
	var clipboard = new Clipboard('#clipboard_button');
	
	_button.click();
	_button.remove();
};

// -----------------------

var _change_show_fulldata = function () {
	
	var _show = ($("#show_fulldata:checked").length === 1);
	//console.log([$("#show_fulldata").attr("checked"), _show]);

	var _cells = $(".stat-result .fulldata");
	if (_show) {
		_cells.show();
	}
	else {
		_cells.hide();
	}
};

var _change_show_std = function () {
	var _show = ($("#show_std:checked").length === 1);

	var _cells = $(".stat-result tr.std-tr");
	if (_show) {
            _cells.show();
	}
	else {
            _cells.hide();
	}
};

// -----------------------

$(function () {
  var _panel = $(".file-process-framework");
  _panel.find(".input-mode.textarea").change(_load_textarea);
  _panel.find(".myfile").change(_load_file);
  _panel.find(".myfile_buffer").change(_load_file_buffer);
  //_panel.find("#input_file_submit").click(_load_file);
  _panel.find(".download-file").click(_download_file_button);
  _panel.find(".download-test-file").click(_download_test_file_button);
  
  $('.menu .item').tab();
  $("button.copy-table").click(_copy_table);
  $("button.copy-csv").click(_copy_csv_table);
  $("#decimal_places").change(_change_to_fixed);
  
  $("#show_fulldata").change(_change_show_fulldata);
  $("#show_std").change(_change_show_std);
  
  // 20170108 測試用
  //_load_textarea();
  $.get("profile.csv", function (_csv) {
    $("#input_mode_textarea").val(_csv);  
    $.get("sequence.csv", function (_csv) {
        $("#input_mode_textarea_buffer").val(_csv);
        _load_textarea();
    });  
  });
    
});
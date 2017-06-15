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

// ---------------------

var _loading_enable = function (_callback) {
    $("#preloader").show().fadeIn("fast", "swing", _callback);
};

var _loading_disable = function () {
    $("#preloader").fadeOut().hide();
};

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
var _output_filename_ext=".txt";
var _output_filename_prefix="dgp_result-";


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
    var _pos = _original_file_name.indexOf(".");
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

// ----------------------------

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
  $("button.copy-table").click(FPF_COPY.copy_table);
  $("button.copy-csv").click(FPF_COPY.copy_csv_table);
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
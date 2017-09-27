
tinyMCE.init({
    mode: "specific_textareas",
    editor_selector: "mceEditor",
    plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
    ],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image  tableprops',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample code ',

    setup: function (ed) {
        ed.on('change', function (e) {
            //console.log('the content ', ed.getContent());
            _combine_input();
        });
    }
});

var _combine_input = function () {

    var _panel = $(".file-process-framework");

    var _result = "";

    var _finish = function () {
        var _input = _panel.find("#preview");
        _input.val(_result);

        _panel.find("#preview_html").html(_result);
    };

    // ---------------------
    // 定義欄位

    var _input_src = _panel.find("#input_src").val().trim();

    var _result = '<iframe src="' + _input_src + '" width="100%" style="height: 90vh;border: 1px solid #ccc;" frameborder="0" class="post-iframe"></iframe>';
    console.log(_result);

    _finish();

};	// var _combine_input = function () {

// --------------------------

var _process_file = function (_input, _callback) {
    _callback(_input);
};

var _output_filename_surffix = "_output";


// -------------------------------------

var _load_file = function (evt) {
    //console.log(1);
    if (!window.FileReader)
        return; // Browser is not compatible

    var _panel = $(".file-process-framework");

    _panel.find(".loading").removeClass("hide");

    var reader = new FileReader();
    var _result;

    var _file_name = evt.target.files[0].name;

    reader.onload = function (evt) {
        if (evt.target.readyState != 2)
            return;
        if (evt.target.error) {
            alert('Error while reading file');
            return;
        }

        //filecontent = evt.target.result;

        //document.forms['myform'].elements['text'].value = evt.target.result;
        _result = evt.target.result;

        _process_file(_result, function (_result) {
            _panel.find(".preview").val(_result);
            _panel.find(".filename").val(_file_name);

            $(".file-process-framework .myfile").val("");
            $(".file-process-framework .loading").addClass("hide");
            _panel.find(".display-result").show();
            _panel.find(".display-result .encoding").show();

            var _auto_download = (_panel.find('[name="autodownload"]:checked').length === 1);
            if (_auto_download === true) {
                _panel.find(".download-file").click();
            }

            //_download_file(_result, _file_name, "txt");
        })
    };

    var _pos = _file_name.lastIndexOf(".");
    _file_name = _file_name.substr(0, _pos)
            + _output_filename_surffix
            + _file_name.substring(_pos, _file_name.length);

    //console.log(_file_name);

    reader.readAsText(evt.target.files[0]);
};

var _load_textarea = function (evt) {
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
    var _file_name = local.toJSON().slice(0, 19).replace(/:/g, "-");
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
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

}

// --------------------------

$(function () {
    var _panel = $(".file-process-framework");
    _panel.find(".change-event").keyup(_combine_input).change(_combine_input);


    $('.copy-ele-value').click(function () {
        var _selector = $(this).data("copy-ele-value");
        var _val = $(_selector).val();
        PULI_UTIL.clipboard.copy(_val);
    });

    _combine_input();
});

var _combine_input = function () {

    var _panel = $(".file-process-framework");

    var _result = "";
    var _output_title = "";
    var _output_folder = "";

    var _finish = function () {
        var _input = _panel.find("#preview");
        _input.val(_result);

        _panel.find("#preview_html").html(_result);

        _panel.find("#output_title").val(_output_title);
        _panel.find("#output_folder").val(_output_folder);
    };

    // ---------------------
    // 定義欄位

    _output_title = _panel.find("#input_title").val().trim();

    var _template = _panel.find("#template").val().trim();

    var _fields = {};
    _panel.find(".field-value").each(function (_i, _ele) {
        //console.log(["get", $(_ele).attr("id"), $(_ele).val().trim()]);
        if ($(_ele).attr("id") === "") {
            return;
        }
        _fields[$(_ele).attr("id")] = $(_ele).val().trim();
    });

    // ---------------------
    // 開始處理

    // github
    var _fdf1 = _fields["fdf1"];
    if (_fdf1 !== "") {
        _fdf1 = _fdf1.replace(/\\/g, "/");
        _fdf1 = _fdf1.replace("D:/xampp/htdocs/blogger-page/", "https://pulipulichen.github.io/blogger/");
        //console.log(["fdf1", _fdf1]);
        _fields["fdf1"] = _fdf1;
    }

    // Google Drive
    var _fdf2 = _fields["fdf2"];
    var _google_presentation = _fdf2;

    // https://docs.google.com/presentation/d/1vuO5bwTyRKuxQl3Dz7ARNrmPuXHZL7uExMLMCExRfPM/edit?usp=sharing
    // https://docs.google.com/presentation/d/1vuO5bwTyRKuxQl3Dz7ARNrmPuXHZL7uExMLMCExRfPM/export/pptx
    if (_fdf2 !== "") {
        _fields["google_presentation"] = _fdf2;
        var _parts = _fdf2.split("/");
        var _id = _parts[5];
        _fdf2 = "https://docs.google.com/presentation/d/" + _id + "/export/pptx";

        //console.log(["fdf2", _fdf2]);
        _fields["fdf2"] = _fdf2;
        _fields["fdf2_pdf"] = "https://docs.google.com/presentation/d/" + _id + "/export/pdf";
        _fields["fdf2_odp"] = "https://docs.google.com/presentation/d/" + _id + "/export/odp";
    }

    if (_fields["file_list"] !== "") {
        /*
         "<p><a href="https://j.mp/nou104calc"><img src="https://lh4.googleusercontent.com/r4o8QXl8AdX4bYD_GwjoY0QzI7znRVVPFmFwfJI8P…gLsVity3TbGbNnLUHAmcTRuV4SIDf9OPQY-dzkvY3N2cv-DY1N51seNs5Tnxpkx46rxA2NjIaq" />&nbsp;test</a></p>
         <p><a href="https://j.mp/nou104calc"><img src="https://lh4.googleusercontent.com/r4o8QXl8AdX4bYD_GwjoY0QzI7znRVVPFmFwfJI8P…gLsVity3TbGbNnLUHAmcTRuV4SIDf9OPQY-dzkvY3N2cv-DY1N51seNs5Tnxpkx46rxA2NjIaq" />&nbsp;test</a></p>
         <p><a href="https://j.mp/nou104calc"><img src="https://lh4.googleusercontent.com/r4o8QXl8AdX4bYD_GwjoY0QzI7znRVVPFmFwfJI8P…gLsVity3TbGbNnLUHAmcTRuV4SIDf9OPQY-dzkvY3N2cv-DY1N51seNs5Tnxpkx46rxA2NjIaq" />&nbsp;test</a></p>
         <p>&nbsp;</p>"
         */

        var _files = _fields["file_list"];
        _files_jquery = $("<div>" + _files + "</div>");

        _files_jquery.find("br").remove();
        _files_jquery.find("li").each(function (_i, _ele) {
            //var _li_content = $($(_ele).html());
            //while (_li_content.length === 1 && _li_content.html().substr(0,1) === "<" && _li_content.html().substr(0,4) !== "<img" ) {
            //	_li_content = $(_li_content.html());
            //}
            //if (_li_content.text().trim !== "" || _li_content.find("img").length > 0 ) {
            _files_jquery.append($(_ele).html());
            //}
            $(_ele).remove();
        });
        _files_jquery.find("ul").remove();
        _files_jquery.find("img[src]").each(function (_i, _ele) {
            $(_ele).css({
                "max-height": "100px",
                "width": "auto"
            })
        });

        var _files = [];
        _files_jquery.children().each(function (_i, _ele) {
            var _wrap = $("<div></div>").append(_ele);
            _files.push(_wrap.html());
        });

        var _l = [];
        var _img = undefined;
        for (var _i = 0; _i < _files.length; _i++) {
            var _f = _files[_i].trim();
            if ($(_f).text().trim() === "" && _f.indexOf("<img") === -1) {
                //console.log(_f);
                //console.log([$(_f).text().trim(), _f.indexOf("<img")]);
                continue;
            }
            if (_f.indexOf("<img") !== -1) {
                _img = _f;
                continue;
            }

            //console.log(_f);
            if (_f !== "") {
                //if (_f.substr(0, 2) === "<a") {
                if (_img !== undefined) {
                    _f = _img + "<br />" + _f;
                    _img = undefined;
                }
                _f = "<li>" + _f + "</li>";
                //}
                //else {
                //	_f = "<li>" + _f + "：GitHub、Google Drive、OneDrive、Box、Mega、MediaFire</li>"
                //}

                _l.push(_f);
            }
        }
        _fields["file_list"] = "<ul>" + _l.join("") + "</ul>";
    }

    // -----------------------------
    // 取代內容

    //console.log(_fields);
    for (var _id in _fields) {
        if (_fields[_id] !== "") {
            //console.log([_id, _fields[_id]] );
            _template = _template.replace("{" + _id + "}", _fields[_id]);
        }
    }
    
    var _title_chi = _output_title.substr(0, _output_title.indexOf("/")).trim();
    _template = _template.replace("{CHI}", _title_chi);
    _template = _template.replace("{LINK}", _google_presentation);

    var date = new Date();

    
    _output_folder = date.yyyymmdd() + " blog " + _title_chi;

    // ---------------------

    _result = _template;

    // ---------------------
    // 輸出結果

    _finish();

};	// var _combine_input = function () {

// ---------------------
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('');
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
// -------------------------------------

tinyMCE.init({
    mode: "specific_textareas",
    editor_selector: "mceEditor",
    plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
    ],
    //toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image  tableprops',
    //toolbar2: 'print preview media | forecolor backcolor emoticons | codesample code ',
    toolbar1: 'insert | codesample code',

    menubar: false,
    statusbar: false,
    toolbar_item_size: "small",

    setup: function (ed) {
        ed.on('change', function (e) {
            //console.log(['TinyMCE change: ', ed.getContent(), ]);
            $("#" + ed.id).val(ed.getContent());
            _combine_input();
        });
    }
});

// --------------------------

$(function () {
    var _panel = $(".file-process-framework");
    //_panel.find(".input-mode.textarea").click(_load_textarea).keyup(_load_textarea);
    //_panel.find(".myfile").change(_load_file);
    //_panel.find(".download-file").click(_download_file_button);
    _panel.find(".change-event").change(_combine_input)
            .focus(function () {
                this.select();
            });

    //$('.menu .item').tab();
    //_combine_input();

    var _year = new Date().getFullYear();
    var _month = new Date().getMonth() + 1;
    if (_month < 10) {
        _month = "0" + _month;
    }
    $(".github-path").data("copy-attr", "D:\\xampp\\htdocs\\blogger-page\\posts\\" + _year + "\\" + _month);


    $('#copy_source_code').click(function () {
        PULI_UTIL.clipboard.copy($("#preview").val());
    });

    $('.copy-attr').click(function () {
        PULI_UTIL.clipboard.copy($(this).data("copy-attr"));
    });

    $('.copy-ele-value').click(function () {
        var _selector = $(this).data("copy-ele-value");
        var _val = $(_selector).val().trim();
        PULI_UTIL.clipboard.copy(_val);
    });

    _combine_input();
});
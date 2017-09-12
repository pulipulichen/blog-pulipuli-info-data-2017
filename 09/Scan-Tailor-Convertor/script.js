
var _b_handleFileSelect = function (evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        jQuery(".scantailor20150710b_filename").val(f.name);

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var _input = e.target.result;
                $("#scantailor20150710b_input_textarea").val(_input);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
};

var _exec = function () {
    var _input = $("#scantailor20150710b_input_textarea").val();
    var _output = _scantailor20150710bSetFullContent(_input);
    jQuery(".scantailor20150710b_output").val(_output);
    //jQuery(".scantailor20150710b_input_label").hide();
    jQuery(".scantailor20150710b_output_label").show();
    jQuery(".scantailor20150710b_download").click();
    //jQuery(".scantailor20150710b_reset").click();
};

setTimeout(function () {
    document.getElementById('scantailor20150710b_input').addEventListener('change', _b_handleFileSelect, false);
    jQuery(".scantailor20150710b_reset").click(function () {
        //jQuery(".scantailor20150710b_output_label").hide();
        jQuery(".scantailor20150710b_input_label").show();
    });

    $(".scantailor20150710b_download").click(function () {
        var _text = $(".scantailor20150710b_output").val();
        var _filename = $(".scantailor20150710b_filename").val();

        _scantailor20150710b_download(_filename, _text);
    });
}, 500);

var _scantailor20150710b_download = function (filename, text) {
    var element = document.createElement('a');
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    element.setAttribute('download', filename);
    //element.innerHTML = "1212";

    element.style.display = 'none';
    document.body.appendChild(element);
    //$(function () {

    element.click();

    document.body.removeChild(element);
//});
};



var _scantailor20150710bSetFullContent = function (_input) {



    var _xml = $($.parseXML(_input));
    _xml.find("project > filters > select-content > page > params").each(function (_index, _params) {
        _params = $(_params);

        var _max_width = 0, _max_height = 0;

        _params.find("dependencies rotated-page-outline point").each(function (_i, _point) {
            _point = $(_point);
            var _x = parseFloat(_point.attr("x"));
            if (_x > _max_width) {
                _max_width = _x;
            }

            var _y = parseFloat(_point.attr("y"));
            if (_y > _max_height) {
                _max_height = _y;
            }
        });

        _params.find("content-rect")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", _max_width)
                .attr("height", _max_height);

    });

    // -----------------

    return _scantailor20150710bSetPageLayout(_xml);
};

var _scantailor20150710bSetPageLayout = function (_xml) {

    var _pageLayout = _xml.find("project > filters > page-layout");

    _xml.find("project > filters > select-content > page").each(function (_index, _page) {
        var _id = $(_page).attr("id");
        _pageLayout.append('<page id="' + _id + '">'
                + '<params>'
                + '<hardMarginsMM right="0" left="0" bottom="0" top="0"/>'
                + '<contentSizeMM/>'
                + '<alignment vert="top" hor="hcenter" null="1"/>'
                + '</params>'
                + '</page>')
    });


    return _scantailor20150710bSetOutput(_xml);
};

var _scantailor20150710bSetOutput = function (_xml) {

    _xml.find("project > filters > output > page > params > color-params").attr("colorMode", "colorOrGray");

    return _scantailor20150710b_convertXMLtoString(_xml);
};


var _scantailor20150710b_convertXMLtoString = function (_xml) {
    var _xmlString;
    if (window.ActiveXObject) {
        _xmlString = _xml.xml;
    } else {
        var _oSerializer = new XMLSerializer();
        _xmlString = _oSerializer.serializeToString(_xml[0]);
    }
    return _xmlString;
};
  
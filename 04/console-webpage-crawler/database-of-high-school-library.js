// http://163.23.175.5/LIB/LibList.aspx?year=104&semi=2

/**
var scriptTag = document.createElement("script"),
    firstScriptTag = document.getElementsByTagName("script")[0]; 
scriptTag.src = 'http://localhost/blogger-data/blog-pulipuli-info-data-2017/04/console-webpage-crawler/database-of-high-school-library.js'; 
scriptTag.id = "webcrawler";
firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); 

*/

main = function (_callback) {
    var _data = [];
    
    // 先抓縣市別吧
    $('#tbList tr[height="50"]').each(function (_i, _tr) {
        //var _d = {};
        
        //_d["縣市別"] = $(_tr).find("td:first").text().split("(")[0].trim();
        var _district = $(_tr).find("td:first").text().split("(")[0].trim();
        
        $(_tr).find("td:last a").each(function (_j, _a) {
            var _school_name = _a.innerText.trim();
            var _link = _a.href;
            
            var _d = {};
            _d["district"] = _district;
            _d["school_name"] = _school_name;
            _d["link"] = _link;
            
            _data.push(_d);
        });
        
        //_data.push(_d);
    });
    
    
    // -------------------------------------------------------
    //console.log(_data);
    _callback(_data);
};

var scriptTag = document.createElement("script"),
    firstScriptTag = document.getElementsByTagName("script")[0]; 
scriptTag.src = 'https://pulipulichen.github.io/blog-pulipuli-info-data-2017/04/console-webpage-crawler/console-webpage-crawler-lib.js'; 
scriptTag.id = "webcrawler_lib";
firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); 
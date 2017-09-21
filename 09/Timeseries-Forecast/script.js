$(function () {
    document.title = '中正圖書館入館及換證人次統計';
    
    // 先處理標題的年分
    var _year_list = [];
    //console.log($('body > p:contains("中正圖書館")').length);
    $('body > p:contains("中正圖書館")').each(function (_i, _ele) {
        var _text = $(_ele).text();
        _text = _text.split("(")[1];
        _text = _text.split("年")[0];
        _text = parseInt(_text, 10) + 1911;
        _year_list.push(_text);
    });
    
    //console.log(_year_list);
    
    // ------------------
    // 取得每個月的資料
    var _full_data = [];
    // date 日期
    // skip 略過的日期
    // in_semester 學期內 
    // entry_count 中正館入館人次
    // change_count 校外人士換證人次 (可省略
    
    $('body > table')
            //.eq(0)
            .each(function (_i, _table) {
        var _year = _year_list[_i];
        
        var _break = false;
        $(_table).find("tr").each(function (_j, _tr) {
            _tr = $(_tr);
            //console.log(_tr.text());
            if (_j === 0 || _break === true) {
                // 第一行不要
                return;
            } else if (_tr.children('td:contains("月"):contains("日")').length === 0) {
                _break = true;
                return;
            }
            
            var _date = _tr.children('td:contains("月"):contains("日")').text();
            
            var _month = _date.split("月")[0];
            _month = parseInt(_month, 10);
            var _m = _month;
            if (_month < 10) {
                _month = '0' + _month;
            }
            
            var _day = _date.split("月")[1];
            _day = _day.split("日")[0];
            _day = parseInt(_day, 10);
            var _d = _day;
            if (_day < 10) {
                _day = '0' + _day;
            }
            
            _date = _year + '-' + _month + '-' + _day;
            //console.log(_date);
            
            // --------------------------
            
            var _skip = true;
            var _entry_count = '?';
            var _change_count = '?';
            if ($(_tr).children('td').length === 3) {
                _skip = false;
                //_entry_count = parseInt($(_tr).children('td:eq(1)').text(), 10);
                _entry_count = $(_tr).children('td:eq(1)').text();
                _entry_count = _entry_count.split(",").join("");
                _entry_count = parseInt(_entry_count, 10);
                //_change_count = parseInt($(_tr).children('td:eq(2)').text(), 10);
                _change_count = $(_tr).children('td:eq(2)').text();
                _change_count = _change_count.split(",").join("");
                _change_count = parseInt(_change_count, 10);
            }
            
            var _in_semester = true;
            if ( (_year === 2016 && _m === 1 && (_d > 17 && _d < 32)) 
                    || (_year === 2016 && _m === 2 && (_d > 0 && _d < 22))
                    || (_year === 2016 && _m === 6 && (_d > 26 && _d < 31))
                    || (_year === 2016 && _m === 7)
                    || (_year === 2016 && _m === 8)
                    || (_year === 2016 && _m === 9 && (_d > 0 && _d < 12))
                    || (_year === 2017 && _m === 1 && (_d > 12 && _d < 32))
                    || (_year === 2017 && _m === 2 && (_d > 0 && _d < 20))
                    || (_year === 2017 && _m === 6 && (_d > 22 && _d < 32))
                    || (_year === 2017 && _m === 7)
                    || (_year === 2017 && _m === 8)) {
                _in_semester = false;
            }
            
            _full_data.push([
                _date,
                _skip,
                _in_semester,
                _entry_count,
                _change_count,
            ]);
        });
    });
    
    //console.log(_full_data.join('\n'));
    
    // ------------------
    // 繪製表格
    
    var _textarea = $('<textarea></textarea>').css({
        'width': '100%',
        'height': '100vh'
    });
    
    var _output = "data,skip,in_semester,entry_count,change_count";
    for (var _i = 0; _i < _full_data.length; _i++) {
        _output = _output + "\n" + _full_data[_i].join(",");
    }
    _textarea.val(_output);
    
    $('body').prepend(_textarea);
    _textarea.select();
});
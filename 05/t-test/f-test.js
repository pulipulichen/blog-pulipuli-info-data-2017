F_TEST = {};

// http://baike.baidu.com/item/F%E6%A3%80%E9%AA%8C/9910842
F_TEST.calc_mean_square = function (_array) {
    var _avg = _calc_avg(_array);
    var _df = _array.length - 1;
    
    var _ms_sigma = 0;
    for (var _i = 0; _i < _array.length; _i++) {
        var _x = _array[_i];
        var _ms = _x - _avg;
        _ms = _ms * _ms;
        _ms_sigma = _ms_sigma + _ms;
    }
    var _result = _ms_sigma / _df;
    return _result;
};

F_TEST.calc_f_stat = function (_array1, _array2) {
    if (_array1.length < _array2.length) {
        var _temp = _array1;
        _array1 = _array2;
        _array2 = _temp;
    }
    
    var _ms1 = F_TEST.calc_mean_square(_array1);
    var _ms2 = F_TEST.calc_mean_square(_array2);
    return (_ms1 / _ms2);
};
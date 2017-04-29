// https://gist.github.com/matt-west/6500993

/**
 *  @fileoverview Pearson correlation score algorithm.
 *  @author matt.west@kojilabs.com (Matt West)
 *  @license Copyright 2013 Matt West.
 *  Licensed under MIT (http://opensource.org/licenses/MIT).
 */


/**
 *  Calculate the person correlation score between two items in a dataset.
 *
 *  @param  {object}  prefs The dataset containing data about both items that
 *                    are being compared.
 *  @param  {string}  p1 Item one for comparison.
 *  @param  {string}  p2 Item two for comparison.
 *  @return {float}  The pearson correlation score.
 */
function pearsonCorrelation(prefs_array1, prefs_array2) {
    var p1 = "x";
    var p2 = "y";
    var prefs = {"x": [], "y": []};
    
    if (prefs_array2 === undefined) {
        for (var _i = 0; _i < prefs_array1.length; _i++) {
            prefs["x"].push(prefs_array1[_i][0]);
            prefs["y"].push(prefs_array1[_i][1]);
        }
    }
    else {
        for (var _i = 0; _i < prefs_array1.length; _i++) {
            prefs["x"].push(prefs_array1[_i]);
            prefs["y"].push(prefs_array2[_i]);
        }
    }
    
    // ----------------
    
    var si = [];

    

    for (var key in prefs[p1]) {
        if (prefs[p2][key]) {
            si.push(key);
        }
    }

    var n = si.length;

    if (n === 0) {
        return 0;
    }

    var sum1 = 0;
    for (var i = 0; i < n; i++)
        sum1 += prefs[p1][si[i]];

    var sum2 = 0;
    for (var i = 0; i < si.length; i++)
        sum2 += prefs[p2][si[i]];

    var sum1Sq = 0;
    for (var i = 0; i < si.length; i++) {
        sum1Sq += Math.pow(prefs[p1][si[i]], 2);
    }

    var sum2Sq = 0;
    for (var i = 0; i < si.length; i++) {
        sum2Sq += Math.pow(prefs[p2][si[i]], 2);
    }

    var pSum = 0;
    for (var i = 0; i < si.length; i++) {
        pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
    }

    var num = pSum - (sum1 * sum2 / n);
    var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
            (sum2Sq - Math.pow(sum2, 2) / n));

    if (den === 0) {
        return 0;
    }

    return num / den;
}

/*
var _d = [[74,10],
[76,83],
[88,10],
[63,74],
[63,75],
[10,79],
[69,73],
[10,92],
[58,10],
[75,85]];
console.log(pearsonCorrelation(_d));
*/
// Levene's Test
// Luke Mitchell, April 2016
// https://github.com/lukem512/levene-test

//var sm = require('statistical-methods');

var abs = function(mu, s) {
	return Math.abs(mu - s);
};

var quad = function(mu, s) {
	var delta = (mu - s);
	return delta * delta;
};

// Perform the Levene transformation.
var transform = function(samples, quadratic) {
	var z = [];

	var modifier = (quadratic) ? quad : abs;

	samples.forEach(function(sample) {
		var mu = _calc_avg(sample);
		var zj = [];
		sample.forEach(function(s) {
			zj.push(modifier(mu, s));
		});
		z.push(zj);
	});

	return z;
};

/**
 * Compute the W-value
 * @param {type} samples
 * @param {type} quadratic
 * @returns {Number}
 */
var _calc_levene_test = function(samples, quadratic) {
	var z = transform(samples, quadratic);

	// Compute N, the total number of observations
	// and p, the number of samples
	var N = 0, p = samples.length;
	samples.forEach(function(sample) {
		N += sample.length;
	});

	// Compute z.., the mean of all zij
	var zs = [];
	z.forEach(function(zi) {
		zs = zs.concat(zi);
	});
	var zdotdot = _calc_avg(zs);

	// Compute the denominator and the numerator
	var numerator = 0, denominator = 0;
	for (var i = 0; i < p; i++) {

		// The number of observations in sample i
		var n = samples[i].length;

		// The mean of all zij for sample i
		var zidot = _calc_avg(z[i]);

		var dz = (zidot - zdotdot);
		numerator += (n * (dz * dz));

		denominator += _calc_sum(z[i].map(function(zij) {
			var dz = (zij - zidot);
			return (dz * dz);
		}));
	}

	// Add divisors
	numerator = (N - p) * numerator;
	denominator = (p - 1) * denominator;

	// Return ratio
	return (numerator / denominator); 
};

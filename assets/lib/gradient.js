var Gradient = function Gradient(from, to, steps) {
	var colors = {};
	var fromRgb = hexToRgb(from);
	var toRgb = hexToRgb(to);

	colors.r = spreadNumber(fromRgb.r, toRgb.r, steps);
	colors.g = spreadNumber(fromRgb.g, toRgb.g, steps);
	colors.b = spreadNumber(fromRgb.b, toRgb.b, steps);

	return {
		rgb: function rgb() {
			var result = [];
			for (var i = 0; i < steps + 2; i++) {
				result.push('rgb(' + colors.r[i] + ',' + colors.g[i] + ',' + colors.b[i] + ')');
			}
			return result;
		},

		hex: function hex() {
			var result = [];
			for (var i = 0; i < steps + 2; i++) {
				var r = '0' + colors.r[i].toString(16);
				var g = '0' + colors.g[i].toString(16);
				var b = '0' + colors.b[i].toString(16);
				result.push('#' + r.slice(-2) + g.slice(-2) + b.slice(-2));
			}
			return result;
		}
	};

	function spreadNumber(from, to, steps) {
		var result = [from];

		if (from > to) {
			var inc = (from - to) / (steps + 1);
			for (var i = 0; i < steps; i++) {
				result.push(Math.round(result[i] - inc));
			}
		} else if (from < to) {
			var _inc = (to - from) / (steps + 1);
			for (var _i = 0; _i < steps; _i++) {
				result.push(Math.round(result[_i] + _inc));
			}
		} else if (from == to) {
			for (var _i2 = 0; _i2 < steps; _i2++) {
				result.push(from);
			}
		}

		result.push(to);

		return result;
	}

	function hexToRgb(hex) {
		hex = hex.replace('#', '');
		var r = parseInt(hex.substring(0, 2), 16);
		var g = parseInt(hex.substring(2, 4), 16);
		var b = parseInt(hex.substring(4, 6), 16);
		return { r: r, g: g, b: b };
	}
};

export default Gradient;
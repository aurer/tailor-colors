const Gradient = function(from, to, steps) {
	let colors = {};
	let fromRgb = hexToRgb(from);
	let toRgb = hexToRgb(to);

	colors.r = spreadNumber(fromRgb.r, toRgb.r, steps);
	colors.g = spreadNumber(fromRgb.g, toRgb.g, steps);
	colors.b = spreadNumber(fromRgb.b, toRgb.b, steps);

	return {
		rgb: function() {
			let result = [];
			for(let i=0; i < steps + 2; i++) {
				result.push('rgb(' + colors.r[i] + ',' + colors.g[i] + ',' + colors.b[i] + ')');
			}
			return result;
		},

		hex: function() {
			let result = [];
			for(let i=0; i < steps + 2; i++) {
				let r = '0' + colors.r[i].toString(16);
				let g = '0' + colors.g[i].toString(16);
				let b = '0' + colors.b[i].toString(16);
				result.push('#' + r.slice(-2) + g.slice(-2) + b.slice(-2));
			}
			return result;
		}
	}

	function spreadNumber(from, to, steps) {
		let result = [from];

		if (from > to) {
			let inc = (from - to) / (steps + 1);
			for(let i = 0; i < steps; i++) {
				result.push(Math.round(result[i] - inc));
			}
		}

		else if (from < to) {
			let inc = (to - from) / (steps + 1);
			for(let i = 0; i < steps; i++) {
				result.push(Math.round(result[i] + inc));
			}
		}

		else if (from == to) {
			for(let i = 0; i < steps; i++) {
				result.push(from);
			}
		}

		result.push(to);

		return result;
	}

	function hexToRgb(hex) {
		hex = hex.replace('#', '');
		let r = parseInt(hex.substring(0,2), 16);
		let g = parseInt(hex.substring(2,4), 16);
		let b = parseInt(hex.substring(4,6), 16);
		return {r:r, g:g, b:b};
	}
}

export default Gradient;

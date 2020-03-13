class Color {
	red = null;
	green = null;
	blue = null;
	
	static fromHex(hex) {
		let rgb = this._hexToRgb(hex);
		return new Color(...Object.values(rgb));
	}

	static fromRGB(r, g, b) {
		return new Color(r, g, b);
	}

	constructor(r, g, b) {
		this.red = r;
		this.green = g;
		this.blue = b;
		return this;
	}

	toHex() {
		return Color._rgbToHex(this.red, this.green, this.blue);
	}

	toRGB() {
		return [this.red, this.green, this.blue];
	}

	toRGBString() {
		let [r, g, b] = [this.red, this.green, this.blue];
		return `${r}, ${g}, ${b}`;
	}

	toHSL() {
		return Color._rgbToHSL(this.red, this.green, this.blue);
	}

	toHSLString() {
		let [h, s, l] = Color._rgbToHSL(this.red, this.green, this.blue);
		return `${h}, ${s}%, ${l}%`;
	}

	static _calculateSaturation(luminance, min, max) {
		if (max === min) return 0;

		if (luminance < 0.5) {
			return (max - min) / (max + min)
		}

		return Math.round((max - min) / (2.0 - max - min) * 100)
	}

	static _calculateHue(r, g, b) {
		let min = Math.min(r, g, b);
		let max = Math.max(r, g, b);

		if (min === max) {
			return 0;
		}

		let hue = 0;
		if (r === max) {
			hue = (g - b) / (max - min);
		}
		else if (g === max) {
			hue = 2.0 + (b - r) / (max - min);
		}
		else if (b === max) {
			hue = 4.0 + (r - g) / (max - min);
		}

		hue *= 60;
		if (hue < 0) {
			hue += 360;
		}

		return Math.round(hue);
	}

	static _hexToRgb(hex) {
		hex = this._cleanHexCode(hex.replace('#', ''));
		let r = parseInt(hex.substring(0, 2), 16);
		let g = parseInt(hex.substring(2, 4), 16);
		let b = parseInt(hex.substring(4, 6), 16);
		return { r: r, g: g, b: b };
	}

	static _cleanHexCode(hex) {
		if (!this._isValidHex(hex)) {
			throw new Error(`Expected a valid 3 or 6 digit HEX code but got '${hex}'`);
		}
		
		if (hex.length == 6) {
			return hex.toUpperCase();
		}

		return hex.split('').map(char => char.toString() + char.toString()).join('').toUpperCase();
	}

	static _isValidHex(hex) {
		return /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
	}

	static _rgbToHex(r, g, b) {
		let red = r.toString(16).toUpperCase();
		let green = g.toString(16).toUpperCase();
		let blue = b.toString(16).toUpperCase();
		return red.padStart(2, 0) + green.padStart(2, 0) + blue.padStart(2, 0);
	}

	static _rgbToHSL(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;
		let min = Math.min(r, g, b);
		let max = Math.max(r, g, b);
		let luminance = (max + min) / 2;
		let saturation = Color._calculateSaturation(luminance, min, max);
		let hue = Color._calculateHue(r, g, b);
		return [hue, Math.round(saturation *  100), Math.round(luminance * 100)];
	}
}

export default Color;
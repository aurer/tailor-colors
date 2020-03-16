export default class Color {
	red: number;
	green: number;
	blue: number;

	static fromHex(hex: string): Color {
		let rgb: Array<number> = this._hexToRgb(hex);
		return new Color(rgb[0], rgb[1], rgb[2]);
	}

	static fromRGB(r: number, g: number, b: number): Color {
		return new Color(r, g, b);
	}

	constructor(r: number, g: number, b: number) {
		this.red = r;
		this.green = g;
		this.blue = b;
		return this;
	}

	toHex(): string {
		return Color._rgbToHex(this.red, this.green, this.blue);
	}

	toRGB(): Array<number> {
		return [this.red, this.green, this.blue];
	}

	toRGBString(): string {
		let [r, g, b] = [this.red, this.green, this.blue];
		return `${r}, ${g}, ${b}`;
	}

	toHSL(): Array<number> {
		return Color._rgbToHSL(this.red, this.green, this.blue);
	}

	toHSLString(): string {
		let [h, s, l] = Color._rgbToHSL(this.red, this.green, this.blue);
		return `${h}, ${s}%, ${l}%`;
	}

	static _calculateSaturation(luminance: number, min: number, max: number): number {
		let saturation: number = 0;

		if (max === min) {
			return saturation;
		}

		if (luminance < 0.5) {
			saturation = (max - min) / (max + min);
		} else {
			saturation = (max - min) / (2.0 - max - min);
		}

		return Math.round(saturation * 100);
	}

	static _calculateHue(r: number, g: number, b: number): number {
		let min: number = Math.min(r, g, b);
		let max: number = Math.max(r, g, b);

		if (min === max) {
			return 0;
		}

		let hue: number = 0;
		if (r === max) {
			hue = (g - b) / (max - min);
		} else if (g === max) {
			hue = 2.0 + (b - r) / (max - min);
		} else if (b === max) {
			hue = 4.0 + (r - g) / (max - min);
		}

		hue *= 60;
		if (hue < 0) {
			hue += 360;
		}

		return Math.round(hue);
	}

	static _hexToRgb(hex: string): number[] {
		hex = this._cleanHexCode(hex.replace('#', ''));
		let r = parseInt(hex.substring(0, 2), 16);
		let g = parseInt(hex.substring(2, 4), 16);
		let b = parseInt(hex.substring(4, 6), 16);
		return [r, g, b];
	}

	static _cleanHexCode(hex: string): string {
		if (!this._isValidHex(hex)) {
			throw new Error(`Expected a valid 3 or 6 digit HEX code but got '${hex}'`);
		}

		if (hex.length == 6) {
			return hex.toUpperCase();
		}

		return hex
			.split('')
			.map(char => char.toString() + char.toString())
			.join('')
			.toUpperCase();
	}

	static _isValidHex(hex: string): boolean {
		return /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
	}

	static _rgbToHex(r: number, g: number, b: number): string {
		let red = r.toString(16).toUpperCase();
		let green = g.toString(16).toUpperCase();
		let blue = b.toString(16).toUpperCase();
		return red.padStart(2, '0') + green.padStart(2, '0') + blue.padStart(2, '0');
	}

	static _rgbToHSL(r, g, b): Array<number> {
		r /= 255;
		g /= 255;
		b /= 255;
		let min: number = Math.min(r, g, b);
		let max: number = Math.max(r, g, b);
		let luminance: number = (max + min) / 2;
		let saturation: number = Color._calculateSaturation(luminance, min, max);
		let hue: number = Color._calculateHue(r, g, b);
		return [hue, saturation, Math.round(luminance * 100)];
	}
}

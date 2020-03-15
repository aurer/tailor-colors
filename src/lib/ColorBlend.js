import NumberFill from './NumberFill';
import Color from './Color';

export default class ColorBlend {
	static colorsBetween(fromColor, toColor, steps) {
		let fromRGB = Color.fromHex(fromColor).toRGB();
		let toRGB = Color.fromHex(toColor).toRGB();

		let reds = NumberFill.numbersBetweenInclusive(fromRGB[0], toRGB[0], steps).map(c => Math.floor(c));
		let greens = NumberFill.numbersBetweenInclusive(fromRGB[1], toRGB[1], steps).map(c => Math.floor(c));
		let blues = NumberFill.numbersBetweenInclusive(fromRGB[2], toRGB[2], steps).map(c => Math.floor(c));

		let colors = [];
		for (let i = 0; i < steps + 2; i++) {
			let color = Color.fromRGB(reds[i], greens[i], blues[i]);
			colors.push(color);
		}

		return {
			asHex: () => colors.map(c => c.toHex()),
			asRGB: () => colors.map(c => c.toRGB()),
			asHSL: () => colors.map(c => c.toHSL())
		};
	}
}

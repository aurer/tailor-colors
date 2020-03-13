import NumberWang from './NumberWang';
import Color from './Color';

export default class ColorBlend {
	static colorsBetween(color1, color2, steps) {
		let rgb1 = Color.fromHex(color1).toRGB();
		let rgb2 = Color.fromHex(color2).toRGB();

		let reds = NumberWang.numbersBetweenInclusive(rgb1[0], rgb2[0], steps);
		let greens = NumberWang.numbersBetweenInclusive(rgb1[1], rgb2[1], steps);
		let blues = NumberWang.numbersBetweenInclusive(rgb1[2], rgb2[2], steps);
		
		reds = reds.map(c => Math.floor(c));
		greens = greens.map(c => Math.floor(c));
		blues = blues.map(c => Math.floor(c));
		
		let colors = [];
		for(let i = 0; i < reds.length; i++) {
			let hex = Color.fromRGB(reds[i], greens[i], blues[i]).toHex();
			colors.push(hex);
		}

		return colors;

	}
}
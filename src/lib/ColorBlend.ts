import NumberFill from './NumberFill';
import Color from './Color';

export interface ColorBlendInterface {
	asHex(): Array<string>;
	asRGB(): Array<number[]>;
	asHSL(): Array<number[]>;
}

export default class ColorBlend {
	static colorsBetween(fromColor: string, toColor: string, steps: number): ColorBlendInterface {
		let fromRGB: number[] = Color.fromHex(fromColor).toRGB();
		let toRGB: number[] = Color.fromHex(toColor).toRGB();

		let reds: number[] = NumberFill.numbersBetweenInclusive(fromRGB[0], toRGB[0], steps).map(c => Math.floor(c));
		let greens: number[] = NumberFill.numbersBetweenInclusive(fromRGB[1], toRGB[1], steps).map(c => Math.floor(c));
		let blues: number[] = NumberFill.numbersBetweenInclusive(fromRGB[2], toRGB[2], steps).map(c => Math.floor(c));

		let colors: Array<Color> = [];
		for (let i = 0; i < steps + 2; i++) {
			let color: Color = Color.fromRGB(reds[i], greens[i], blues[i]);
			colors.push(color);
		}

		return {
			asHex: () => colors.map(c => c.toHex()),
			asRGB: () => colors.map(c => c.toRGB()),
			asHSL: () => colors.map(c => c.toHSL())
		};
	}
}

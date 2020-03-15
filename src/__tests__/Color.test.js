import Color from '../lib/Color';

const tests = [
	{ hexIn: '#aaa', hexOut: 'AAAAAA', rgb: [170, 170, 170], hsl: [0, 0, 67] },
	{ hexIn: '#000', hexOut: '000000', rgb: [0, 0, 0], hsl: [0, 0, 0] },
	{ hexIn: '#f6f6f6', hexOut: 'F6F6F6', rgb: [246, 246, 246], hsl: [0, 0, 96] },
	{ hexIn: '#f00', hexOut: 'FF0000', rgb: [255, 0, 0], hsl: [0, 100, 50] },
	{ hexIn: '#81BFE8', hexOut: '81BFE8', rgb: [129, 191, 232], hsl: [204, 69, 71] },
	{ hexIn: '#1a4c5a', hexOut: '1A4C5A', rgb: [26, 76, 90], hsl: [193, 55, 23] },
	{ hexIn: '#186276', hexOut: '186276', rgb: [24, 98, 118], hsl: [193, 66, 28] }
];

it('throws error for invalid HEX code', () => {
	const invalidCharacters = () => Color.fromHex('xxx');
	expect(invalidCharacters).toThrowError();
	const invalidLength = () => Color.fromHex('1111');
	expect(invalidLength).toThrowError();
});

it('can convert HEX to HEX', () => {
	tests.forEach(color => {
		expect(Color.fromHex(color.hexIn).toHex()).toBe(color.hexOut);
	});
});

it('can convert RGB to HEX', () => {
	tests.forEach(color => {
		expect(Color.fromRGB(...color.rgb).toHex()).toBe(color.hexOut);
	});
});

it('can convert HEX to an RGB array', () => {
	tests.forEach(color => {
		expect(Color.fromHex(color.hexIn).toRGB()).toEqual(color.rgb);
	});
});

it('can convert HEX to an RGB string', () => {
	tests.forEach(color => {
		expect(Color.fromHex(color.hexIn).toRGBString()).toEqual(color.rgb.join(', '));
	});
});

it('can convert HEX to an HSL array', () => {
	tests.forEach(color => {
		expect(Color.fromHex(color.hexIn).toHSL()).toEqual(color.hsl);
	});
});

it('can convert HEX to an HSL string', () => {
	tests.forEach(color => {
		expect(Color.fromHex(color.hexIn).toHSLString()).toEqual(`${color.hsl[0]}, ${color.hsl[1]}%, ${color.hsl[2]}%`);
	});
});

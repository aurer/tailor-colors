import Color from '../lib/Color';

it('throws error for invalid HEX code', () => {
	const invalidCharacters = () => Color.fromHex('xxx');
	expect(invalidCharacters).toThrowError();

	const invalidLength = () => Color.fromHex('1111');
	expect(invalidLength).toThrowError();
})

it('can convert HEX to HEX', () => {
	let alpha = Color.fromHex('#aaa');
	expect(alpha.toHex()).toBe('AAAAAA');

	let numeric = Color.fromHex('#000000');
	expect(numeric.toHex()).toBe('000000');

	let alphanumeric = Color.fromHex('#0380D2');
	expect(alphanumeric.toHex()).toBe('0380D2');

	let alphanumericShort = Color.fromHex('#f00');
	expect(alphanumericShort.toHex()).toBe('FF0000');
})

it('can convert RGB to HEX', () => {
	let alpha = Color.fromRGB(170, 170, 170);
	expect(alpha.toHex()).toBe('AAAAAA');

	let numeric = Color.fromRGB(0, 0, 0);
	expect(numeric.toHex()).toBe('000000');

	let alphanumeric = Color.fromRGB(246, 246, 246);
	expect(alphanumeric.toHex()).toBe('F6F6F6');
})

it('can convert HEX to an RGB array', () => {
	let alpha = Color.fromHex('#aaa');
	expect(alpha.toRGB()).toEqual([170, 170, 170]);

	let numeric = Color.fromHex('#000000');
	expect(numeric.toRGB()).toEqual([0, 0, 0]);

	let alphanumeric = Color.fromHex('#f6f6f6');
	expect(alphanumeric.toRGB()).toEqual([246, 246, 246]);

	let alphanumericShort = Color.fromHex('#f00');
	expect(alphanumericShort.toRGB()).toEqual([255, 0, 0]);
})

it('can convert HEX to an RGB string', () => {
	let alpha = Color.fromHex('#aaa');
	expect(alpha.toRGBString()).toBe('170, 170, 170');

	let numeric = Color.fromHex('#000000');
	expect(numeric.toRGBString()).toBe('0, 0, 0');

	let alphanumeric = Color.fromHex('#f6f6f6');
	expect(alphanumeric.toRGBString()).toBe('246, 246, 246');

	let alphanumericShort = Color.fromHex('#f00');
	expect(alphanumericShort.toRGBString()).toBe('255, 0, 0');
})

it('can convert HEX to an HSL array', () => {
	let alpha = Color.fromHex('aaa');
	expect(alpha.toHSL()).toEqual([0, 0, 67]);

	let alphanumeric = Color.fromHex('1a4c5a');
	expect(alphanumeric.toHSL()).toEqual([193, 55, 23]);
	
	let numeric = Color.fromHex('186276');
	expect(numeric.toHSL()).toEqual([193, 66, 28]);
})

it('can convert HEX to an HSL string', () => {
	let alpha = Color.fromHex('aaa');
	expect(alpha.toHSLString()).toBe('0, 0%, 67%');

	let alphanumeric = Color.fromHex('1a4c5a');
	expect(alphanumeric.toHSLString()).toBe('193, 55%, 23%');
	
	let numeric = Color.fromHex('186276');
	expect(numeric.toHSLString()).toBe('193, 66%, 28%');
})
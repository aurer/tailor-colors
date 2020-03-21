import ColorBlend from '../lib/ColorBlend';

it('can blend two colors with one step as hex', () => {
	let colors = ColorBlend.colorsBetween('#0380D2', '#FFFFFF', 1).asHex();
	expect(colors).toEqual(['0380D2', '81BFE8', 'FFFFFF']);
});

it('can blend two colors with three steps as hex', () => {
	let colors = ColorBlend.colorsBetween('#0380D2', '#FFFFFF', 3).asHex();
	expect(colors).toEqual(['0380D2', '429FDD', '81BFE8', 'C0DFF3', 'FFFFFF']);
});

it('can blend two colors with six steps as hex', () => {
	let colors = ColorBlend.colorsBetween('#07e3f2', '#155994', 6).asHex();
	expect(colors).toEqual(['07E3F2', '09CFE4', '0BBBD7', '0DA7C9', '0F94BC', '1180AE', '136CA1', '155994']);
});

it('can blend one color with three steps as hex', () => {
	let colors = ColorBlend.colorsBetween('#FFF', '#FFF', 3).asHex();
	expect(colors).toEqual(['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF']);
});

it('can blend black to white as hex', () => {
	let colors = ColorBlend.colorsBetween('#000', '#FFF', 1).asHex();
	expect(colors).toEqual(['000000', '7F7F7F', 'FFFFFF']);
});

it('can blend two colors with one step as RGB', () => {
	let colors = ColorBlend.colorsBetween('#0380D2', '#FFFFFF', 1).asRGB();
	expect(colors).toEqual([
		[3, 128, 210],
		[129, 191, 232],
		[255, 255, 255]
	]);
});

it('can blend black to white as RGB', () => {
	let colors = ColorBlend.colorsBetween('#000', '#FFF', 1).asRGB();
	expect(colors).toEqual([
		[0, 0, 0],
		[127, 127, 127],
		[255, 255, 255]
	]);
});

it('can blend two colors with one step as HSL', () => {
	let colors = ColorBlend.colorsBetween('#0380D2', '#FFFFFF', 1).asHSL();
	expect(colors).toEqual([
		[204, 97, 42],
		[204, 69, 71],
		[0, 0, 100]
	]);
});

it('can blend black to white as HSL', () => {
	let colors = ColorBlend.colorsBetween('#000', '#FFF', 1).asHSL();
	expect(colors).toEqual([
		[0, 0, 0],
		[0, 0, 50],
		[0, 0, 100]
	]);
});

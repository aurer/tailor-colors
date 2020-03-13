import ColorBlend from '../lib/ColorBlend';

it('exists', () => {
	let colors = ColorBlend.colorsBetween('#0380D2', '#FFFFFF', 3);
	expect(colors).toEqual(["0380D2", "42A0DD", "81C0E8", "C0E0F3", "FFFFFF"]);
})
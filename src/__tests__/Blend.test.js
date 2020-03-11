import { Blend, GenerateGroupColors, Lighten, Darken } from '../lib/Blend';

it('blends to white as hex', () => {
	let colors = Blend('0380D2', 'FFFFFF', 3);
	expect(colors.hex()).toEqual(["0380d2", "42a0dd", "81c0e8", "c0e0f3", "ffffff"]);
})

it('blends to black as hex', () => {
	let colors = Blend('0380D2', '000000', 3);
	expect(colors.hex()).toEqual(["0380d2", "02609e", "01406a", "002036", "000000"]);
})

it('blends to white as rgb', () => {
	let colors = Blend('0380D2', 'FFFFFF', 3);
	expect(colors.rgb()).toEqual(["(3,128,210)", "(66,160,221)", "(129,192,232)", "(192,224,243)", "(255,255,255)"]);
})

it('blends to black as rgb', () => {
	let colors = Blend('0380D2', '000000', 3);
	expect(colors.rgb()).toEqual(["(3,128,210)", "(2,96,158)", "(1,64,106)", "(0,32,54)", "(0,0,0)"]);
})

it('can lighten varying amounts', () => {
	expect(Lighten('0380D2', 1)).toBe('57aae1');
	expect(Lighten('0380D2', 2)).toBe('42a0dd');
	expect(Lighten('0380D2', 3)).toBe('3599db');
	expect(Lighten('0380D2', 4)).toBe('2d95da');
	expect(Lighten('0380D2', 5)).toBe('2792d8');
	expect(Lighten('0380D2', 6)).toBe('2390d8');
})

it('can darken varying amounts', () => {
	expect(Darken('0380D2', 1)).toBe('02558c');
	expect(Darken('0380D2', 2)).toBe('02609e');
	expect(Darken('0380D2', 3)).toBe('0266a8');
	expect(Darken('0380D2', 4)).toBe('036baf');
	expect(Darken('0380D2', 5)).toBe('036eb4');
	expect(Darken('0380D2', 6)).toBe('0370b8');
})
import * as util from '../lib/Utilities';

it('returns name with empty suffix', () => {
	let name = util.nameWithSuffix('primary', '');
	expect(name).toBe('color-primary');
})

it('returns name with no suffix arg', () => {
	let name = util.nameWithSuffix('primary');
	expect(name).toBe('color-primary');
})

it('returns name with null suffix arg', () => {
	let name = util.nameWithSuffix('primary', null);
	expect(name).toBe('color-primary');
})

it('returns valid name with suffix', () => {
	let name = util.nameWithSuffix('primary', 'light');
	expect(name).toBe('color-primary-light');
})

it('generates 36 character ID', () => {
	let name = util.uuid();
	expect(name.length).toBe(36);
})
export const uuid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const colorName = function(groupName, color) {
	let name = 'color-' + groupName;
	name += color.suffix.length ? '-' + color.suffix : '';
	return name;
};

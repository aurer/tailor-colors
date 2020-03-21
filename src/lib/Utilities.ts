export const uuid = function(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const nameWithSuffix = function(name: string, suffix?: string | null): string {
	let result = `color-${name}`;
	if (suffix && suffix.length > 0) {
		result += `-${suffix}`;
	}
	return result;
};

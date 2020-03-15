export default class NumberWang {
	static fillBlanks(array) {
		if (array[0] === null) {
			array[0] = 0;
		}

		if (array[array.length - 1] === null) {
			array[array.length - 1] = array.length - 1;
		}

		let output = [];
		array.forEach((element, index) => {
			if (element === null) {
				let prev = output[index - 1];
				let seek = this.getNextNonNullValue(array, index);
				element = prev + this.intervalBetween(prev, seek.value, seek.skipped);
			}
			output[index] = element;
		});

		return output;
	}

	static getNextNonNullValue(array, startIndex) {
		let seekIndex = 1;
		let seekCount = 0;
		let seekValue = null;

		while (seekValue === null) {
			seekValue = array[startIndex + seekIndex++];
			seekCount++;
		}

		return {
			value: seekValue,
			index: startIndex + seekIndex,
			skipped: seekCount
		};
	}

	static numbersBetween(start, end, steps) {
		let values = [];
		let interval = this.intervalBetween(start, end, steps);
		for (let i = 0; i < steps; i++) {
			let newValue = start + interval + interval * i;
			values.push(newValue);
		}
		return values;
	}

	static numbersBetweenInclusive(start, end, steps) {
		let values = this.numbersBetween(start, end, steps);
		values.unshift(start);
		values.push(end);
		return values;
	}

	static intervalBetween(start, end, steps) {
		return (end - start) / (steps + 1);
	}
}

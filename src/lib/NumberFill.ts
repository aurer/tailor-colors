interface FoundNumber {
	value: number;
	index: number;
	skipped: number;
}

export default class NumberWang {
	static fillBlanks(array: number[]) {
		if (array[0] === null) {
			array[0] = 0;
		}

		if (array[array.length - 1] === null) {
			array[array.length - 1] = array.length - 1;
		}

		let output: number[] = [];
		array.forEach((element: number, index: number) => {
			if (element === null) {
				let prev: number = output[index - 1];
				let seek: FoundNumber = this.getNextNonNullValue(array, index);
				element = prev + this.intervalBetween(prev, seek.value, seek.skipped);
			}
			output[index] = element;
		});

		return output;
	}

	static getNextNonNullValue(array: number[], startIndex: number) {
		let seekIndex: number = 1;
		let seekCount: number = 0;
		let seekValue: number = null;

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

	static numbersBetween(start: number, end: number, steps: number) {
		let values: number[] = [];
		let interval: number = this.intervalBetween(start, end, steps);
		for (let i = 0; i < steps; i++) {
			let newValue: number = start + interval + interval * i;
			values.push(newValue);
		}
		return values;
	}

	static numbersBetweenInclusive(start: number, end: number, steps: number) {
		let values: number[] = this.numbersBetween(start, end, steps);
		values.unshift(start);
		values.push(end);
		return values;
	}

	static intervalBetween(start: number, end: number, steps: number) {
		return (end - start) / (steps + 1);
	}
}

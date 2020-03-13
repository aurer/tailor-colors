export default class NumberWang {
	static fill(input) {
		if (input[0] === null) {
			input[0] = 0;
		}

		if (input[input.length-1] === null) {
			input[input.length-1] = input.length-1;
		}

		let output = [];
		input.forEach((element, index) => {
			if (element === null) {
				let prev = output[index-1];
				let seek = this.getNextNonNullValue(input, index);
				element = prev + this.intervalBetween(prev, seek.value, seek.skipped);
			}
			output[index] = element;
		});

		return output;
	}

	static getNextNonNullValue(array, index) {
		let seekIndex = 1;
		let seekCount = 0;
		let seekValue = null;

		while(seekValue === null) {
			seekValue = array[index + seekIndex++];
			seekCount++;
		}

		return {
			value: seekValue,
			index: index + seekIndex,
			skipped: seekCount 
		};
	}

	static numbersBetween(start, end, count) {
		let values = [];
		let interval = this.intervalBetween(start, end, count);
		for(let i = 0; i < count; i++) {
			let newValue = start + interval + (interval * i);
			values.push(newValue);
		}
		return values;
	}

	static numbersBetweenInclusive(start, end, count) {
		let values = this.numbersBetween(start, end, count);
		values.unshift(start);
		values.push(end);
		return values;
	}

	static intervalBetween(start, end, count) {
		return (end - start) / (count + 1);
	}
}
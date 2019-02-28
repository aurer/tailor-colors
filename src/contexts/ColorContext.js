import React from 'react';
import { uuid } from '../lib/Utilities';
import Blend from '../lib/Blend';

export const ColorContext = React.createContext();

class Group {
	constructor(name) {
		this.id = uuid();
		this.name = name;
		this.colors = [
			{ suffix: 'lighter', value: 'CCCCCC', auto: true },
			{ suffix: 'light', value: '999999', auto: true },
			{ suffix: '', value: '666666', auto: false },
			{ suffix: 'dark', value: '444444', auto: true },
			{ suffix: 'darker', value: '222222', auto: true }
		];
		return this;
	}
}

export const setGroupNames = ['neutral', 'primary', 'secondary', 'tertiary', 'quaternary'];

export class ColorProvider extends React.Component {
	state = {
		groups: [new Group(setGroupNames[0])],
		addGroup: this.addGroup.bind(this),
		removeGroup: this.removeGroup.bind(this),
		updateColor: this.updateColor.bind(this)
	};

	addGroup() {
		let groupName = setGroupNames[this.state.groups.length];
		let newGroup = new Group(groupName);
		let groups = this.state.groups;
		groups.push(newGroup);
		this.setState({
			groups
		});
	}

	removeGroup(id) {
		let groups = this.state.groups;
		groups = groups.filter(group => group.id !== id);
		this.setState({ groups });
	}

	updateColor(groupId, colorSuffix, newValue) {
		let groups = this.state.groups;

		groups.forEach(group => {
			if (group.id === groupId) {
				group.colors.forEach(color => {
					if (color.suffix === colorSuffix) {
						color.value = newValue;
					}
				});
				this._generateColors(group);
			}
		});

		this.setState({ groups });
	}

	_generateColors(group) {
		let setColors = [];
		setColors.push(
			...Blend('FFFFFF', group.colors[2].value, 2)
				.hex()
				.slice(1, -1)
		);
		setColors.push(group.colors[2].value);
		setColors.push(
			...Blend(group.colors[2].value, '000000', 2)
				.hex()
				.slice(1, -1)
		);

		group.colors.forEach((color, i) => {
			if (color.auto) {
				let prev = group.colors[i - 1];
				let next = group.colors[i + 1];

				// First
				if (!prev && !next.auto) {
					return (color.value = Blend('FFFFFF', next.value, 1).hex()[1]);
				}

				// Last
				if (!next && !prev.auto) {
					return (color.value = Blend('FFFFFF', prev.value, 1).hex()[1]);
				}

				color.value = color.auto ? setColors[i] : color.value;
			}
		});
	}

	render() {
		return <ColorContext.Provider value={this.state}>{this.props.children}</ColorContext.Provider>;
	}
}

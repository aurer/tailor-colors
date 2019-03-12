import React from 'react';
import { uuid } from '../lib/Utilities';
import Blend from '../lib/Blend';

export const ColorContext = React.createContext();

class Group {
	constructor(name) {
		this.id = uuid();
		this.name = name;
		this.colors = [
			{ suffix: 'lighter', value: 'd5d5d5', auto: true },
			{ suffix: 'light', value: 'ababab', auto: true },
			{ suffix: '', value: '818181', auto: false },
			{ suffix: 'dark', value: '575757', auto: true },
			{ suffix: 'darker', value: '2d2d2d', auto: true }
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
		renameGroup: this.renameGroup.bind(this),
		updateColor: this.updateColor.bind(this),
		updateMode: this.updateMode.bind(this)
	};

	addGroup() {
		let groupName = this.nextGroupName();
		let existingNames = this.state.groups.filter(group => group.name === groupName);
		if (existingNames.length) {
			groupName = this.nextGroupName(1);
		}
		let newGroup = new Group(groupName);
		let groups = this.state.groups;
		groups.push(newGroup);
		this.setState({
			groups
		});
	}

	nextGroupName(more = 0) {
		let current = this.state.groups.length + more;
		if (current < setGroupNames.length) {
			return setGroupNames[current];
		}
		return 'Group' + (current + 1);
	}

	removeGroup(id) {
		let groups = this.state.groups;
		groups = groups.filter(group => group.id !== id);
		this.setState({ groups });
	}

	renameGroup(name, newName) {
		let groups = this.state.groups.map(group => {
			if (group.name === name) {
				group.name = newName
					.trim()
					.toLowerCase()
					.replace(' ', '-')
					.replace(/\W/, '');
			}
			return group;
		});
		this.setState({ groups });
	}

	updateColor(groupId, colorSuffix, newValue) {
		let groups = this.state.groups;

		groups.forEach(group => {
			if (group.id === groupId) {
				group.colors.forEach(color => {
					if (color.suffix === colorSuffix) {
						color.value = newValue;
						color.auto = false;
					}
				});
				this._generateColors(group);
			}
		});

		this.setState({ groups });
	}

	updateMode(groupId, colorSuffix, checked) {
		let groups = this.state.groups;

		groups.forEach(group => {
			if (group.id === groupId) {
				group.colors.forEach(color => {
					if (color.suffix === colorSuffix) {
						color.auto = checked;
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

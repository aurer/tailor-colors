import React from 'react';
import { uuid } from '../lib/Utilities';
import { GenerateGroupColors, Lighten, Darken } from '../lib/Blend';

export const ColorContext = React.createContext();

class Group {
	constructor(name) {
		let colorValues = GenerateGroupColors('344449', 3);
		this.id = uuid();
		this.name = name;
		this.fadeValue = 3;
		this.colors = [
			{ suffix: 'lighter', value: colorValues[0], auto: true },
			{ suffix: 'light', value: colorValues[1], auto: true },
			{ suffix: '', value: colorValues[2], auto: false },
			{ suffix: 'dark', value: colorValues[3], auto: true },
			{ suffix: 'darker', value: colorValues[4], auto: true }
		];

		return this;
	}
}

export const setGroupNames = ['neutral', 'primary', 'secondary', 'tertiary', 'quaternary'];

export class ColorProvider extends React.Component {
	state = {
		groups: [new Group(setGroupNames[0])],
		addGroup: this.addGroup.bind(this),
		removeLast: this.removeLast.bind(this),
		removeGroup: this.removeGroup.bind(this),
		renameGroup: this.renameGroup.bind(this),
		updateColor: this.updateColor.bind(this),
		updateMode: this.updateMode.bind(this),
		updateRange: this.updateRange.bind(this)
	};

	addGroup() {
		console.log('Add group');
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

	removeLast() {
		console.log('Remove group');
		let groups = this.state.groups;
		groups.pop();
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

	updateRange(groupId, value) {
		let groups = this.state.groups.map(group => {
			if (group.id === groupId) {
				group.fadeValue = value;
			}
			this._generateColors(group);
			return group;
		});

		this.setState({ groups });
	}

	_generateColors(group) {
		let setColors = GenerateGroupColors(group.colors[2].value, group.fadeValue);

		group.colors.forEach((color, i) => {
			if (color.auto) {
				let prev = group.colors[i - 1];
				let next = group.colors[i + 1];

				// First
				if (!prev && !next.auto) {
					return (color.value = Lighten(next.value, group.fadeValue));
				}

				// Last
				if (!next && !prev.auto) {
					return (color.value = Darken(prev.value, group.fadeValue));
				}

				color.value = color.auto ? setColors[i] : color.value;
			}
		});
	}

	render() {
		return <ColorContext.Provider value={this.state}>{this.props.children}</ColorContext.Provider>;
	}
}

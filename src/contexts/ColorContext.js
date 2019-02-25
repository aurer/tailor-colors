import React from 'react';

export const ColorContext = React.createContext();

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

class Group {
	constructor(name) {
		this.id = uuid();
		this.name = name;
		this.colors = [
			{ suffix: 'lighter', value: 'CEACFC', auto: true },
			{ suffix: 'light', value: '9E58F8', auto: true },
			{ suffix: '', value: '6E04F4', auto: false },
			{ suffix: 'dark', value: '4903A3', auto: true },
			{ suffix: 'darker', value: '240252', auto: true }
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
		let groups = this.state.groups.map(group => {
			if (group.id === groupId) {
				group.colors = group.colors.map(color => {
					if (color.suffix === colorSuffix) {
						color.value = newValue;
					}
					return color;
				});
			}
			return group;
		});
		this.setState({ groups });
	}

	render() {
		return <ColorContext.Provider value={this.state}>{this.props.children}</ColorContext.Provider>;
	}
}

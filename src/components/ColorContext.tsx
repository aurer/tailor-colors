import React, { Context } from 'react'
import ColorSet from '../lib/ColorSet'

export interface ColorProviderInterface {
	addGroup(): void
	removeGroup(id: string): void
	removeLast(): void
	renameGroup(name: string, newName: string): void
	updateColor(groupId: string, colorSuffix: string, newValue: string): void
	updateMode(groupId: string, colorSuffix: string, checked: boolean): void
	updateRange(groupId: string, contrastValue: number): void
}

export interface ColorContextInterface extends ColorProviderInterface {
	groups: []
}

export interface ColorObject {
	suffix: string
	value: string
	auto: boolean
}

export const presetGroupNames = [
	'neutral',
	'primary',
	'secondary',
	'tertiary',
	'quaternary',
	'quinary',
]

export const getGroupName = (count: number): string => {
	return presetGroupNames[count] || `Group ${count}`
}

const colorContextDefault: ColorContextInterface = {
	groups: [],
	addGroup: () => {},
	removeGroup: () => {},
	removeLast: () => {},
	renameGroup: () => {},
	updateColor: () => {},
	updateMode: () => {},
	updateRange: () => {},
}

export const ColorContext: Context<any> = React.createContext(colorContextDefault)

export class ColorProvider extends React.Component implements ColorProviderInterface {
	addGroup = () => {
		let groupName = getGroupName(this.state.groups.length)
		let existingNames = this.state.groups.filter((group) => group.name === groupName)
		if (existingNames.length) {
			groupName = getGroupName(this.state.groups.length + 1)
		}

		let newGroups = this.state.groups
		let newGroup = new ColorSet(groupName)
		newGroups.push(newGroup)

		this.setState({ groups: [...newGroups] })
		gtag('event', 'add_color_group', {
			event_category: 'interaction',
			event_label: groupName,
		})
	}

	removeGroup = (id: string) => {
		let removed = this.state.groups.find((group) => group.id === id)
		let groups = this.state.groups.filter((group) => group.id !== id)
		this.setState({ groups })
		gtag('event', 'remove_color_group', {
			event_category: 'interaction',
			event_label: removed?.name,
		})
	}

	removeLast = () => {
		let groups = this.state.groups
		groups.pop()
		this.setState({ groups })
	}

	renameGroup = (groupId: String, newName: string) => {
		let previousName
		let groups = this.state.groups.map((group) => {
			if (group.id === groupId) {
				previousName = group.name
				group.name = newName.trim().toLowerCase().replace(' ', '-').replace(/\W/, '')
			}
			return group
		})
		this.setState({ groups })
		gtag('event', 'rename_color_group', {
			event_category: 'interaction',
			event_label: `${previousName} > ${newName}`,
		})
	}

	updateColor = (groupId: string, colorSuffix: string, newValue: string) => {
		let groups = this.state.groups

		groups.forEach((group) => {
			if (group.id === groupId) {
				group.updateColor(colorSuffix, newValue, false)
				group.updateColors()
			}
		})

		this.setState({ groups })
	}

	updateMode = (groupId: string, colorSuffix: string, checked: boolean) => {
		let groups = this.state.groups

		groups.forEach((group) => {
			if (group.id === groupId) {
				group.colors.forEach((color) => {
					if (color.suffix === colorSuffix) {
						color.auto = checked
					}
				})
				group.updateColors()
			}
		})

		this.setState({ groups })
	}

	updateRange = (groupId: string, contrastValue: number) => {
		let groups = this.state.groups.map((group) => {
			if (group.id === groupId) {
				group.contrastValue = contrastValue
				group.updateColors()
			}
			return group
		})

		this.setState({ groups })
	}

	state = {
		groups: [
			new ColorSet(getGroupName(0), '344449'),
			new ColorSet(getGroupName(1), '0380D2'),
			new ColorSet(getGroupName(2), 'F44C04'),
		],
		addGroup: this.addGroup,
		removeGroup: this.removeGroup,
		removeLast: this.removeLast,
		renameGroup: this.renameGroup,
		updateColor: this.updateColor,
		updateMode: this.updateMode,
		updateRange: this.updateRange,
	}

	render() {
		return <ColorContext.Provider value={this.state}>{this.props.children}</ColorContext.Provider>
	}
}

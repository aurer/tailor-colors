import React, { Context } from 'react'
import { uuid } from '../lib/Utilities'
import { GenerateGroupColors, Lighten, Darken } from '../lib/Blend'

export interface ColorObject {
	suffix: string
	value?: string // TODO make this non-option
	auto: boolean
}

export class Group {
	id: string
	name: string
	contrastValue: number
	colors: Array<ColorObject>

	constructor(name: string, baseColor: string = '344449') {
		let colorValues = GenerateGroupColors(baseColor, 3)
		this.id = uuid()
		this.name = name
		this.contrastValue = 3
		this.colors = [
			{ suffix: 'lighter', value: colorValues[0], auto: true },
			{ suffix: 'light', value: colorValues[1], auto: true },
			{ suffix: '', value: colorValues[2], auto: false },
			{ suffix: 'dark', value: colorValues[3], auto: true },
			{ suffix: 'darker', value: colorValues[4], auto: true },
		]
		return this
	}
}

export const ColorContext: Context<any> = React.createContext({})

export const presetGroupNames = [
	'neutral',
	'primary',
	'secondary',
	'tertiary',
	'quaternary',
	'quinary',
]

export interface ColorProviderInterface {
	addGroup(): void
	nextGroupName(more: number): void
	removeGroup(id: string): void
	removeLast(): void
	renameGroup(name: string, newName: string): void
	updateColor(groupId: string, colorSuffix: string, newValue: string): void
	updateMode(groupId: string, colorSuffix: string, checked: boolean): void
	updateRange(groupId: string, contrastValue: number): void
}

export type ColorContextProps = {
	groups: Group[]
	addGroup: () => void
	removeLast: () => void
	removeGroup: (id: string) => void
	renameGroup(name: string, newName: string): void
	updateColor(groupId: string, colorSuffix: string, newValue: string): void
	updateMode(groupId: string, colorSuffix: string, checked: boolean): void
	updateRange(groupId: string, contrastValue: number): void
}

export class ColorProvider extends React.Component implements ColorProviderInterface {
	state: ColorContextProps = {
		groups: [
			new Group(presetGroupNames[0], '344449'),
			new Group(presetGroupNames[1], '0380D2'),
			new Group(presetGroupNames[2], 'F44C04'),
		],
		addGroup: this.addGroup.bind(this),
		removeLast: this.removeLast.bind(this),
		removeGroup: this.removeGroup.bind(this),
		renameGroup: this.renameGroup.bind(this),
		updateColor: this.updateColor.bind(this),
		updateMode: this.updateMode.bind(this),
		updateRange: this.updateRange.bind(this),
	}

	addGroup() {
		let groupName = this.nextGroupName()
		let existingNames = this.state.groups.filter((group) => group.name === groupName)
		if (existingNames.length) {
			groupName = this.nextGroupName(1)
		}
		let newGroup = new Group(groupName)
		let groups = this.state.groups
		groups.push(newGroup)
		this.setState({
			groups,
		})
	}

	nextGroupName(more = 0) {
		let current = this.state.groups.length + more
		if (current < presetGroupNames.length) {
			return presetGroupNames[current]
		}
		return 'Group' + (current + 1)
	}

	removeGroup(id: string) {
		let groups = this.state.groups
		groups = groups.filter((group) => group.id !== id)
		this.setState({ groups })
	}

	removeLast() {
		let groups = this.state.groups
		groups.pop()
		this.setState({ groups })
	}

	renameGroup(groupId: String, newName: string) {
		let groups = this.state.groups.map((group) => {
			if (group.id === groupId) {
				group.name = newName.trim().toLowerCase().replace(' ', '-').replace(/\W/, '')
			}
			return group
		})
		console.log(groups)

		this.setState({ groups })
	}

	updateColor(groupId: string, colorSuffix: string, newValue: string) {
		let groups = this.state.groups

		groups.forEach((group) => {
			if (group.id === groupId) {
				group.colors.forEach((color) => {
					if (color.suffix === colorSuffix) {
						color.value = newValue
						color.auto = false
					}
				})
				this.generateColors(group)
			}
		})

		this.setState({ groups })
	}

	updateMode(groupId: string, colorSuffix: string, checked: boolean) {
		let groups = this.state.groups

		groups.forEach((group) => {
			if (group.id === groupId) {
				group.colors.forEach((color) => {
					if (color.suffix === colorSuffix) {
						color.auto = checked
					}
				})
				this.generateColors(group)
			}
		})

		this.setState({ groups })
	}

	updateRange(groupId: string, contrastValue: number) {
		let groups = this.state.groups.map((group) => {
			if (group.id === groupId) {
				group.contrastValue = contrastValue
			}
			this.generateColors(group)
			return group
		})

		this.setState({ groups })
	}

	private generateColors(group: Group) {
		let setColors = GenerateGroupColors(group.colors[2].value, group.contrastValue)

		group.colors.forEach((color: ColorObject, i: number) => {
			if (color.auto) {
				let prev = group.colors[i - 1]
				let next = group.colors[i + 1]

				// First
				if (!prev && !next.auto) {
					return (color.value = Lighten(next.value, group.contrastValue))
				}

				// Last
				if (!next && !prev.auto) {
					return (color.value = Darken(prev.value, group.contrastValue))
				}

				color.value = color.auto ? setColors[i] : color.value
			}
		})
	}

	render() {
		return <ColorContext.Provider value={this.state}>{this.props.children}</ColorContext.Provider>
	}
}

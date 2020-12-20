import React, { useState } from 'react'
import Color from './Color'
import Editable from './Editable'
import { Remove } from './Icons'
import '../styles/ColorGroup.scss'
import { ColorObject } from './ColorContext'

export interface ColorGroupProps {
	name: string
	id: string
	key: string
	colors: Array<ColorObject>
	context: any
}

const ColorGroup = (props: ColorGroupProps) => {
	const [rangeColors, setRangeColors] = useState({ dark: '#222', light: '#666' })

	const handleRename = (newValue: string) => props.context.renameGroup(props.id, newValue)

	function handleColorChange(name: string, newColor: string) {
		props.context.updateColor(props.id, name, newColor)
	}

	function handleColorChangeMode(name: string, checked: boolean) {
		props.context.updateMode(props.id, name, checked)
	}

	function handleUpdateRange(e: React.ChangeEvent<HTMLInputElement>) {
		props.context.updateRange(props.id, parseInt(e.target.value))
		updateRangeColors(e.target.value)
	}

	function updateRangeColors(rangeValue: string) {
		let colorsOne = ['111', '121212', '202020', '222', '262626', '282828', '333']
		let colorsTwo = ['bbb', '999', '888', '777', '666', '555', '444']
		let index = parseInt(rangeValue)
		setRangeColors({
			dark: `#${colorsOne[index]}`,
			light: `#${colorsTwo[index]}`,
		})
	}

	type CSSCustomProperties = {
		'--colorOne': string
		'--colorTwo': string
		backgroundColor: string
	}

	let rangeStyle: CSSCustomProperties = {
		backgroundColor: rangeColors.dark,
		'--colorOne': rangeColors.dark,
		'--colorTwo': rangeColors.light,
	}

	return (
		<div className="ColorGroup">
			<h2 className="ColorGroup-title">
				<Editable onChange={handleRename} initialValue={props.name} />
			</h2>
			<div className="ColorGroup-colors">
				{props.colors.map((color: ColorObject, i: number) => (
					<Color
						key={color.suffix + i}
						group={props.name}
						color={color}
						pos={i}
						onChange={handleColorChange}
						onChangeMode={handleColorChangeMode}
					>
						{i === 2 && (
							<div className="Color-range">
								<input
									style={rangeStyle}
									type="range"
									min="0"
									max="6"
									defaultValue="3"
									title="Contrast adjustment"
									onChange={handleUpdateRange}
								/>
							</div>
						)}
					</Color>
				))}
			</div>
			<button
				className="ColorGroup-remove"
				title="Remove Hue"
				onClick={() => props.context.removeGroup(props.id)}
			>
				<Remove />
			</button>
		</div>
	)
}

export default ColorGroup

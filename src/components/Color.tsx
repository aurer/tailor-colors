import React, { ChangeEvent, CSSProperties } from 'react'
import { nameWithSuffix, cleanHex } from '../lib/Utilities'
import '../styles/Color.scss'
import { ColorObject } from './ColorContext'
import { Undo } from './Icons'

export interface ColorProps {
	children: React.ReactNode
	key: string
	group: string
	color: ColorObject
	pos: number
	onChange(name: string, newColor: string): void
	onChangeMode(name: string, checked: boolean): void
}

const Color = (props: ColorProps) => {
	function handleColorInputChange(e: ChangeEvent<HTMLInputElement>) {
		let value = sanitiseHexColor(e.target.value)
		props.onChange(props.color.suffix, value)
	}

	function handleColorInputPaste(e: any) {
		const data = e.clipboardData.getData('text')
		if (data.length) {
			e.stopPropagation()
			e.preventDefault()
			let value = cleanHex(data)
			props.onChange(props.color.suffix, value)
		}
	}

	function handleUnlock(): void {
		props.onChangeMode(props.color.suffix, !props.color.auto)
	}

	function sanitiseHexColor(color: string) {
		return color.replace('#', '').slice(0, 6)
	}

	let name: string = nameWithSuffix(props.group, props.color.suffix)
	let color: string = '#' + cleanHex(sanitiseHexColor(props.color.value))
	let style: CSSProperties = { backgroundColor: color }
	let className: string = 'Color'
	let master: boolean = false
	let auto: boolean = props.color.auto

	if (props.pos === 2) {
		master = true
		className += ' Color--master'
	}

	if (props.color.auto) {
		className += ' Color--auto'
	}

	return (
		<div className={className}>
			<div className="Color-swatch">
				<input type="color" name={name} id={name} value={color} onChange={handleColorInputChange} />
				<label htmlFor={name} style={style}>
					<span>{name}</span>
				</label>
			</div>
			<div className="Color-settings">
				<div className="Color-format">#</div>
				<input
					type="text"
					value={props.color.value}
					onChange={handleColorInputChange}
					onPaste={handleColorInputPaste}
				/>
				{!master && !auto && (
					<button className="Color-reset" title="Reset color" onClick={handleUnlock}>
						<Undo />
					</button>
				)}
				{props.children}
			</div>
		</div>
	)
}

export default Color

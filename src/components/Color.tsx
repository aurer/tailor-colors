import React, { ChangeEvent, CSSProperties, useEffect } from 'react'
import { nameWithSuffix } from '../lib/Utilities'
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
	useEffect(() => {}, [props.color.value])

	function handleColorInputChange(e: ChangeEvent<HTMLInputElement>) {
		let value = sanitiseHexColor(e.target.value)
		props.onChange(props.color.suffix, value)
	}

	function handleUnlock(): void {
		props.onChangeMode(props.color.suffix, !props.color.auto)
	}

	// TODO: replace 'any' type with sensible type
	function sanitiseHexColor(color: any) {
		return color.replace('#', '').slice(0, 6)
	}

	let name: string = nameWithSuffix(props.group, props.color.suffix)
	let color: string = '#' + sanitiseHexColor(props.color.value)
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
				<input type="text" value={props.color.value} onChange={handleColorInputChange} />
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

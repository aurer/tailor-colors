import { uuid } from './Utilities'
import { gradientFrom, lighten, darken } from './ColorBlend'
import { ColorObject } from '../components/ColorContext'

class ColorSet {
	id: string
	name: string
	baseColor: string
	contrastValue: number
	colors: Array<ColorObject>

	constructor(name: string, baseColor: string = '344449', contrastValue: number = 3) {
		let colorValues = gradientFrom(baseColor, 2 + contrastValue, 5).asHex()
		this.id = uuid()
		this.name = name
		this.baseColor = baseColor
		this.contrastValue = contrastValue
		this.colors = [
			{ suffix: 'lighter', value: colorValues[0], auto: true },
			{ suffix: 'light', value: colorValues[1], auto: true },
			{ suffix: '', value: colorValues[2], auto: false },
			{ suffix: 'dark', value: colorValues[3], auto: true },
			{ suffix: 'darker', value: colorValues[4], auto: true },
		]
		return this
	}

	updateColor(suffix: string, value: string, auto: boolean) {
		let updatedColors = this.colors.map((color) => {
			if (color.suffix === suffix) {
				color.value = value
				color.auto = auto

				if (suffix === '') {
					this.baseColor = value
				}
			}
			return color
		})

		this.colors = updatedColors
	}

	updateColors() {
		const setColors = gradientFrom(this.baseColor, 2 + this.contrastValue, 5).asHex()
		let updatedColors = this.colors.map(
			(color, i): ColorObject => {
				if (color.auto) {
					let prev = this.colors[i - 1]
					let next = this.colors[i + 1]

					// First
					if (!prev && !next.auto) {
						color.value = lighten(next.value, 1 + this.contrastValue).toHex()
					}

					// Last
					if (!next && !prev.auto) {
						color.value = darken(prev.value, 1 + this.contrastValue).toHex()
					}

					color.value = color.auto ? setColors[i] : color.value
				}

				return color
			}
		)
		this.colors = updatedColors
	}
}

export default ColorSet

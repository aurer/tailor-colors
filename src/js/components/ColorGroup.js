import ColorInput from './ColorInput.js';
import Gradient from '../lib/gradient.js';

class ColorGroup extends React.Component {
	constructor(props) {
		super(props);
		const title = props.group.title;
		const name = title.toLowerCase();
		const colors = [
			{ name: `${name}-lighter`, value: '#eeeeee', override: false },
			{ name: `${name}-light`, value: '#bbbbbb', override: false },
			{ name: `${name}`, value: '#888888', override: true },
			{ name: `${name}-dark`, value: '#555555', override: false },
			{ name: `${name}-darker`, value: '#222222', override: false }
		];
		this.state = { title, colors };
		this.props.onupdate(props.group.title, colors);
	}

	render() {
		let { title, colors } = this.state;
		let colorGroupCode = colors
			.slice()
			.sort(c => c.name.indexOf('-'))
			.map((color, index) => `$color-${color.name}: ${color.value};\n`);
		return (
			<div className="ColorGroup">
				<div className="ColorGroup-colors">
					{colors.map((color, index) => (
						<ColorInput
							key={color.name}
							onColorChange={this.handleColorChange.bind(this)}
							onOverrideChange={this.handleOverrideChange.bind(this)}
							index={index}
							color={color}
						/>
					))}
				</div>
				<div className="ColorGroup-code">
					<textarea rows="5" defaultValue={colorGroupCode} />
				</div>
			</div>
		);
	}

	handleOverrideChange(color, index) {
		let colors = this.state.colors;
		colors[index].override = color.override;
		this.setState({ colors });
	}

	handleColorChange(color, index) {
		let changeIndex = 0;
		let colors = this.state.colors.map((c, i) => {
			if (c.name == color.name) {
				c.value = color.value;
				c.override = true;
				changeIndex = i;
			}
			return c;
		});

		let newColors;
		let lights = Gradient(colors[2].value, '#ffffff', 2)
			.hex()
			.slice(1, 3);
		let darks = Gradient(colors[2].value, '#000000', 2)
			.hex()
			.slice(1, 3);
		let lighter = lights[0];
		let lightest = lights[1];
		let darker = darks[0];
		let darkest = darks[1];

		if (colors[0].override) {
			lightest = colors[0].value;
		}
		if (colors[1].override) {
			lighter = colors[1].value;
		}
		if (colors[3].override) {
			darker = colors[3].value;
		}
		if (colors[4].override) {
			darkest = colors[4].value;
		}

		switch (changeIndex) {
			case 0:
				if (!colors[1].override) {
					let lightColors = Gradient(colors[0].value, colors[2].value, 1).hex();
					colors[1].value = lightColors[1];
				}
				break;
			case 2:
				if (!colors[0].override) colors[0].value = lightest;
				if (!colors[1].override) colors[1].value = lighter;
				if (!colors[3].override) colors[3].value = darker;
				if (!colors[4].override) colors[4].value = darkest;
				break;
			case 4:
				if (!colors[3].override) {
					let darkColors = Gradient(colors[2].value, colors[4].value, 1).hex();
					colors[3].value = darkColors[1];
				}
				break;
		}

		this.setState({ colors });
		this.props.onupdate(this.props.group.title, colors);
	}
}

export default ColorGroup;

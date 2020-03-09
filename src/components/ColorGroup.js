import React from 'react';
import Color from './Color';
import Editable from './Editable';
import '../styles/ColorGroup.scss';

class ColorGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rangeColorOne: '#222',
			rangeColorTwo: '#666'
		}
	}

	handleColorChange(name, newColor) {
		this.props.context.updateColor(this.props.id, name, newColor);
	}

	handleColorChangeMode(name, checked) {
		this.props.context.updateMode(this.props.id, name, checked);
	}

	handleUpdateRange(e) {
		this.props.context.updateRange(this.props.id, parseInt(e.target.value));
		this.setRangeColors(e.target.value)
	}

	setRangeColors(contrastValue) {
		let colorsOne = ['111', '121212', '202020', '222', '262626', '282828', '333'];
		let colorsTwo = ['bbb', '999', '888', '777', '666', '555', '444'];
		this.setState({
			rangeColorOne: '#' + colorsOne[contrastValue],
			rangeColorTwo: '#' + colorsTwo[contrastValue]
		})
	}

	handleRename(name, newName) {
		this.props.context.renameGroup(name, newName);
	}

	render() {
		let rangeStyle = {
			'--colorOne': this.state.rangeColorOne,
			'--colorTwo': this.state.rangeColorTwo
		}

		return (
			<div className="ColorGroup">
				<h2 className="ColorGroup-title">
					<Editable onChange={this.handleRename.bind(this, this.props.name)} value={this.props.name} />
				</h2>
				<div className="ColorGroup-colors">
					{this.props.colors.map((color, i) => (
						<Color
							key={color.suffix + i}
							group={this.props.name}
							color={color}
							pos={i}
							onChange={this.handleColorChange.bind(this)}
							onChangeMode={this.handleColorChangeMode.bind(this)}
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
										onChange={this.handleUpdateRange.bind(this)}
									/>
								</div>
							)}
						</Color>
					))}
				</div>
			</div>
		);
	}
}

export default ColorGroup;

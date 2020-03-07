import React from 'react';
import Color from './Color';
import Editable from './Editable';
import '../styles/ColorGroup.scss';

class ColorGroup extends React.Component {
	handleColorChange(name, newColor) {
		this.props.context.updateColor(this.props.id, name, newColor);
	}

	handleColorChangeMode(name, checked) {
		this.props.context.updateMode(this.props.id, name, checked);
	}

	handleUpdateRange(e) {
		this.props.context.updateRange(this.props.id, parseInt(e.target.value));
	}

	handleRename() {

	}

	render() {
		return (
			<div className="ColorGroup">
				<h2 className="ColorGroup-title">
				<Editable onChange={this.handleRename.bind(this, this.props.name)}>{this.props.name}</Editable>
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

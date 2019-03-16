import React from 'react';
import Color from './Color';
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

	render() {
		return (
			<div className="ColorGroup">
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
		);
	}
}

export default ColorGroup;

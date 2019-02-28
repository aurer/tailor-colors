import React from 'react';
import Color from './Color';
import '../styles/ColorGroup.css';

class ColorGroup extends React.Component {
	handleColorChange(name, newColor) {
		this.props.context.updateColor(this.props.id, name, newColor);
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
					/>
				))}
			</div>
		);
	}
}

export default ColorGroup;

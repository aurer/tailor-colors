import React from 'react';
import Color from './Color';
import './ColorGroup.css';

class ColorGroup extends React.Component {
	handleColorChange(name, newColor) {
		this.props.context.updateColor(this.props.id, name, newColor);
	}

	render() {
		return (
			<div className="ColorGroup">
				{this.props.colors.map(color => (
					<Color
						key={color.suffix}
						group={this.props.name}
						color={color}
						onChange={this.handleColorChange.bind(this)}
					/>
				))}
			</div>
		);
	}
}

export default ColorGroup;

import React from 'react';
import './Color.css';

class Color extends React.Component {
	handleChange(e) {
		let value = this.sanitiseHexColor(e.target.value);
		this.props.onChange(this.props.color.suffix, value);
	}

	sanitiseHexColor(color) {
		return color.replace('#', '').slice(0, 6);
	}

	render() {
		let name = this.props.color.suffix === '' ? this.props.group : `${this.props.group}-${this.props.color.suffix}`;
		let color = '#' + this.sanitiseHexColor(this.props.color.value);
		let style = { backgroundColor: color };
		let disabled = this.props.color.auto ? 'disabled' : '';
		let className = this.props.color.auto ? 'Color is-disabled' : 'Color ';
		return (
			<div className={className}>
				<div className="Color-swatch">
					<input
						type="color"
						name={name}
						id={name}
						defaultValue={color}
						onChange={this.handleChange.bind(this)}
						disabled={disabled}
					/>
					<label htmlFor={name} style={style}>
						<span>{name}</span>
					</label>
				</div>
				<div className="Color-settings">
					<div className="Color-format">#</div>
					<input type="text" value={this.props.color.value} onChange={this.handleChange.bind(this)} />
				</div>
			</div>
		);
	}
}

export default Color;

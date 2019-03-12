import React from 'react';
import { colorName } from '../lib/Utilities';
import '../styles/Color.scss';

class Color extends React.Component {
	componentWillReceiveProps(props) {
		this.setState({
			value: props.color.value
		});
	}

	handleChange(e) {
		let value = this.sanitiseHexColor(e.target.value);
		this.props.onChange(this.props.color.suffix, value);
	}

	handleChangeMode(e) {
		this.props.onChangeMode(this.props.color.suffix, e.target.checked);
	}

	sanitiseHexColor(color) {
		return color.replace('#', '').slice(0, 6);
	}

	render() {
		let name = colorName(this.props.group, this.props.color);
		let color = '#' + this.sanitiseHexColor(this.props.color.value);
		let style = { backgroundColor: color };
		let className = 'Color';
		let master = false;

		if (this.props.pos === 2) {
			master = true;
			className += ' Color--master';
		}

		return (
			<div className={className}>
				<div className="Color-swatch">
					<input type="color" name={name} id={name} value={color} onChange={this.handleChange.bind(this)} />
					<label htmlFor={name} style={style}>
						<span>{name}</span>
					</label>
				</div>
				<div className="Color-settings">
					<div className="Color-format">#</div>
					<input type="text" value={this.props.color.value} onChange={this.handleChange.bind(this)} />
					{master || (
						<input type="checkbox" checked={this.props.color.auto} onChange={this.handleChangeMode.bind(this)} />
					)}
				</div>
			</div>
		);
	}
}

export default Color;

import React from 'react';
import { nameWithSuffix } from '../lib/Utilities';
import '../styles/Color.scss';
import { Undo } from './Icons';

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

	handleUnlock() {
		this.props.onChangeMode(this.props.color.suffix, !this.props.color.auto);
	}

	sanitiseHexColor(color) {
		return color.replace('#', '').slice(0, 6);
	}

	render() {
		let name = nameWithSuffix(this.props.group, this.props.color.suffix);
		let color = '#' + this.sanitiseHexColor(this.props.color.value);
		let style = { backgroundColor: color };
		let className = 'Color';
		let master = false;
		let auto = this.props.color.auto;

		if (this.props.pos === 2) {
			master = true;
			className += ' Color--master';
		}

		if (this.props.color.auto) {
			className += ' Color--auto';
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
					{!master && !auto && (
						<button className="Color-reset" title="Reset color" onClick={this.handleUnlock.bind(this)}>
							<Undo className="Color-lock" />
						</button>
					)}
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Color;

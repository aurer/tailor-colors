import React from 'react';
import { Edit } from './Icons';
import '../styles/Editable.scss';

class Editable extends React.Component {
	handleDoubleClick(e) {
		let element = e.target;
		element.getAttribute('contenteditable') !== 'true'
			? enableEditing(this.refs.input, this.handleInput.bind(this))
			: disableEditing(this.refs.input);
	}

	handleClickEditIcon(e) {
		enableEditing(this.refs.input, this.handleInput.bind(this));
	}

	handleInput(e) {
		let element = e.target;
		if (e.key === 'Enter') {
			element.originalContent = element.innerText;
			if (this.props.onChange) {
				this.props.onChange(element.innerText);
			}
			disableEditing(e.target, this.handleInput);
		}
	}

	render() {
		let { value, ...props } = this.props;

		return (
			<div className="Editable" {...props}>
				<span className="Editable-input" ref="input">
					{this.props.value}
				</span>
				<button className="Editable-button" onClick={this.handleClickEditIcon.bind(this)}>
					<Edit />
				</button>
			</div>
		);
	}
}

function disableEditing(element, handler) {
	element.setAttribute('contenteditable', false);
	element.removeEventListener('keyup', null);
	element.addEventListener('blur', null);
	element.innerText = element.originalContent;
	window.getSelection().removeAllRanges();
}

function enableEditing(element, handler) {
	element.originalContent = element.innerText;
	element.setAttribute('contenteditable', true);
	element.focus();
	window.getSelection().selectAllChildren(element);
	element.addEventListener('keyup', e => {
		if (e.key === 'Escape') {
			disableEditing(e.target);
		}
	});
	element.addEventListener('keydown', handler);
	element.addEventListener('blur', e => {
		disableEditing(e.target);
	});
}

export default Editable;

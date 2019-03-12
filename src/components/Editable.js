import React from 'react';

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

class Editable extends React.Component {
	handleDoubleClick(e) {
		let element = e.target;
		element.getAttribute('contenteditable') !== 'true'
			? enableEditing(element, this.handleInput.bind(this))
			: disableEditing(element);
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
		let { tagName, ...props } = this.props;
		return React.createElement(
			tagName || 'div',
			{
				...props,
				onDoubleClick: this.handleDoubleClick.bind(this)
			},
			this.props.children
		);
	}
}

export default Editable;

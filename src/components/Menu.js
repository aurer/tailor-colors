import React from 'react';
import { ColorContext } from '../contexts/ColorContext';
import './Menu.css';

function enableEditing(element, handler) {
	element.setAttribute('contenteditable', true);
	element.focus();
	element.addEventListener('keydown', handler);
	element.addEventListener('blur', () => {
		disableEditing(element, handler);
	});
}

function disableEditing(element, handler) {
	element.setAttribute('contenteditable', false);
	element.removeEventListener('keyup', handler);
	element.removeEventListener('blur', handler);
}

class Menu extends React.Component {
	handleDoubleClick(e, id) {
		if (e.target.contentEditable === 'true') {
			disableEditing(e.target, this.handleRenaming);
		} else {
			enableEditing(e.target, this.handleRenaming);
		}
	}

	handleRenaming(e) {
		console.log(e);
		if (e.key === 'Enter' || e.key === 'Escape') {
			e.preventDefault();
			disableEditing(e.target, this);
		}
	}

	render() {
		return (
			<div className="App-menu">
				<div className="Menu">
					<ColorContext.Consumer>
						{context => (
							<div className="Menu-item">
								<span className="Menu-title">Color groups</span>
								<button onClick={context.addGroup}>+</button>
								<div className="Menu">
									{context.groups.map(group => (
										<div className="Menu-item" key={group.id}>
											<span className="Menu-title" onDoubleClick={e => this.handleDoubleClick(e, group.id)}>
												{group.name}
											</span>
											<button onClick={context.removeGroup.bind(this, group.id)}>-</button>
										</div>
									))}
								</div>
							</div>
						)}
					</ColorContext.Consumer>
				</div>
			</div>
		);
	}
}

export default Menu;

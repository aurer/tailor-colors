import React from 'react';
import { ColorContext } from './ColorContext';
import '../styles/Menu.scss';
import Output from './Output';

class Menu extends React.Component {
	static contextType = ColorContext;

	handleRename(name, newName) {
		this.context.renameGroup(name, newName);
	}

	render() {
		return (
			<ColorContext.Consumer>
				{context => (
					<div className="Menu Menu--level1">
						<div className="Menu-item Menu-item--export">
							<div className="Menu-title">
								<b>Export</b>
							</div>
							<Output />
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		);
	}
}

export default Menu;

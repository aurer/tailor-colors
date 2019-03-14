import React from 'react';
import { ColorContext } from './ColorContext';
import Editable from './Editable';
import { Add, Remove } from './Icons';
import '../styles/Menu.scss';

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
						<div className="Menu-item">
							<span className="Menu-title">Color groups</span>
							<button className="Button" onClick={context.addGroup}>
								<Add />
							</button>
						</div>
						<div className="Menu Menu--level2">
							{context.groups.map(group => (
								<div className="Menu-item" key={group.id}>
									<Editable className="Menu-title" onChange={this.handleRename.bind(this, group.name)}>
										{group.name}
									</Editable>
									<button className="Button" onClick={context.removeGroup.bind(this, group.id)}>
										<Remove />
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		);
	}
}

export default Menu;

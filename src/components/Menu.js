import React from 'react';
import { ColorContext } from './ColorContext';
import Editable from './Editable';
import { Add, Remove } from './Icons';
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
						<div className="Menu-item">
							<div className="Menu-title">
								<b>Color groups</b>
								<button className="Button" onClick={context.addGroup}>
									<Add />
								</button>
							</div>
							<div className="Menu Menu--level2">
								{context.groups.map((group, index) => (
									<div className="Menu-item" key={group.id}>
										<Editable className="Menu-title" onChange={this.handleRename.bind(this, group.name)}>
											<b>{group.name}</b>
											{index > 0 && (
												<button className="Button" onClick={context.removeGroup.bind(this, group.id)}>
													<Remove />
												</button>
											)}
										</Editable>
									</div>
								))}
							</div>
						</div>
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

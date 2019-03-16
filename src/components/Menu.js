import React from 'react';
import { ColorContext } from './ColorContext';
import Editable from './Editable';
import { Add, Remove } from './Icons';
import '../styles/Menu.scss';
import Output from './Output';

class Menu extends React.Component {
	static contextType = ColorContext;

	constructor() {
		super();
		this.state = {
			exportVisible: false
		};
	}

	handleRename(name, newName) {
		this.context.renameGroup(name, newName);
	}

	toggleExportVisible() {
		this.setState({ exportVisible: !this.state.exportVisible });
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
								{context.groups.map(group => (
									<div className="Menu-item" key={group.id}>
										<Editable className="Menu-title" onChange={this.handleRename.bind(this, group.name)}>
											<b>{group.name}</b>
											<button className="Button" onClick={context.removeGroup.bind(this, group.id)}>
												<Remove />
											</button>
										</Editable>
									</div>
								))}
							</div>
						</div>
						<div className="Menu-item Menu-item--export">
							<div className="Menu-title">
								<b>Export</b>
								<button className="Button" onClick={this.toggleExportVisible.bind(this)}>
									{this.state.exportVisible ? <Remove /> : <Add />}
								</button>
							</div>
							{this.state.exportVisible && <Output />}
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		);
	}
}

export default Menu;

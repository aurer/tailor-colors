import React from 'react';
import { ColorContext } from './ColorContext';
import ColorGroup from './ColorGroup';
import { Add, Remove } from './Icons';

class ColorGroups extends React.Component {
	render() {
		return (
			<ColorContext.Consumer>
				{context => (
					<React.Fragment>
						{context.groups.map(group => (
							<ColorGroup name={group.name} id={group.id} key={group.id} colors={group.colors} context={context} />
						))}
						<div className="ColorGroup-footer">
							<button className="ColorGroup-add" title="Add hue" onClick={context.addGroup}>
								<Add />
							</button>
						</div>
					</React.Fragment>
				)}
			</ColorContext.Consumer>
		);
	}
}

export default ColorGroups;

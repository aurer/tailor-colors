import React from 'react';
import { ColorContext } from '../contexts/ColorContext';
import ColorGroup from './ColorGroup';

class ColorGroups extends React.Component {
	render() {
		return (
			<ColorContext.Consumer>
				{context => (
					<React.Fragment>
						{context.groups.map(group => (
							<ColorGroup name={group.name} id={group.id} key={group.id} colors={group.colors} context={context} />
						))}
					</React.Fragment>
				)}
			</ColorContext.Consumer>
		);
	}
}

export default ColorGroups;

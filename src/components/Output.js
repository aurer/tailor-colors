import React from 'react';
import { ColorContext } from '../contexts/ColorContext';
import { colorName } from '../lib/Utilities';

class Output extends React.Component {
	render() {
		return (
			<ColorContext.Consumer>
				{context => (
					<div className="Output">
						{context.groups.map(group => (
							<div>
								{group.colors.map(color => (
									<div>
										--{colorName(group.name, color)}: #{color.value}
									</div>
								))}
							</div>
						))}
					</div>
				)}
			</ColorContext.Consumer>
		);
	}
}

export default Output;

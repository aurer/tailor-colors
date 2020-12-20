import React from 'react'
import { ColorContext, Group, ColorContextProps } from './ColorContext'
import ColorGroup from './ColorGroup'
import { Add } from './Icons'

const ColorGroups = () => {
	return (
		<ColorContext.Consumer>
			{(context: ColorContextProps) => (
				<React.Fragment>
					{context.groups.map((group: Group) => (
						<ColorGroup
							name={group.name}
							id={group.id}
							key={group.id}
							colors={group.colors}
							context={context}
						/>
					))}
					<div className="ColorGroup-footer">
						<button className="ColorGroup-add" title="Add hue" onClick={context.addGroup}>
							<Add />
						</button>
					</div>
				</React.Fragment>
			)}
		</ColorContext.Consumer>
	)
}

export default ColorGroups

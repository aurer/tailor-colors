import React from 'react'
import { ColorContext, ColorContextInterface } from './ColorContext'
import ColorSet from '../lib/ColorSet'
import ColorGroup from './ColorGroup'
import { Add } from './Icons'

const ColorGroups = () => {
	return (
		<ColorContext.Consumer>
			{(context: ColorContextInterface) => (
				<React.Fragment>
					{context.groups.map((group: ColorSet) => (
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

import React from 'react'
import { ColorContext } from './ColorContext'
import Output from './Output'
import '../styles/Menu.scss'

const Menu = () => {
	return (
		<ColorContext.Consumer>
			{(context: any) => (
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
	)
}

export default Menu

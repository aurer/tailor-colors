import React from 'react'
import ColorGroups from './ColorGroups'
import Menu from './Menu'
import { ColorProvider } from './ColorContext'
import '../styles/App.scss'

const App = () => {
	return (
		<ColorProvider>
			<div className="App">
				<div className="App-main">
					<ColorGroups />
				</div>
				<div className="App-menu">
					<Menu />
				</div>
			</div>
		</ColorProvider>
	)
}

export default App

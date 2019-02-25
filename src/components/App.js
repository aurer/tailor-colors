import React from 'react';
import ColorGroups from './ColorGroups';
import Menu from './Menu';
import { ColorProvider } from '../contexts/ColorContext';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<ColorProvider>
				<main className="App">
					<Menu />
					<ColorGroups />
				</main>
			</ColorProvider>
		);
	}
}

export default App;

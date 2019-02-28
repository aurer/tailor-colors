import React from 'react';
import ColorGroups from './ColorGroups';
import Menu from './Menu';
import Output from './Output';
import { ColorProvider } from '../contexts/ColorContext';
import '../styles/App.css';

class App extends React.Component {
	render() {
		return (
			<ColorProvider>
				<div className="App">
					<div className="App-Menu">
						<Menu />
						<Output />
					</div>
					<div className="App-main">
						<ColorGroups />
					</div>
				</div>
			</ColorProvider>
		);
	}
}

export default App;

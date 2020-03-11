import React from 'react';
import ColorGroups from './ColorGroups';
import Menu from './Menu';
import WelcomeScreen from './WelcomeScreen';
import { ColorProvider } from './ColorContext';
import '../styles/App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showWelcome: false
		};
	}

	componentWillMount() {
		let show = localStorage.showWelcome;
		if (show === undefined || show === 'true') {
			this.setState({
				showWelcome: true
			});
		}
	}

	hideWelcome() {
		localStorage.showWelcome = false;
		this.setState({ showWelcome: false });
	}

	render() {
		return (
			<ColorProvider>
				{this.state.showWelcome && <WelcomeScreen onDismiss={this.hideWelcome.bind(this)} />}
				<div className="App">
					<div className="App-main">
						<ColorGroups />
					</div>
					<div className="App-menu">
						<Menu />
					</div>
				</div>
			</ColorProvider>
		);
	}
}

export default App;

import React from 'react';
import { ColorContext } from '../contexts/ColorContext';
import { colorName } from '../lib/Utilities';
import '../styles/Output.css';

class Output extends React.Component {
	constructor(props) {
		super(props);
		this.languages = ['sass', 'less', 'css', 'json'];
		this.state = {
			language: this.languages[0]
		};
	}

	setLanguage(language) {
		this.setState({ language });
	}

	render() {
		return (
			<ColorContext.Consumer>
				{context => (
					<div className="Output">
						<div className="Output-options">
							{this.languages.map(lang => (
								<span onClick={this.setLanguage.bind(this, lang)}>{lang}</span>
							))}
						</div>
						<div className="Output-code">
							{context.groups.map(group => this.renderVars(group, this.state.language))}
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		);
	}

	renderVars(group, language) {
		if (language === 'json') {
		}
		return (
			<pre>
				// {group.name}
				{group.colors.map(color => this.renderVar(group.name, color, language))}
			</pre>
		);
	}

	renderVar(groupName, color, language) {
		let string;

		switch (language) {
			case 'sass':
				string = '$' + colorName(groupName, color) + ': #' + color.value + ';';
				break;

			case 'less':
				string = '@' + colorName(groupName, color) + ': #' + color.value + ';';
				break;

			case 'css':
			default:
				string = '--' + colorName(groupName, color) + ': #' + color.value + ';';
				break;
		}

		return <div>{string}</div>;
	}
}

export default Output;

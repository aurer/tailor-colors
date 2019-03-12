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
						<div className="Menu Menu--level1">
							<div className="Menu-item">
								<span className="Menu-title">Export</span>
							</div>
						</div>
						<div className="Output-options">
							{this.languages.map(lang => (
								<span
									key={lang}
									className={lang === this.state.language ? 'is-active' : ''}
									onClick={this.setLanguage.bind(this, lang)}
								>
									{lang}
								</span>
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
			<pre key={group.name}>
				<span className="comment">{`// ${group.name}`}</span>
				{group.colors.map(color => this.renderVar(group.name, color, language))}
			</pre>
		);
	}
	renderVar(groupName, color, language) {
		let string;
		let name = colorName(groupName, color);

		switch (language) {
			case 'sass':
				string = '$' + name + ': #' + color.value + ';';
				break;

			case 'less':
				string = '@' + name + ': #' + color.value + ';';
				break;

			case 'css':
			default:
				string = '--' + name + ': #' + color.value + ';';
				break;
		}

		return <div key={name}>{string}</div>;
	}
}

export default Output;

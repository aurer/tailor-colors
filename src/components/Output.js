import React from 'react';
import { ColorContext } from './ColorContext';
import { colorName } from '../lib/Utilities';
import '../styles/Output.scss';

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
								<button
									key={lang}
									className={lang === this.state.language ? 'is-active' : ''}
									onClick={this.setLanguage.bind(this, lang)}
								>
									{lang}
								</button>
							))}
						</div>
						<div className="Output-code">
							{this.state.language !== 'json' && context.groups.map(group => this.renderVars(group, this.state.language))}
							{this.state.language === 'json' && this.renderJson(context.groups)}
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		);
	}

	renderJson(groups) {
		groups = groups.map(group => {
			delete group.id;
			return group;
		});

		return <pre>{JSON.stringify(groups, null, '  ')}</pre>;
	}

	renderVars(group, language) {
		let name = `// ${group.name} colors`;

		if (language === 'css') {
			name = `/* ${group.name} colors */`;
		}
		
		return (
			<React.Fragment key={group.name}>
				<pre>
					<span className="comment">{name}</span>
					{group.colors.map(color => this.renderVar(group.name, color, language))}
					<span className="spacer"></span>
				</pre>
				<br/>
			</React.Fragment>
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

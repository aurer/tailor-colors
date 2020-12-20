import React from 'react'
import { ColorContext, Group, ColorObject, ColorContextProps } from './ColorContext'
import { nameWithSuffix } from '../lib/Utilities'
import '../styles/Output.scss'

export interface OutputProps {}

interface OutputState {
	language: OutputType
}

enum OutputType {
	SASS = 'SASS',
	LESS = 'LESS',
	CSS = 'CSS',
	JSON = 'JSON',
}

class Output extends React.Component<OutputProps, OutputState> {
	languages = Object.values(OutputType)

	constructor(props: OutputProps) {
		super(props)
		this.state = {
			language: this.languages[0],
		}
	}

	setOutputType(language: OutputType) {
		this.setState({ language })
	}

	render() {
		return (
			<ColorContext.Consumer>
				{(context: ColorContextProps) => (
					<div className="Output">
						<div className="Output-options">
							{this.languages.map((lang: OutputType) => (
								<button
									key={lang}
									className={lang === this.state.language ? 'is-active' : ''}
									onClick={this.setOutputType.bind(this, lang)}
								>
									{lang}
								</button>
							))}
						</div>
						<div className="Output-code">
							{this.state.language !== OutputType.JSON &&
								context.groups.map((group) => this.renderVars(group, this.state.language))}
							{this.state.language === OutputType.JSON && this.renderJson(context.groups)}
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		)
	}

	renderJson(groups: Group[]) {
		groups = groups.map((group) => {
			// delete group.id
			return group
		})

		return <pre>{JSON.stringify(groups, null, '  ')}</pre>
	}

	renderVars(group: Group, language: OutputType) {
		let name = `// ${group.name} colors`

		if (language === OutputType.CSS) {
			name = `/* ${group.name} colors */`
		}

		return (
			<React.Fragment key={group.id}>
				<pre>
					<span className="comment">{name}</span>
					{group.colors.map((color) => this.renderVar(group.name, color, language))}
					<span className="spacer"></span>
				</pre>
				<br />
			</React.Fragment>
		)
	}

	renderVar(groupName: string, color: ColorObject, language: OutputType) {
		let string
		let name = nameWithSuffix(groupName, color.suffix)

		switch (language) {
			case OutputType.SASS:
				string = '$' + name + ': #' + color.value + ';'
				break

			case OutputType.LESS:
				string = '@' + name + ': #' + color.value + ';'
				break

			case OutputType.CSS:
			default:
				string = '--' + name + ': #' + color.value + ';'
				break
		}

		return <div key={name}>{string}</div>
	}
}

export default Output

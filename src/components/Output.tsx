import React from 'react'
import { ColorContext, ColorObject, ColorContextInterface } from './ColorContext'
import ColorSet from '../lib/ColorSet'
import { nameWithSuffix } from '../lib/Utilities'
import '../styles/Output.scss'

export interface OutputProps {}

interface OutputState {
	outputType: OutputType
}

enum OutputType {
	SASS = 'SASS',
	LESS = 'LESS',
	CSS = 'CSS',
	JSON = 'JSON',
}

class Output extends React.Component<OutputProps, OutputState> {
	constructor(props: OutputProps) {
		super(props)
		this.state = {
			outputType: OutputType.SASS,
		}
	}

	setOutputType(outputType: OutputType) {
		this.setState({ outputType })
		gtag('event', 'switch_output', {
			event_category: 'interaction',
			event_label: outputType,
		})
	}

	render() {
		return (
			<ColorContext.Consumer>
				{(context: ColorContextInterface) => (
					<div className="Output">
						<div className="Output-options">
							{Object.values(OutputType).map((lang: OutputType) => (
								<button
									key={lang}
									className={lang === this.state.outputType ? 'is-active' : ''}
									onClick={this.setOutputType.bind(this, lang)}
								>
									{lang}
								</button>
							))}
						</div>
						<div className="Output-code">
							{this.state.outputType !== OutputType.JSON &&
								context.groups.map((group) => this.renderVars(group, this.state.outputType))}
							{this.state.outputType === OutputType.JSON && this.renderJson(context.groups)}
						</div>
					</div>
				)}
			</ColorContext.Consumer>
		)
	}

	renderJson(groups: any[]) {
		groups = groups.map((group) => {
			return {
				name: group.name,
				contrastValue: group.contrastValue,
				colors: group.colors,
			}
		})

		return <pre>{JSON.stringify(groups, null, '  ')}</pre>
	}

	renderVars(group: ColorSet, outputType: OutputType) {
		let name = `// ${group.name} colors`

		if (outputType === OutputType.CSS) {
			name = `/* ${group.name} colors */`
		}

		return (
			<React.Fragment key={group.id}>
				<pre>
					<span className="comment">{name}</span>
					{group.colors.map((color) => this.renderVar(group.name, color, outputType))}
					<span className="spacer"></span>
				</pre>
				<br />
			</React.Fragment>
		)
	}

	renderVar(groupName: string, color: ColorObject, outputType: OutputType) {
		let string
		let name = nameWithSuffix(groupName, color.suffix)

		switch (outputType) {
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

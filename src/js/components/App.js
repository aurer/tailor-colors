import ColorGroup from './ColorGroup.js';
import ColorGroupCss from './ColorGroupCss.js';
import { updateColors } from '../actions/colors.js';
const verbs = ['Primary', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary'];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: [{ title: 'Primary', colors: [] }]
		};
	}

	render() {
		let groups = this.state.groups;
		return (
			<div className="ColorGroups">
				{groups.map(group => (
					<ColorGroup group={group} onupdate={this.updateGroup.bind(this)} key={group.title} />
				))}
				{groups.length < verbs.length && (
					<button className="Button" onClick={this.addGroup.bind(this)}>
						Add group
					</button>
				)}
				<ColorGroupCss groups={groups} />
			</div>
		);
	}

	addGroup() {
		let groups = this.state.groups;
		if (groups.length < verbs.length) {
			groups.push({ title: verbs[groups.length], colors: [] });
			this.setState({ groups });
		}
	}

	updateGroup(title, colors) {
		let groups = this.state.groups.map(group => {
			if (group.title == title) {
				group.colors = colors;
			}
			return group;
		});

		this.props.dispatch(updateColors(groups));

		this.setState({ groups });
	}
}

export default ReactRedux.connect()(App);

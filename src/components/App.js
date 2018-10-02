import { h, Component } from 'preact';
import ColorGroup from './ColorGroup';
import ColorGroupCss from './ColorGroupCss';
const verbs = ['Primary', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary']

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      groups: [{title: 'Primary', colors:[]}]
    }
  }

  render(props, {groups}) {
    return (
      <div className="ColorGroups">
        { groups.map(group => <ColorGroup group={group} onupdate={this.updateGroup.bind(this)} /> )}
        { groups.length < verbs.length && <button className="Button" onclick={this.addGroup.bind(this)}>Add group</button> }
        <ColorGroupCss groups={groups} />
      </div>
    )
  }

  addGroup() {
    let groups = this.state.groups;
    if (groups.length < verbs.length) {
      groups.push({title: verbs[groups.length], colors: []});
      this.setState({groups})
    }
  }

  updateGroup(title, colors) {
    let groups = this.state.groups.map(group => {
      if (group.title == title) {
        group.colors = colors
      }
      return group;
    })

    this.setState({groups})
  }
};

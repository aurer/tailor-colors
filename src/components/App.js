import { h, Component } from 'preact';
import ColorGroup from './ColorGroup';
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
        { groups.map(group => <ColorGroup group={group} /> )}
        { groups.length < verbs.length && <button className="Button" onclick={this.addGroup.bind(this)}>Add group</button> }
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
};

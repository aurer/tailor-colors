import { h, Component } from 'preact';
import ColorGroup from './ColorGroup';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [
        {name: 'color-primary-lighter', value: '#eeeeee' },
        {name: 'color-primary-light', value: '#bbbbbb' },
        {name: 'color-primary', value: '#888888' },
        {name: 'color-primary-dark', value: '#555555' },
        {name: 'color-primary-daker', value: '#222222' }
      ]
    }
  }

  render(props, {colors}) {
    return (
      <div>
        <ColorGroup colors={colors} />
      </div>
    )
  }
};

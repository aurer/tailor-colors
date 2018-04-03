import { h, Component } from 'preact';
import ColorGroup from './ColorGroup';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [
        {name: 'color-primary-lighter', value: '#112233' },
        {name: 'color-primary-light', value: '#223344' },
        {name: 'color-primary', value: '#334455' },
        {name: 'color-primary-dark', value: '#445566' },
        {name: 'color-primary-daker', value: '#556677' }
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

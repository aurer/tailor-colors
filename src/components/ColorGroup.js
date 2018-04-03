import { h, Component } from 'preact';
import ColorInput from './ColorInput';

class ColorGroup extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render({colors}, state) {
    return (
      <div>
        {colors.map(color => <ColorInput onColorChange={this.handleColorChange.bind(this)} color={color} />)}
      </div>
    );
  }

  handleColorChange(item) {
    console.log(item);
  }
}

export default ColorGroup;

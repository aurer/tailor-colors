import { h, Component } from 'preact';
import ColorInput from './ColorInput';
import Gradient from '../lib/gradient';

class ColorGroup extends Component {
  constructor({colors}) {
    super({colors});
    this.state = {colors}
  }

  render(props, {colors}) {
    return (
      <div>
        {colors.map(color => <ColorInput onColorChange={this.handleColorChange.bind(this)} color={color} />)}
      </div>
    );
  }

  handleColorChange(color) {
    let colors = this.props.colors.map(c => {
      if (c.name == color.name) {
        c.value = color.value
      }
      return c;
    });

    let newColors = Gradient(colors[0].value, colors[4].value, 3).hex();

    colors.map((c, i) => {
      c.value = newColors[i]
    })

    this.setState({colors});
  }
}

export default ColorGroup;

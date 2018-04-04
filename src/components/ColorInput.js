import { h, Component } from 'preact';

class ColorInput extends Component {
  render({color}, state) {
    return (<div>
      <input type="color" name={color.name} value={color.value} onChange={this.handleChange.bind(this)} />
    </div>);
  }

  handleChange(e) {
    const color = Object.assign({}, this.props.color, {
      value: e.target.value
    })
    this.setState({color})
    this.props.onColorChange(color)
  }
}

export default ColorInput;

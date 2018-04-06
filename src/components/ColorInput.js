import { h, Component } from 'preact';

class ColorInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      override: props.color.override
    }
  }

  componentWillReceiveProps({color}) {
    if (color.override != this.state.override) {
      this.setState({override: color.override})
    }
  }

  render({color}) {
    let label = color.name;
    return (
      <div className="ColorInput" style={"--color:" + color.value}>
        <label for={'field-' + color.name}>{label}</label>
        <input type="color" id={'field-' + color.name} name={color.name} value={color.value} onInput={this.handleChange.bind(this)} disabled={!this.state.override} />
        <input type="text" name={color.name} value={color.value} onChange={this.handleChange.bind(this)} disabled={!this.state.override} />
        <input type="checkbox" checked={this.state.override} onChange={this.toggleOverride.bind(this)} />
      </div>
    );
  }

  makeSassVar(color) {
    let name = '$' + color.name;
    return `${name}: ${color.value};`;
  }

  toggleOverride(e) {
    const color = Object.assign({}, this.props.color, {
      override: e.target.checked
    })
    const override = e.target.checked;
    this.setState({override});
    this.props.onOverrideChange(color, this.props.index);
    e.preventDefault();
  }

  handleChange(e) {
    let validColor = this.validateColor(e.target.value);
    if (!validColor) return false;

    const color = Object.assign({}, this.props.color, {
      value: validColor
    })
    this.setState({color})
    this.props.onColorChange(color, this.props.index)
  }

  validateColor(color) {
    if (color.match(/^#?([0-9a-f]{3})$/)) {
      return '#' + color.replace('#', '').split('').map(c => c.toString() + c.toString()).join('');
    }
    if (color.match(/^#?([0-9a-f]{6})$/)) {
      return '#' + color.replace('#', '');
    }
    return false;
  }
}

export default ColorInput;

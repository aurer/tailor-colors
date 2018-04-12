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
        <h2>{label}</h2>
        <div class="ColorInput-inputs">
          <input type="color" id={'field-' + color.name} name={'color-' + color.name} value={color.value} onChange={this.handleChange.bind(this)} disabled={!this.state.override} />
          <label for={'field-' + color.name} onClick={this.activateOverride.bind(this)}>{label}</label>
          <input type="text" name={color.name} value={color.value} onChange={this.handleChange.bind(this)} disabled={!this.state.override} />
          <input type="checkbox" checked={this.state.override} onChange={this.toggleOverride.bind(this)} />
        </div>
      </div>
    );
  }

  makeSassVar(color) {
    let name = '$' + color.name;
    return `${name}: ${color.value};`;
  }

  activateOverride(e) {
    if (this.state.override === false) {
      this.setState({override: true})
    }
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
    if (!validColor) {
      console.log('Invalid color supplied: ', e.target.value);
      return false;
    }

    const color = Object.assign({}, this.props.color, {
      value: validColor
    })
    this.setState({color})
    this.props.onColorChange(color, this.props.index)
  }

  validateColor(color) {
    if (color.match(/^#?([0-9a-fA-F]{3})$/)) {
      return '#' + color.replace('#', '').split('').map(c => c.toString() + c.toString()).join('');
    }
    if (color.match(/^#?([0-9a-fA-F]{6})$/)) {
      return '#' + color.replace('#', '');
    }
    return false;
  }
}

export default ColorInput;

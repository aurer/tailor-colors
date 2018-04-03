import { h, Component } from 'preact';

class ColorInput extends Component {
    render({color}, state) {
        return (<div>
          <input type="color" name={color.name} value={color.value} onChange={this.handleChange.bind(this)} />
        </div>);
    }

    handleChange() {
      this.props.onColorChange(this)
    }
}

export default ColorInput;

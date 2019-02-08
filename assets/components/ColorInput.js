var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorInput = function (_React$Component) {
	_inherits(ColorInput, _React$Component);

	function ColorInput(props) {
		_classCallCheck(this, ColorInput);

		var _this = _possibleConstructorReturn(this, (ColorInput.__proto__ || Object.getPrototypeOf(ColorInput)).call(this, props));

		_this.state = {
			color: '',
			override: props.color.override
		};
		return _this;
	}

	_createClass(ColorInput, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			if (props.color.override != this.state.override) {
				this.setState({ override: props.color.override });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var color = this.props.color;
			var label = color.name;
			return React.createElement(
				'div',
				{ className: 'ColorInput', style: { '--color': color.value } },
				React.createElement(
					'h2',
					null,
					label
				),
				React.createElement(
					'div',
					{ className: 'ColorInput-inputs' },
					React.createElement('input', {
						type: 'color',
						id: 'field-' + color.name,
						name: 'color-' + color.name,
						value: color.value,
						onChange: this.handleChange.bind(this),
						disabled: !this.state.override
					}),
					React.createElement(
						'label',
						{ htmlFor: 'field-' + color.name, onClick: this.activateOverride.bind(this) },
						label
					),
					React.createElement('input', {
						type: 'text',
						name: color.name,
						value: color.value,
						onChange: this.handleChange.bind(this),
						disabled: !this.state.override
					}),
					React.createElement('input', { type: 'checkbox', checked: this.state.override, onChange: this.toggleOverride.bind(this) })
				)
			);
		}
	}, {
		key: 'makeSassVar',
		value: function makeSassVar(color) {
			var name = '$' + color.name;
			return name + ': ' + color.value + ';';
		}
	}, {
		key: 'activateOverride',
		value: function activateOverride(e) {
			if (this.state.override === false) {
				this.setState({ override: true });
			}
		}
	}, {
		key: 'toggleOverride',
		value: function toggleOverride(e) {
			var color = Object.assign({}, this.props.color, {
				override: e.target.checked
			});
			var override = e.target.checked;
			this.setState({ override: override });
			this.props.onOverrideChange(color, this.props.index);
			e.preventDefault();
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			var validColor = this.validateColor(e.target.value);
			if (!validColor) {
				console.log('Invalid color supplied: ', e.target.value);
				return false;
			}

			var color = Object.assign({}, this.props.color, {
				value: validColor
			});
			this.setState({ color: color });
			this.props.onColorChange(color, this.props.index);
		}
	}, {
		key: 'validateColor',
		value: function validateColor(color) {
			if (color.match(/^#?([0-9a-fA-F]{3})$/)) {
				return '#' + color.replace('#', '').split('').map(function (c) {
					return c.toString() + c.toString();
				}).join('');
			}
			if (color.match(/^#?([0-9a-fA-F]{6})$/)) {
				return '#' + color.replace('#', '');
			}
			return false;
		}
	}]);

	return ColorInput;
}(React.Component);

export default ColorInput;
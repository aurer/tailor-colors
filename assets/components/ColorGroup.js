var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ColorInput from './ColorInput.js';
import Gradient from '../lib/gradient.js';

var ColorGroup = function (_React$Component) {
	_inherits(ColorGroup, _React$Component);

	function ColorGroup(props) {
		_classCallCheck(this, ColorGroup);

		var _this = _possibleConstructorReturn(this, (ColorGroup.__proto__ || Object.getPrototypeOf(ColorGroup)).call(this, props));

		var title = props.group.title;
		var name = title.toLowerCase();
		var colors = [{ name: name + '-lighter', value: '#eeeeee', override: false }, { name: name + '-light', value: '#bbbbbb', override: false }, { name: '' + name, value: '#888888', override: true }, { name: name + '-dark', value: '#555555', override: false }, { name: name + '-darker', value: '#222222', override: false }];
		_this.state = { title: title, colors: colors };
		_this.props.onupdate(props.group.title, colors);
		return _this;
	}

	_createClass(ColorGroup, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    title = _state.title,
			    colors = _state.colors;

			var colorGroupCode = colors.slice().sort(function (c) {
				return c.name.indexOf('-');
			}).map(function (color, index) {
				return '$color-' + color.name + ': ' + color.value + ';\n';
			});
			return React.createElement(
				'div',
				{ className: 'ColorGroup' },
				React.createElement(
					'div',
					{ className: 'ColorGroup-colors' },
					colors.map(function (color, index) {
						return React.createElement(ColorInput, {
							key: color.name,
							onColorChange: _this2.handleColorChange.bind(_this2),
							onOverrideChange: _this2.handleOverrideChange.bind(_this2),
							index: index,
							color: color
						});
					})
				),
				React.createElement(
					'div',
					{ className: 'ColorGroup-code' },
					React.createElement('textarea', { rows: '5', defaultValue: colorGroupCode })
				)
			);
		}
	}, {
		key: 'handleOverrideChange',
		value: function handleOverrideChange(color, index) {
			var colors = this.state.colors;
			colors[index].override = color.override;
			this.setState({ colors: colors });
		}
	}, {
		key: 'handleColorChange',
		value: function handleColorChange(color, index) {
			var changeIndex = 0;
			var colors = this.state.colors.map(function (c, i) {
				if (c.name == color.name) {
					c.value = color.value;
					c.override = true;
					changeIndex = i;
				}
				return c;
			});

			var newColors = void 0;
			var lights = Gradient(colors[2].value, '#ffffff', 2).hex().slice(1, 3);
			var darks = Gradient(colors[2].value, '#000000', 2).hex().slice(1, 3);
			var lighter = lights[0];
			var lightest = lights[1];
			var darker = darks[0];
			var darkest = darks[1];

			if (colors[0].override) {
				lightest = colors[0].value;
			}
			if (colors[1].override) {
				lighter = colors[1].value;
			}
			if (colors[3].override) {
				darker = colors[3].value;
			}
			if (colors[4].override) {
				darkest = colors[4].value;
			}

			switch (changeIndex) {
				case 0:
					if (!colors[1].override) {
						var lightColors = Gradient(colors[0].value, colors[2].value, 1).hex();
						colors[1].value = lightColors[1];
					}
					break;
				case 2:
					if (!colors[0].override) colors[0].value = lightest;
					if (!colors[1].override) colors[1].value = lighter;
					if (!colors[3].override) colors[3].value = darker;
					if (!colors[4].override) colors[4].value = darkest;
					break;
				case 4:
					if (!colors[3].override) {
						var darkColors = Gradient(colors[2].value, colors[4].value, 1).hex();
						colors[3].value = darkColors[1];
					}
					break;
			}

			this.setState({ colors: colors });
			this.props.onupdate(this.props.group.title, colors);
		}
	}]);

	return ColorGroup;
}(React.Component);

export default ColorGroup;
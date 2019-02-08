var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ColorGroup from './ColorGroup.js';
import ColorGroupCss from './ColorGroupCss.js';
import { updateColors } from '../actions/colors.js';
var verbs = ['Primary', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary'];

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			groups: [{ title: 'Primary', colors: [] }]
		};
		return _this;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var groups = this.state.groups;
			return React.createElement(
				'div',
				{ className: 'ColorGroups' },
				groups.map(function (group) {
					return React.createElement(ColorGroup, { group: group, onupdate: _this2.updateGroup.bind(_this2), key: group.title });
				}),
				groups.length < verbs.length && React.createElement(
					'button',
					{ className: 'Button', onClick: this.addGroup.bind(this) },
					'Add group'
				),
				React.createElement(ColorGroupCss, { groups: groups })
			);
		}
	}, {
		key: 'addGroup',
		value: function addGroup() {
			var groups = this.state.groups;
			if (groups.length < verbs.length) {
				groups.push({ title: verbs[groups.length], colors: [] });
				this.setState({ groups: groups });
			}
		}
	}, {
		key: 'updateGroup',
		value: function updateGroup(title, colors) {
			var groups = this.state.groups.map(function (group) {
				if (group.title == title) {
					group.colors = colors;
				}
				return group;
			});

			this.props.dispatch(updateColors(groups));

			this.setState({ groups: groups });
		}
	}]);

	return App;
}(React.Component);

export default ReactRedux.connect()(App);
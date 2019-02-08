var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorGroupCss = function (_React$Component) {
	_inherits(ColorGroupCss, _React$Component);

	function ColorGroupCss(props) {
		_classCallCheck(this, ColorGroupCss);

		return _possibleConstructorReturn(this, (ColorGroupCss.__proto__ || Object.getPrototypeOf(ColorGroupCss)).call(this, props));
	}

	_createClass(ColorGroupCss, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"code",
				{ className: "Colorcode" },
				React.createElement(
					"pre",
					null,
					this.props.groups.map(function (group) {
						return React.createElement(
							"div",
							{ key: group.title },
							React.createElement(
								"b",
								null,
								"// ",
								group.title,
								" colors"
							),
							group.colors.map(function (color) {
								return React.createElement(
									"div",
									{ key: color.name },
									"$color-",
									color.name,
									": ",
									color.value,
									";"
								);
							}),
							React.createElement("br", null)
						);
					})
				)
			);
		}
	}]);

	return ColorGroupCss;
}(React.Component);

export default ColorGroupCss;
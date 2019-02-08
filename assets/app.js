import App from './components/App.js';

function colorReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'update':
			return action.payload;
		default:
			return state;
	}
}

var store = Redux.createStore(colorReducer);
store.subscribe(function () {
	return console.log(store.getState());
});

var Provider = ReactRedux.Provider;

ReactDOM.render(React.createElement(
	Provider,
	{ store: store },
	React.createElement(App, null)
), document.querySelector('#app'));
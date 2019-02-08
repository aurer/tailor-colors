import App from './components/App.js';

function colorReducer(state = [], action) {
	switch (action.type) {
		case 'update':
			return action.payload;
		default:
			return state;
	}
}

let store = Redux.createStore(colorReducer);
store.subscribe(() => console.log(store.getState()));

let Provider = ReactRedux.Provider;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#app')
);

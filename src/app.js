import { h, render, Component } from 'preact';
import App from './components/App';

let appContainer = document.querySelector('#app');
render(<App />, appContainer, appContainer.lastChild);

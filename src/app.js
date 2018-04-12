import { h, render, Component } from 'preact';
import App from './components/App';
import './sass/app.scss';

let appContainer = document.querySelector('#app');
render(<App />, appContainer, appContainer.lastChild);

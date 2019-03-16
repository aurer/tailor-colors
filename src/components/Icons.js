import React from 'react';

export const Add = () => {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6 0H4V4H0V6H4V10H6V6H10V4H6V0Z" fill="white" />
		</svg>
	);
};

export const Remove = () => {
	return (
		<svg width="10" height="10" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 0H5.625H10V2H5.625H0V0Z" fill="white" />
		</svg>
	);
};

export const Undo = props => {
	return (
		<svg width="24" height="28" viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
			<path d="M24 14c0 6.609-5.391 12-12 12-3.578 0-6.953-1.578-9.234-4.328-0.156-0.203-0.141-0.5 0.031-0.672l2.141-2.156c0.109-0.094 0.25-0.141 0.391-0.141 0.141 0.016 0.281 0.078 0.359 0.187 1.531 1.984 3.828 3.109 6.312 3.109 4.406 0 8-3.594 8-8s-3.594-8-8-8c-2.047 0-3.984 0.781-5.437 2.141l2.141 2.156c0.297 0.281 0.375 0.719 0.219 1.078-0.156 0.375-0.516 0.625-0.922 0.625h-7c-0.547 0-1-0.453-1-1v-7c0-0.406 0.25-0.766 0.625-0.922 0.359-0.156 0.797-0.078 1.078 0.219l2.031 2.016c2.203-2.078 5.187-3.313 8.266-3.313 6.609 0 12 5.391 12 12z" />
		</svg>
	);
};

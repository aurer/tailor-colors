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

export const Lock = (...props) => {
	let className = props.className ? props.className : '';
	return (
		<svg
			className={className}
			width="16"
			height="16"
			viewBox="0 0 11 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10.175 6.4H9.9V3.2C9.9 1.43573 8.4194 0 6.6 0H4.4C2.5806 0 1.1 1.43573 1.1 3.2V6.4H0.825C0.37125 6.4 0 6.76 0 7.2V15.2C0 15.64 0.37125 16 0.825 16H10.175C10.6287 16 11 15.64 11 15.2V7.2C11 6.76 10.6287 6.4 10.175 6.4ZM3.3 3.2C3.3 2.61173 3.79335 2.13333 4.4 2.13333H6.6C7.20665 2.13333 7.7 2.61173 7.7 3.2V6.4H3.3V3.2Z"
				fill="white"
			/>
		</svg>
	);
};

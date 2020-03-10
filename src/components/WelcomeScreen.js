import React from 'react';
import '../styles/WelcomeScreen.scss';

const WelcomeScreen = props => {
	return (
		<div className="WelcomeScreen">
			<div className="WelcomeScreen-inner">
				<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="70" height="70" rx="6" fill="url(#paint0_linear)" />
					<rect x="38.2812" y="5.74219" width="25.9766" height="25.9766" rx="3" fill="#6E04F4" />
					<rect x="5.74219" y="5.74219" width="25.9766" height="25.9766" rx="3" fill="#F48F04" />
					<rect x="38.2812" y="38.2812" width="25.9766" height="25.9766" rx="3" fill="#364A64" />
					<rect x="5.74219" y="38.2812" width="25.9766" height="25.9766" rx="3" fill="#6D7D91" />
					<defs>
						<linearGradient
							id="paint0_linear"
							x1="0.683594"
							y1="-3.87336e-07"
							x2="70"
							y2="70"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#221103" />
							<stop offset="1" stopColor="#0E031C" />
						</linearGradient>
					</defs>
				</svg>
				<h2>Welcome to Huely</h2>
				<p>Helping you create your perfect color palette</p>
				<button onClick={props.onDismiss}>Get Started</button>
			</div>
		</div>
	);
};

export default WelcomeScreen;

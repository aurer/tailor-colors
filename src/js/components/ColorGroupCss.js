export default class ColorGroupCss extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<code className="Colorcode">
				<pre>
					{this.props.groups.map(group => {
						return (
							<div key={group.title}>
								<b>// {group.title} colors</b>
								{group.colors.map(color => (
									<div key={color.name}>
										$color-{color.name}: {color.value};
									</div>
								))}
								<br />
							</div>
						);
					})}
				</pre>
			</code>
		);
	}
}

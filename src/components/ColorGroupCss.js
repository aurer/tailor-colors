import { h, Component } from 'preact';

export default class ColorGroupCss extends Component {
	constructor() {
    super();
  }

  render(props) {
  	return (
  		<code class="Colorcode"><pre>
        { props.groups.map(group => {
          return (
            <div>
              <b>// {group.title} colors</b>
              { group.colors.map(color => <div>$color-{color.name}: {color.value};</div>)}
              <br/>
            </div>
          )
        })}
      </pre></code>
  	)
  }
}
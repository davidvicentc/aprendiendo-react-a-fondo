import React, { Component } from 'react';
import './Vaper.css'
class Vaper extends Component {

	render() {
		return (
			<div className="Vaper">
				<h3>{this.props.vaper.name}</h3>
				<p>{this.props.vaper.description}</p>
			</div>
		)
	}
}

export default Vaper;
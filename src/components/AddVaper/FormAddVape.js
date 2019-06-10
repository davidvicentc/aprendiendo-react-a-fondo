import React, { Component } from 'react'

class FormVaper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			vaper: {}
		}
	this.handleChangeName = this.handleChangeName.bind(this);
	this.handleChangeDescription = this.handleChangeDescription.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChangeName(e) {
		this.setState({ vaper: {
			name: e.target.value
		} })
	}
	handleChangeDescription(e) {
		this.setState({ vaper: {
			description: e.target.value
		} })
	}
	handleSubmit(e) {
		e.preventDefault();
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Nombre: </label>
				<input type="text" value={this.state.vaper.name} onChange={this.handleChangeName}/>
				<label>Description: </label>
				<input type="text" value={this.state.vaper.description} onChange={this.handleChangeDescription}/>
				<input  type="submit" value="enviar"/>
			</form>
		)
	}
}

export default FormVaper
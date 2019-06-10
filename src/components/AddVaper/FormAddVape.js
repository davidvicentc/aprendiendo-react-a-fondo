import React, { Component } from "react";

class FormVaper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: ""
		};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChangeName(e) {
		// this.setState({
		// 	vaper: {
		// 		name: e.target.value
		// 	}
		// });
		this.setState({ name: e.target.value });
	}
	handleChangeDescription(e) {
		// this.setState({
		// 	vaper: {
		// 		description: e.target.value
		// 	}
		// });
		this.setState({ description: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		if (this.state.name === "" && this.state.description === "") {
			return;
		}
		if (this.state.name === "") {
			return alert("debes colocar un nombre");
		}
		if (this.state.description === "") {
			return alert("debes colocar una description");
		}
		this.props.newDataVape(this.state.name, this.state.description);
		this.setState({ name: "", description: "" });
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Nombre: </label>
					<input
						className="form-control"
						type="text"
						onChange={this.handleChangeName}
						value={this.state.name}
					/>
				</div>
				<div className="form-group">
					<label>Description: </label>
					<input
						type="text"
						className="form-control"
						onChange={this.handleChangeDescription}
						value={this.state.description}
					/>
				</div>
				<input
					type="submit"
					className="btn btn-success"
					value="enviar"
				/>
			</form>
		);
	}
}

export default FormVaper;

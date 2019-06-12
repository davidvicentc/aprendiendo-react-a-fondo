import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import db from "../../config/firebase";
class FormVaper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			id: ""
		};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChangeName(e) {
		this.setState({ name: e.target.value });
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.editVaperData.id) {
			// let docRef = db.collection("vapers").doc(props.idEdit);
			// docRef.get().then(doc => {
			// 	// this.setState({
			// 	// 	name: doc.data().name,
			// 	// 	description: doc.data().description
			// 	// });
			// 	console.log(doc.data());

			// });
			// if (state.id) {
			// 	return null;
			// }
			if (nextProps.editVaperData.id !== prevState.id) {
				return {
					id: nextProps.editVaperData.id,
					name: nextProps.editVaperData.name,
					description: nextProps.editVaperData.description
				};
			}

			// return {
			// 	id: nextProps.editVaperData.id,
			// 	name: nextProps.editVaperData.name,
			// 	description: nextProps.editVaperData.description
			// };
		}
		return null;
	}
	handleChangeDescription(e) {
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
		if (this.props.isEdit) {
			this.props.newDataVape(
				this.state.name,
				this.state.description,
				this.state.id
			);
			this.setState({ name: "", description: "" });
		} else {
			this.props.newDataVape(
				this.state.name,
				this.state.description,
				this.state.id
			);
			this.setState({ name: "", description: "" });
		}
	}
	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>Nombre: </Label>
					<Input
						className="form-control"
						type="text"
						onChange={this.handleChangeName}
						value={this.state.name}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Description: </Label>
					<Input
						type="text"
						className="form-control"
						onChange={this.handleChangeDescription}
						value={this.state.description}
					/>
				</FormGroup>
				<Button type="submit" color="success">
					{this.props.isEdit ? "Actualizar" : "guardar"}
				</Button>
			</Form>
		);
	}
}

export default FormVaper;

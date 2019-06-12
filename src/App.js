import React from "react";
import Vaper from "./components/Vaper.js";
import FormVaper from "./components/AddVaper/FormAddVape.js";
import db from "./config/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//reactstrap

import { Container, Row, Jumbotron } from "reactstrap";

// />

const MySwal = withReactContent(Swal);
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vapers: [],
			edit: false,
			editVape: {}
		};

		this.action = this.action.bind(this);
	}

	action(name, description, id) {
		if (this.state.edit) {
			MySwal.fire({
				title: "¿Estas seguro que desea actualizar?",
				text:
					"Luego de presionar ok, sus antiguos datos se remplazaran con los nuevo.!",
				type: "success",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, actualizar!"
			}).then(result => {
				if (result.value) {
					db.collection("vapers")
						.doc(id)
						.update({
							name,
							description
						})
						.then(() =>
							this.setState({ edit: false, editVape: {} })
						);
					MySwal.fire(
						"Actualizado!",
						"Tu producto ha sido actualizado correctamente",
						"success"
					);
				}
			});
		} else {
			MySwal.fire({
				title: "Creado correctamente!!!",
				type: "success",
				showConfirmButton: false,
				confirmButtonColor: "#3085d6",
				timer: 1000
			}).then(() => {
				db.collection("vapers")
					.add({
						name,
						description
					})
					.then(docRef => console.log("agregado"))
					.catch(e => console.log(e));
			});
		}
	}
	componentDidMount() {
		this.getData();
	}
	getData = () => {
		db.collection("vapers").onSnapshot(querySnapshot => {
			this.setState({
				vapers: querySnapshot.docs.map(doc => {
					return {
						id: doc.id,
						name: doc.data().name,
						description: doc.data().description
					};
				})
			});
		});
	};

	deleteVaper(vaper) {
		MySwal.fire({
			title: `¿Estas seguro que desea Eliminar: ${vaper.name}?`,
			text:
				"Luego de presionar ok, se eliminara el registro del producto",
			type: "success",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "cancelar"
		}).then(result => {
			if (result.value) {
				db.collection("vapers")
					.doc(vaper.id)
					.delete()
					.then(function() {
						console.log("eliminado");
					})
					.catch(e => {
						console.log("eliminado correctamente");
					});
				MySwal.fire(
					"Eliminado!",
					"Tu producto ha sido eliminado correctamente",
					"success"
				);
			}
		});
	}
	editVaper = id => {
		let docRef = db.collection("vapers").doc(id);

		docRef.get().then(doc => {
			this.setState({
				editVape: {
					name: doc.data().name,
					description: doc.data().description,
					id: doc.id
				},
				edit: true
			});
		});
	};
	render() {
		return (
			<Container>
				<Jumbotron className="text-center">
					<h1>Product vape app.</h1>
					<p>Aprendiendo ReactJS a fondo.</p>
				</Jumbotron>
				<FormVaper
					newDataVape={this.action}
					editVaperData={this.state.editVape}
					isEdit={this.state.edit}
				/>
				<h1>Primer componente</h1>
				<Row>
					{this.state.vapers.length === 0 ? (
						<p className="mx-auto">
							lo sentimos, no hay productos disponibles
						</p>
					) : (
						this.state.vapers.map(vaper => (
							<Vaper
								key={vaper.id}
								vaper={vaper}
								deleteVaper={this.deleteVaper}
								editVaper={this.editVaper}
							/>
						))
					)}
				</Row>
			</Container>
		);
	}
}

export default App;

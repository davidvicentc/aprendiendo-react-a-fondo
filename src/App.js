import React from "react";
import Vaper from "./components/Vaper.js";
import FormVaper from "./components/AddVaper/FormAddVape.js";
import db from "./config/firebase";

//reactstrap

import { Container, Row, Jumbotron } from "reactstrap";

// />
import "firebase/firestore";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vapers: [],
			edit: false,
			editVape: {}
		};

		this.NewVape = this.NewVape.bind(this);
	}

	NewVape(name, description) {
		db.collection("vapers")
			.add({
				name,
				description
			})
			.then(docRef => console.log("agregado"))
			.catch(e => console.log(e));
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

	deleteVaper(e) {
		db.collection("vapers")
			.doc(e.target.value)
			.delete()
			.then(function() {
				console.log("eliminado");
			})
			.catch(e => {
				console.log("eliminado correctamente");
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
				}
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
					newDataVape={this.NewVape}
					editVapeData={this.state.editVape}
				/>
				<h1>Primer componente</h1>
				<Row>
					{this.state.vapers.length === 0 ? (
						<p className="mx-auto">
							lo sentimos, no hay productos disponibles
						</p>
					) : (
						this.state.vapers.reverse().map(vaper => (
							<div className="col-md-4" key={vaper.id}>
								<Vaper
									vaper={vaper}
									deleteVaper={this.deleteVaper}
									editVaper={this.editVaper}
								/>
							</div>
						))
					)}
				</Row>
			</Container>
		);
	}
}

export default App;

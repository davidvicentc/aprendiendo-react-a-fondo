import React from "react";
import Vaper from "./components/Vaper.js";
import FormVaper from "./components/AddVaper/FormAddVape.js";
import config from "./config/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
class App extends React.Component {
	constructor(props) {
		super(props);
		firebase.initializeApp(config);
		this.state = {
			vapers: []
		};

		this.NewVape = this.NewVape.bind(this);
	}

	NewVape(name, description) {
		firebase
			.firestore()
			.collection("vapers")
			.add({
				name,
				description
			})
			.then(docRef => {})
			.catch(e => console.log(e));
		this.setState({
			vapers: [...this.state.vapers, { name, description }]
		});
	}
	componentDidMount() {
		// firebase
		// 	.firestore()
		// 	.collection("vapers")
		// 	.add({
		// 		name: "eleaf",
		// 		description: "mi primer vape"
		// 	})
		// 	.then(docRef => {
		// 		console.log(docRef);
		// 	})
		// 	.catch(e => console.log(e));
		this.getData();
	}
	getData = () => {
		let vapers = [];
		firebase
			.firestore()
			.collection("vapers")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					vapers.push({
						id: doc.id,
						name: doc.data().name,
						description: doc.data().description
					});
				});
				this.setState({ vapers });
			});
	};

	deleteVaper(e) {
		firebase
			.firestore()
			.collection("vapers")
			.doc(e.target.value)
			.delete()
			.then(function() {
				console.log("eliminado");
			})
			.catch(e => {
				console.log("eliminado correctamente");
			});
	}
	render() {
		return (
			<div className="container">
				<FormVaper newDataVape={this.NewVape} />
				<h1>Primer componente</h1>
				<div className="row">
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
								/>
							</div>
						))
					)}
				</div>
			</div>
		);
	}
}

export default App;

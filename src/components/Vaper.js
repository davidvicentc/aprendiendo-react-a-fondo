import React from "react";

import { Button } from "reactstrap";
import "./Vaper.css";
const Vaper = props => {
	return (
		<div className="col-md-4">
			<div className="Vaper">
				<h3>{props.vaper.name}</h3>
				<p>{props.vaper.description}</p>
				<Button
					color="danger"
					value={props.vaper.id}
					onClick={() => {
						props.deleteVaper(props.vaper);
					}}
				>
					X
				</Button>
				<Button
					color="warning"
					onClick={() => {
						props.editVaper(props.vaper.id);
					}}
				>
					Editar
				</Button>
			</div>
		</div>
	);
};

export default Vaper;

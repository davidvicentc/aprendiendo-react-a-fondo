import React from "react";
import "./Vaper.css";
const Vaper = props => {
	return (
		<div className="Vaper">
			<h3>{props.vaper.name}</h3>
			<p>{props.vaper.description}</p>
			<ul>
				<li>
					<button value={props.vaper.id} onClick={props.deleteVaper}>
						X
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Vaper;

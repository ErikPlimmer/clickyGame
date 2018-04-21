import React from 'react';
import './CharacterCard.css';

function handleClick(props) {
	props.reArrangeCards();
	props.clickedCharacter(props.id);
}


function CharacterCard(props) {
	return (
		<div className="card img-container" onClick={() => handleClick(props)}>
			<img alt={props.name} src={props.image} />
		</div>
	)
}






export default CharacterCard
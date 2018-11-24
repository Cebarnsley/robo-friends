import React from 'react';

const Card = ({id, name, username, email }) => {

 	return(
		<div className=" tc bg-light-green dib br4 pa2 ma2 grow bw2 shadow-3">
			<img alt="robot" src={`https://robohash.org/${id}?200x200"`} />
				<div>
					<h2>{name}</h2>
					<p>{username}</p>
					<p>{email}</p>
				</div>
		</div>
		);
}

export default Card;
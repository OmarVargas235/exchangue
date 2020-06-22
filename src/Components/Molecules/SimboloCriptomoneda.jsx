import React from 'react';

const SimboloCriptomoneda = ({ criptomoneda }) => (
	<div className="col-12 col-lg-2 text-center d-flex flex-column justify-content-center align-items-center">
		<img src={`https://static.coincap.io/assets/icons/${criptomoneda.symbol.toLowerCase()}@2x.png`} alt={`${criptomoneda.symbol}`} className="img-fluid" />
		<p>
			<span className="mr-2 name">{criptomoneda.name}</span>
			<span className="simbolo">{criptomoneda.symbol}</span>
		</p>
	</div>
)

export default SimboloCriptomoneda;
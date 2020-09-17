import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { conversionUsdCriptomoneda, conversionCriptomonedaUsd } from '../../utils/helper';

const CambioMoneda = ({ criptomoneda }) => {

	const [cambioMonedaEstado, guardarCambioMonedaEstado] = useState(false);
	const [numberMoneda, guardarNumberMoneda] = useState('');
	const [cambioMoneda, guardarCambioMoneda] = useState(0);

	let mensajeCambio = !cambioMonedaEstado ? `USD to ${criptomoneda.symbol}` : `${criptomoneda.symbol} to USD`;

	useEffect(() => {

	if (!cambioMonedaEstado && numberMoneda > 0) { //Cuando el cambio es de dolares a criptomonedas
		guardarCambioMoneda(conversionUsdCriptomoneda(numberMoneda, criptomoneda.priceUsd));
		
	} else if (cambioMonedaEstado && numberMoneda > 0) { //Cuando el cambio es de criptomonedas a dolares
		guardarCambioMoneda(conversionCriptomonedaUsd(numberMoneda, criptomoneda.priceUsd))
	}

	}, [cambioMonedaEstado, numberMoneda, criptomoneda]);

	return (
		<div className="col-12 col-lg-4 d-flex flex-column justify-content-center">
			<button 
				className="btn btn-block btn-coin font-weight-bold"
				onClick={ () => guardarCambioMonedaEstado(!cambioMonedaEstado) }
				>{ mensajeCambio }</button>
			<input 
				type="number" 
				className="form-control mt-3"
				min="0"
				max="100000000000000" 
				onChange={ e => guardarNumberMoneda(e.target.value > 0 ? e.target.value : "") }
			/>

			{
				numberMoneda === '' ? null 
				: <p className="mt-3 text-center">
						<span className="simbolo">$  </span> 
						<span className="font-weight-bold">{cambioMoneda}</span>
					</p>
			}
		</div>	
	)
}

export default CambioMoneda;
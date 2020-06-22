import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CriptomonedaDatos = ({ criptomoneda }) => {

	const { symbol, rank, name, priceUsd, marketCapUsd, changePercent24Hr, id } = criptomoneda;

	const [precioUsd, guardarPrecioUsd] = useState(0);
	const [marketCapUsdEstado, guardararketCapUsdEstado] = useState(0);
	const [variacion, guardararVariacion] = useState(0);

	useEffect(() => {
		//Reduce el precio original a un precio con dos decimales
		let precioUSD = priceUsd >= 1000 ? (priceUsd / 1000).toFixed(2) + ' k' : Number(priceUsd).toFixed(2);
		
		//Reduce el precio original a un precio con dos decimales
		let copiaMarketCapUsd = marketCapUsd;		
		copiaMarketCapUsd = (copiaMarketCapUsd / 1000000000).toFixed(2);
		copiaMarketCapUsd = copiaMarketCapUsd < 1 ? (marketCapUsd / 1000000).toFixed(2) + ' m' : copiaMarketCapUsd + ' b';

		guardarPrecioUsd(precioUSD);
		guardararketCapUsdEstado(copiaMarketCapUsd);
		guardararVariacion(Number(changePercent24Hr).toFixed(2));

	}, [priceUsd, marketCapUsd, changePercent24Hr, id]);
	
	return (
		<tr>
			<td className="d-none d-md-table-cell px-0">
				<img src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`} alt={`${symbol}`} className="img-fluid" />
				<span className="ml-3 font-weight-bold">#{rank}</span>
			</td>
			<td className="px-1 name">
				<Link className="mr-2" to={`/coin/${id}`}>{name}</Link>
				<Link className="simbolo" to={`/coin/${id}`}>{symbol}</Link>
			</td>
			<td>${precioUsd}</td>
			<td className="d-none d-md-table-cell">${marketCapUsdEstado}</td>
			<td id={criptomoneda.id}>
				{
					Number(changePercent24Hr).toFixed(2) < 0 
					? <svg fill="#E53E3E" viewBox="0 0 20 20" width="30px" height="30px">
						<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z">
						</path>
					</svg> 
					: <svg fill="#38A169" viewBox="0 0 20 20" width="30px" height="30px">
						<path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z">
						</path>
					</svg>
				}

				<span className={
					Number(changePercent24Hr).toFixed(2) < 0 ? 'negativo' : 'positivo'
				}>{variacion}</span>
			</td>
			<td className="d-none d-md-table-cell">
				<Link className="btn btn-color px-3 font-weight-bold py-2 px-4"
				to={`/coin/${id}`}>Details</Link>
			</td>
		</tr>
	)
}

export default React.memo(CriptomonedaDatos);
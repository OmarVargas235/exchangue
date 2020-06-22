import React, { useState, useEffect } from 'react';

const MercadoCripto = ({ mercadoDatos }) => {
	
	const [precioMercado, guardarPrecioMercado] = useState(0);
	const [cargar, guardarCargar] = useState(false);
	const [loaderLink, guardarLoaderLink] = useState(true);
	const [link, guardarLink] = useState('');

	useEffect(() => {
		//Reduce el precio original a un precio con dos decimales.
		let precioUsd = mercadoDatos.priceUsd >= 1000 ? ('$ ' + (Number(mercadoDatos.priceUsd).toFixed(0) / 1000).toFixed(2) + ' k') : '$ ' + Number(mercadoDatos.priceUsd).toFixed(2);
		guardarPrecioMercado(precioUsd);

	}, [mercadoDatos]);

	const peticionAPI = async () => {
		const url = `https://api.coincap.io/v2/exchanges/${mercadoDatos.exchangeId}`;

		guardarCargar(true);

		try {
			const consulta = await fetch(url);	
			const resultado = await consulta.json();
			guardarLink(resultado.data.exchangeUrl);
			guardarLoaderLink(false);

		} catch {
			console.log("error")
		}
	}

	return (
		<tr>
			<td className="font-weight-bold">{mercadoDatos.exchangeId}</td>
			<td>{precioMercado}</td>
			<td className="baseSymbol">{mercadoDatos.baseSymbol} / {mercadoDatos.quoteSymbol}</td>
			<td>
				{
					loaderLink ? <button 
									className="btn btn-color py-2 font-weight-bold"
									onClick={ () => peticionAPI() }
								>	
								{
									!cargar ? <div>Obtain Link </div>
									: <div className="spinner">
										  <div className="bounce1 bounce"></div>
										  <div className="bounce2 bounce"></div>
										  <div className="bounce3 bounce"></div>
									</div>
								}
							</button>
					: <a target="_blank" href={`${link}`} rel="noopener noreferrer">{link}</a>
				}
			</td>
		</tr>
	)
}

export default MercadoCripto;
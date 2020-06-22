import React from 'react';
import { useSelector } from 'react-redux';

import MercadoCripto from '../Molecules/MercadoCripto';

const MercadosCriptomoneda = () => {

	const mercados = useSelector(state => state.mercadosCriptomonedas.mercados);

	return (
		<div className="mt-5 w-100 mercados">
			<h2 className="mb-4 text-center font-weight-bold">Best Exchange Offers</h2>
			
			<table className="table tabla-mercados table-responsive">
				<tbody>
					{
						mercados.map((element, index) => (
							<MercadoCripto 
								key={index}
								mercadoDatos={element}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default MercadosCriptomoneda;
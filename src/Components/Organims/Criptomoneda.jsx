import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import EstadisticasCriptomoneda from '../Molecules/EstadisticasCriptomoneda';
import SimboloCriptomoneda from '../Molecules/SimboloCriptomoneda';
import CambioMoneda from '../Molecules/CambioMoneda';

const Criptomoneda = () => {

	const criptomoneda = useSelector( state => state.criptomonedas.criptomoneda );
	const variacionEstado = useSelector( state => state.variacionCriptomonedas.variacionEstado );
	const mayorMenorPrecio = useSelector( state => state.variacionCriptomonedas.mayorMenorPrecio );

	const [promedioPrecio, guardarPromedioPrecio] = useState(0);

	useEffect(() => {
		let promedio = 0;

		if (!variacionEstado) { // Logica que permite obtener el precio promedio de las ultimas 24 horas
			let priceUsd = criptomoneda.priceUsd >= 1000 ? (Number(criptomoneda.priceUsd).toFixed(0) / 1000).toFixed(2) : Number(criptomoneda.priceUsd).toFixed(2);

			promedio = (Number(priceUsd) + Number(mayorMenorPrecio.menorPrecio) + Number(mayorMenorPrecio.mayorPrecio)) / 3;

			guardarPromedioPrecio(promedio.toFixed(2));
		}

	}, [variacionEstado, criptomoneda, mayorMenorPrecio]);

	return (
		<React.Fragment>
			{
				Object.keys(criptomoneda).length > 0 ? <React.Fragment>
					<SimboloCriptomoneda 
						criptomoneda={criptomoneda}
					/>

					<EstadisticasCriptomoneda 
						criptomoneda={criptomoneda}
						mayorMenorPrecio={mayorMenorPrecio}
						promedioPrecio={promedioPrecio}
					/>

					<CambioMoneda 
						criptomoneda={criptomoneda}
					/>
				</React.Fragment> : null
			}
		</React.Fragment>
	)
}

export default Criptomoneda;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerCriptomonedaAction } from '../../actions/criptomonedasAction';
import { precioUltimas24horasAction } from '../../actions/variacionCriptomonedaAction';
import { criptomonedasMercadosAction } from '../../actions/mercadosCriptomonedasAction';

import Error from '../Atoms/Error';
import Criptomoneda from '../Organims/Criptomoneda';
import Grafica from '../Molecules/Grafica';
import MercadosCriptomoneda from '../Organims/MercadosCriptomoneda';

const Coin = ({ match }) => {

	const dispatch = useDispatch();

	const { id } = match.params;

	const variacionEstado = useSelector( state => state.variacionCriptomonedas.variacionEstado );
	const errorCargar = useSelector( state => state.variacionCriptomonedas.errorServidor );

	const [estadoComponente, guardarEstadoComponente] = useState(false);

	useEffect(() => {
		if (!estadoComponente) { //Solo se ejecuta la primera vez, lo que hay dentro de este bloque, evitando que se genere un bucle infinito.
			dispatch( obtenerCriptomonedaAction(id) );
			dispatch( precioUltimas24horasAction(id) );
			dispatch( criptomonedasMercadosAction(id) );
			guardarEstadoComponente(true);
		}
		
	}, [dispatch, id, estadoComponente]);

	return (
		<React.Fragment>
			{
				variacionEstado ? <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-danger"></div>
				</div>
				: <React.Fragment>
					{
						errorCargar ? <div className="container"> <Error /> </div>
						: <div className="row mt-5 pb-0 pt-5 px-5 criptomoneda no-gutters">
							<Criptomoneda />
							<Grafica />
							<MercadosCriptomoneda />
						</div> 
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default Coin;
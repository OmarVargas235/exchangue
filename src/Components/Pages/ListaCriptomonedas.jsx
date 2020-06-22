import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerCriptomonedasAction } from '../../actions/criptomonedasAction';
import { recetearEstadosGlobalesAction, recetearVariacionUltimas24HorasAction } from '../../actions/variacionCriptomonedaAction';

import Error from '../Atoms/Error';
import CriptomonedaDatos from '../Molecules/CriptomonedaDatos';

const ListaCriptomonedas = () => {

	const dispatch = useDispatch();

	const obtenerCriptomonedas = useSelector( state => state.criptomonedas.criptomonedas );
	const loadingCriptomonedas = useSelector( state => state.criptomonedas.loadingCriptomonedas );
	const errorCargar = useSelector( state => state.criptomonedas.errorServidor );

	const [criptomonedas, guardarCriptomonedas] = useState([]);
	const [estadoObtenerCriptomonedas, guardarEstadoObtenerCriptomonedas] = useState(false);
	const [busqueda, guardarBusqueda] = useState('');

	useEffect(() => {
		let criptomonedasFiltradas = [];

		if (!estadoObtenerCriptomonedas) { //Solo se ejecuta la primera vez, lo que hay dentro de este bloque.
			dispatch( obtenerCriptomonedasAction() );
			dispatch( recetearEstadosGlobalesAction() );
			dispatch( recetearVariacionUltimas24HorasAction() );
			guardarCriptomonedas(obtenerCriptomonedas);
			guardarEstadoObtenerCriptomonedas(true);

			return;
		}
		
		for (let element of obtenerCriptomonedas) {//Filtra las monedas por nombre
			if ((element.name.toLowerCase()).indexOf(busqueda) === 0) criptomonedasFiltradas.push(element);
		}
		
		if (estadoObtenerCriptomonedas) guardarCriptomonedas(criptomonedasFiltradas);

	}, [dispatch, busqueda, obtenerCriptomonedas, estadoObtenerCriptomonedas]);
	
	return (
		<React.Fragment>
			{
				loadingCriptomonedas ? <div className="d-flex justify-content-center mt-5">
					<div className="spinner-border text-danger"></div>
				</div>
				: <React.Fragment>
					{
						errorCargar ? <div className="container"> <Error /> </div>
						: <div className="mx-0 mx-sm-4 mx-md-5 my-5">
							<table className="table table-hover">
								<thead>
									<tr>
										<th className="d-none d-md-table-cell">Ranking</th>
										<th>Name</th>
										<th>Price</th>
										<th className="d-none d-md-table-cell">Market Cap</th>
										<th>24 hr Variation</th>
										<th>
											<input 
												type="text" 
												placeholder="Search..." 
												className="search d-none d-md-table-cell" 
												onChange={ e => guardarBusqueda(e.target.value.toLowerCase()) }
											/>
										</th>
									</tr>
								</thead>

								<tbody>
									{
										criptomonedas.map(element => (
											<CriptomonedaDatos 
												key={element.id}	
												criptomoneda={element}
											/>
										))
									}
								</tbody>
							</table>
						</div>
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default ListaCriptomonedas;
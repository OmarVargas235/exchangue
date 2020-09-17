import React, { useState, useEffect, useRef } from 'react';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import { useDispatch, useSelector } from 'react-redux';
import { obtenerCriptomonedasAction } from '../../redux/actions/criptomonedasAction';
import { recetearEstadosGlobalesAction, recetearVariacionUltimas24HorasAction } from '../../redux/actions/variacionCriptomonedaAction';

import { ReactComponent as FlechaIzquierda } from '../../assets/flecha-hacia-la-izquierda.svg';
import { ReactComponent as FlechaDerecha } from '../../assets/punto-de-flecha-a-la-derecha.svg';
import Error from '../Atoms/Error';
import CriptomonedaDatos from '../Molecules/CriptomonedaDatos';

const override = css`
  display: block;
  margin: 0 auto;
`;

const ListaCriptomonedas = () => {

	const dispatch = useDispatch();

	const obtenerCriptomonedas = useSelector( state => state.criptomonedas.criptomonedas );
	const loadingCriptomonedas = useSelector( state => state.criptomonedas.loadingCriptomonedas );
	const errorCargar = useSelector( state => state.criptomonedas.errorServidor );

	const [criptomonedas, guardarCriptomonedas] = useState([]);
	const [estadoObtenerCriptomonedas, guardarEstadoObtenerCriptomonedas] = useState(false);
	const [busqueda, guardarBusqueda] = useState('');
	const [selected, guardarSelected] = useState(10);
	const [paginaInicial, guardarPaginaInicial] = useState(0);
	const [paginaFinal, guardarPaginaFinal] = useState(selected);

	useEffect(() => {
		let criptomonedasFiltradas = [];

		if (!estadoObtenerCriptomonedas) { //Solo se ejecuta la primera vez, lo que hay dentro de este bloque.
			dispatch( obtenerCriptomonedasAction() );
			dispatch( recetearEstadosGlobalesAction() );
			dispatch( recetearVariacionUltimas24HorasAction() );
			guardarEstadoObtenerCriptomonedas(true);

			return;
		}

		const filterCriptomoneda = obtenerCriptomonedas.filter((el, index) => {
			let divisor = 1;

			switch (String(selected)) {
				case '5': divisor = 4; break;
				case '10': divisor = 2; break;
				case '15': divisor = obtenerCriptomonedas.length - 5; break;
				default: 
					flechaDerechaRef.current.classList.add('desabilitar-flecha'); 
					flechaIzquierdaRef.current.classList.add('desabilitar-flecha');
					return el;
			}
			
			return divisor === 15 ? (index < divisor) : index < (obtenerCriptomonedas.length / divisor);
		});

		guardarCriptomonedas(filterCriptomoneda);

		if (busqueda.trim() === '') return;
		
		for (let element of obtenerCriptomonedas) {//Filtra las monedas por nombre
			if ((element.name.toLowerCase()).indexOf(busqueda) === 0) criptomonedasFiltradas.push(element);
		}
		
		guardarCriptomonedas(criptomonedasFiltradas);


	}, [selected, dispatch, busqueda, obtenerCriptomonedas, estadoObtenerCriptomonedas]);

	const flechaIzquierdaRef = useRef('');
	const flechaDerechaRef = useRef('');

	const cambiarSelect = e => {
		flechaDerechaRef.current.classList.remove('desabilitar-flecha');
		flechaIzquierdaRef.current.classList.add('desabilitar-flecha');
		guardarSelected(Number(e.target.value));
		guardarPaginaInicial(0);
		guardarPaginaFinal(Number(e.target.value));
	}

	const paginaPrevia = () => {
		let inicial = paginaInicial - selected, 
			final = paginaFinal - selected;
		
		if (inicial < 0) return;
		
		siguiente_anterior(inicial, final, flechaDerechaRef, flechaIzquierdaRef, 0, '1', -1);
	}

	const paginaSiguiente = () => {
		let inicial = paginaInicial + selected, 
			final = selected === 15 ? paginaFinal + 5 : paginaFinal + selected;
	
		if (final > 20) return;

		siguiente_anterior(inicial, final, flechaIzquierdaRef, flechaDerechaRef, null, '20', 1);
	}

	const siguiente_anterior = (inicial, final, flechaRef, flecha2Ref, index, rank, multiplo) => {
		const array = [];

		for (let i = inicial; i < final; i++) array.push(obtenerCriptomonedas[i]);
		
		flechaRef.current.classList.remove('desabilitar-flecha');
		flechaRef.current.classList.add('habilitar-flecha');
		
		array[index === null ? array.length - 1 : index].rank === rank 
		&& flecha2Ref.current.classList.add('desabilitar-flecha');
		
		guardarPaginaInicial(paginaInicial + (selected * multiplo));
		guardarPaginaFinal(paginaFinal + (selected * multiplo));
		guardarCriptomonedas(array);
	}

	return (
		<React.Fragment>
			{
				loadingCriptomonedas ? <div className="sweet-loading mt-5">
					<CircleLoader
			          css={override}
			          size={100}
			          color={"#4E7294"}
			          loading={loadingCriptomonedas}
			        />
				</div>
				: <React.Fragment>
					{
						errorCargar ? <div className="container"> <Error /> </div>
						: <div className="mx-0 mx-sm-4 mx-md-5 my-5 animate__animated animate__fadeIn">
							<table className="table table-hover mb-0">
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

							<div className="d-flex justify-content-end fila-paginas">
								<div className="p-3 d-flex align-items-center">Filas por página:</div>
								<div className="p-3">
									  <select 
									  	className="custom-select" 
									  	value={selected}
									  	onChange={cambiarSelect}
									  >
									    <option value="5">5</option>
									    <option value="10">10</option>
									    <option value="15">15</option>
									    <option value="20">Todos</option>
									  </select>
								</div>
								<div className="p-3 d-flex align-items-center">
									{paginaInicial + 1}-{paginaFinal > 20 ? 20 : paginaFinal} de 20
								</div>
								<div className="p-3 d-flex align-items-center">
									<span className="mr-4 desabilitar-flecha" ref={flechaIzquierdaRef}>
										<FlechaIzquierda onClick={paginaPrevia} />
									</span>
									<span ref={flechaDerechaRef} className="habilitar-flecha">
										<FlechaDerecha onClick={paginaSiguiente} />
									</span>
								</div>
							</div>
						</div>
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default ListaCriptomonedas;
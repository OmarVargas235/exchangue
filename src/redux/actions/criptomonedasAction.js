import {
	OBTENER_CRIPTOMONEDAS,
	OBTENER_CRIPTOMONEDAS_EXITO,
	OBTENER_CRIPTOMONEDAS_FRACASO,
	OBTENER_CRIPTOMONEDA,
	OBTENER_CRIPTOMONEDA_EXITO,
	OBTENER_CRIPTOMONEDA_FRACASO
} from '../types/';

const url = 'https://api.coincap.io/v2/assets?limit=20';

//Obtiene todas las criptomonedas

export const obtenerCriptomonedasAction = () => {
	return async dispatch => {
		dispatch( obtenerCriptomonedas() );

		try {
			const consulta = await fetch(url);	
			const resultado = await consulta.json();
			
			dispatch( obtenerCriptomonedasExito(resultado.data) );	
	
		} catch {
			console.log("Error obtenerCriptomonedasAction");
			dispatch( obtenerCriptomonedasFracaso() );	
		}
	}
}

const obtenerCriptomonedas = () => ({
	type: OBTENER_CRIPTOMONEDAS
})

const obtenerCriptomonedasExito = response => ({
	type: OBTENER_CRIPTOMONEDAS_EXITO,
	payload: response
})

const obtenerCriptomonedasFracaso = () => ({
	type: OBTENER_CRIPTOMONEDAS_FRACASO
})

//Obtiene una sola criptomoneda

export const obtenerCriptomonedaAction = id => {
	return async dispatch => {
		dispatch( obtenerCriptomoneda() );

		try {
			const consulta = await fetch(`https://api.coincap.io/v2/assets/${id.toLowerCase()}`);	
			const resultado = await consulta.json();
			
			dispatch( obtenerCriptomonedaExito(resultado.data) );	
	
		} catch {
			console.log("Error");
			dispatch( obtenerCriptomonedaFracaso() );	
		}
	}
}

const obtenerCriptomoneda = () => ({
	type: OBTENER_CRIPTOMONEDA
})

const obtenerCriptomonedaExito = response => ({
	type: OBTENER_CRIPTOMONEDA_EXITO,
	payload: response
})

const obtenerCriptomonedaFracaso = () => ({
	type: OBTENER_CRIPTOMONEDA_FRACASO
})
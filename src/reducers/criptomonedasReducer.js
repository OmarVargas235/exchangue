import {
	OBTENER_CRIPTOMONEDAS,
	OBTENER_CRIPTOMONEDAS_EXITO,
	OBTENER_CRIPTOMONEDAS_FRACASO,
	OBTENER_CRIPTOMONEDA,
	OBTENER_CRIPTOMONEDA_EXITO,
	OBTENER_CRIPTOMONEDA_FRACASO
} from '../types/';

const initialState = {
	criptomonedas: [],
	criptomoneda: {},
	loadingCriptomonedas: true,
	loadingCriptomoneda: true,
	errorServidor: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		//Obtiene informacion de 20 criptomonedas
		case OBTENER_CRIPTOMONEDAS:
			return {
				...state,
				loadingCriptomonedas: true
			}

		case OBTENER_CRIPTOMONEDAS_EXITO:
			return {
				...state,
				criptomonedas: action.payload,
				loadingCriptomonedas: false
			}

		case OBTENER_CRIPTOMONEDAS_FRACASO:
			return {
				...state,
				errorServidor: true,
				loadingCriptomonedas: false
			}
		//Obtiene criptomoneda por id
		case OBTENER_CRIPTOMONEDA:
			return {
				...state,
				loadingCriptomoneda: true
			}

		case OBTENER_CRIPTOMONEDA_EXITO:
			return {
				...state,
				criptomoneda: action.payload,
				loadingCriptomoneda: false
			}

		case OBTENER_CRIPTOMONEDA_FRACASO:
			return {
				...state,
				loadingCriptomoneda: true
			}

		default: return state;
	}
}
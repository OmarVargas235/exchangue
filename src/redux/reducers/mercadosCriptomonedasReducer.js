import {
	CRIPTOMONEDAS_MERCADOS,
	CRIPTOMONEDAS_MERCADOS_EXITO,
	CRIPTOMONEDAS_MERCADOS_FRACASO
} from '../types/';

const initialState = {
	mercados: [],
	loadingMercados: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CRIPTOMONEDAS_MERCADOS:
			return {
				...state,
				loadingMercados: true
			}

		case CRIPTOMONEDAS_MERCADOS_EXITO:
			return {
				...state,
				mercados: action.payload,
				loadingMercados: false
			}

		case CRIPTOMONEDAS_MERCADOS_FRACASO:
			return {
				...state,
				loadingMercados: true
			}

		default: return state;
	}
}
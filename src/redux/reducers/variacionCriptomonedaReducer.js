import {
	OBTENER_VARIACION,
	OBTENER_VARIACION_EXITO,
	OBTENER_VARIACION_FRACASO,
	OBTENER_VARIACION_24HORAS,
	RECETEAR_ESTADOS_GLOBALES,
	RECETEAR_VARIACION_24HORAS
} from '../types/';

const initialState = {
	mayorMenorPrecio: {},
	variacionEstado: true,
	variacion24Horas: [],
	errorServidor: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		//Variacion de criptomoneda
		case OBTENER_VARIACION:
			return {
				...state,
				variacionEstado: true
			}

		case OBTENER_VARIACION_EXITO:
			return {
				...state,
				mayorMenorPrecio: action.payload,
				variacionEstado: false
			}

		case OBTENER_VARIACION_FRACASO:
			return {
				...state,
				variacionEstado: false,
				errorServidor: true
			}

		//Todas la variaciones en las ultimas 24 horas
		case OBTENER_VARIACION_24HORAS:
			return {
				...state,
				variacion24Horas: action.payload
			}

		//Recetea la 'variacion' del estado global a su estado por defecto
		case RECETEAR_ESTADOS_GLOBALES:
			return {
				...state,
				variacionEstado: true
			}

		//Recetea la variacion de la criptomoneda en las ultimas 24 horas a su estado por defecto.
		case RECETEAR_VARIACION_24HORAS:
			return {
				...state,
				variacion24Horas: []
			}

		default: return state;
	}
}
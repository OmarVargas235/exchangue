import {
	OBTENER_VARIACION,
	OBTENER_VARIACION_EXITO,
	OBTENER_VARIACION_FRACASO,
	OBTENER_VARIACION_24HORAS,
	RECETEAR_ESTADOS_GLOBALES,
	RECETEAR_VARIACION_24HORAS
} from '../types/';

//Trae el precio de la criptomoneda en las ultimas 24 horas

export const precioUltimas24horasAction = id => {
	const now = new Date(); 
	const end = now.getTime();

	now.setDate(now.getDate() - 1);
	const start = now.getTime(); 

	const url = `https://api.coincap.io/v2/assets/${id}/history?interval=h1&start=${start}&end=${end}`;

	return async dispatch => {
		dispatch( obtenerVariacion() );

		try {
			const consulta = await fetch(url);	
			const resultado = await consulta.json();
			
			const pricesUsdArray = resultado.data.map(element => element.priceUsd >= 1000 ? Number(element.priceUsd).toFixed(0) : element.priceUsd);// Reduce el numero de unidades del precio. 

			const mayorPrecio = Math.max(...pricesUsdArray) >= 1000 ? (Math.max(...pricesUsdArray) / 1000).toFixed(2) : Math.max(...pricesUsdArray).toFixed(2); //Obtiene el mayor precio en las ultimas 24 horas.

			const menorPrecio = Math.min(...pricesUsdArray) >= 1000 ? (Math.min(...pricesUsdArray) / 1000).toFixed(2) : Math.min(...pricesUsdArray).toFixed(2); //Obtiene el menor precio en las ultimas 24 horas.

			const objetoPrecios = {
				menorPrecio,
				mayorPrecio
			}
			
			dispatch( obtenerVariacionExito(objetoPrecios) );
			dispatch( obtenerVariacion24Horas(resultado.data) );

		} catch {
			console.log("error de variacionCriptomonedaAction");
			dispatch( obtenerVariacionError() );
		}
	}
} 

const obtenerVariacion = () => ({
	type: OBTENER_VARIACION
})

const obtenerVariacionExito = data => ({
	type: OBTENER_VARIACION_EXITO,
	payload: data
})

const obtenerVariacionError = () => ({
	type: OBTENER_VARIACION_FRACASO
})

const obtenerVariacion24Horas = data => ({
	type: OBTENER_VARIACION_24HORAS,
	payload: data
})

//Recetea 'loadingCriptomoneda' y 'variacion' del estado global a su estado por defecto

export const recetearEstadosGlobalesAction = () => ({
	type: RECETEAR_ESTADOS_GLOBALES
})

//Recetea variacion de las ultimas 24 horas.
export const recetearVariacionUltimas24HorasAction = () => ({
	type: RECETEAR_VARIACION_24HORAS
})
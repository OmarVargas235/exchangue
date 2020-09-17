import {
	CRIPTOMONEDAS_MERCADOS,
	CRIPTOMONEDAS_MERCADOS_EXITO,
	CRIPTOMONEDAS_MERCADOS_FRACASO
} from '../types/';

//Obtener los 5 ofertas mas altas de los mercados

export const criptomonedasMercadosAction = criptomoneda => {
	
	const url = `https://api.coincap.io/v2/assets/${criptomoneda}/markets?limit=5`;

	return async dispatch => {
		dispatch( criptomonedasMercados() );
		
		try {
			const consulta = await fetch(url);	
			const resultado = await consulta.json();

			dispatch( criptomonedasMercadosExito(resultado.data) );

		} catch {
			console.log("error de peticion");
			dispatch( criptomonedasMercadosFracaso() );
		}
	}
}

const criptomonedasMercados = () => ({
	type: CRIPTOMONEDAS_MERCADOS
});

const criptomonedasMercadosExito = data => ({
	type: CRIPTOMONEDAS_MERCADOS_EXITO,
	payload: data
});

const criptomonedasMercadosFracaso = () => ({
	type: CRIPTOMONEDAS_MERCADOS_FRACASO
});
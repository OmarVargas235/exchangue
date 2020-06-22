export const conversionUsdCriptomoneda = (numberMoneda, precioUnDolar) => { 
	let conversion = numberMoneda / Number(precioUnDolar).toFixed(4);

	return conversion.toFixed(4);
} //Funcion que convierte de dolares a la respectiva criptomoneda

export const conversionCriptomonedaUsd = (numberMoneda, precioUnDolar) => {
	let conversion = numberMoneda * Number(precioUnDolar).toFixed(4);

	return conversion.toFixed(4);
}//Funcion que convierte la respectiva criptomoneda a dolares

export const graficaHora = () => { //Funcion que obtiene las ultimas 24 horas
	const now = new Date();
	
	let horaFormato12 = now.getHours() > 12 ? now.getHours() - 11 : now.getHours() + 1, arrayHoras = [], 
		horaFormato24 = now.getHours() + 1;

	for (let i = 1; i <= 24; i++) {
		horaFormato24 = horaFormato24 > 24 ? (horaFormato24 - 24) : horaFormato24;
		
		let amPm = (horaFormato24 >= 12 && horaFormato24 !== 24) ? 'p.m.' : 'a.m.';

		horaFormato12 = horaFormato12 > 12 ? (horaFormato12 - 12) : horaFormato12;
		arrayHoras.push(horaFormato12 + ":00 " + amPm);

		horaFormato12++;
		horaFormato24++;
	}
	
	return arrayHoras;
}
import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';
import { graficaHora } from '../../utils/helper';

const Grafica = () => {

	const variacion24Horas = useSelector( state => state.variacionCriptomonedas.variacion24Horas );

	const [grafica, guardarGrafica] = useState({})
	
	useEffect(() => {
		if (variacion24Horas.length === 0) return;
		let variacion = variacion24Horas.map(element => element.priceUsd >= 1000 ? parseInt(element.priceUsd) / 1000 : parseInt(element.priceUsd));
		let variacionPrecios = variacion, etiquetas = graficaHora();

	// let variacionPrueba = variacion24Horas.map(element => Number(element.priceUsd).toFixed(0) / 1000);
		// let variacionPruebaLista = variacionPrueba.join('-').split('.').join(',').split('-');
		// let variacion = variacion24Horas.map(element => Number(element.priceUsd).toFixed(0) / 1000);
		// let variacionPrecios = variacion, etiquetas = graficaHora();

		guardarGrafica({
			options: {
				chart: {
					id: "grafica-area"
				},
				// Los colores. En este caso sólo es uno pero puede haber más si tenemos más datos
		    	// por ejemplo si mostrásemos del 2018 y 2019
		    	colors: ['#008FFB'],
				stroke: {
		        	//La curvatura al unir los puntos
		        	//smooth o straight. smooth es más suave y straight es rígido
		        	curve: 'smooth',
		    	},
				dataLabels: {
		        	enabled: false, // No mostrar las etiquetas sin hacer hover
		    	},
				title: {
			    	text: 'Last 24 Hours', //El título como cadena
			        align: 'center', //Alineación. Puede ser left, right o center
			        margin: 30,
			        offsetY: 15,
			        style: {
					    fontSize: '24px',
				        fontWeight: 'bold',
				        color: '#4A5568'
				    }
			    },
				xaxis: {
					categories: etiquetas,
		        	labels: {
			        	rotate: 0,
			        	hideOverlappingLabels: true,
			        	offsetX: 10,
			        	rotateAlways: false
		        	}
				}
			},
			series: [{
				name: "STOCK ABC",
				data: variacionPrecios
			}]
		});

	}, [variacion24Horas]);

	return (
		<React.Fragment>
			{
				Object.keys(grafica).length > 0 ?
				<div className="contenedor-grafica mt-5">
					<div className="grafica" id="contenedorGrafica">
						<Chart
			              options={grafica.options}
			              series={grafica.series}
			              type="area"
			              height="380"
			            />
					</div>
			    </div>
			    : null
			}
		</React.Fragment>
	)
}

export default Grafica;
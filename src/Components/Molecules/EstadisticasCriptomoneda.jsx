import React from 'react';

const EstadisticasCriptomoneda = ({ criptomoneda, mayorMenorPrecio, promedioPrecio }) => (
	<div className="col-12 col-lg-6 mb-5 mb-lg-0">
		<div className="col-12 d-flex justify-content-between mb-2">
			<span className="col-6 font-weight-bold">RANKING</span>
			<span className="col-6 text-right font-weight-bold">#{criptomoneda.rank}</span>
		</div>

		<div className="col-12 d-flex justify-content-between mb-2">
			<span className="col-6 font-weight-bold">ACTUAL PRICE</span>
			<span className="col-6 text-right font-weight-bold">$ {
				Number(criptomoneda.priceUsd) >= 1000 ?
				  (Number(criptomoneda.priceUsd).toFixed(0) / 1000).toFixed(2) + ' k'
				: Number(criptomoneda.priceUsd).toFixed(2)
			}</span>
		</div>

		<div className="col-12 d-flex justify-content-between mb-2">
			<span className="col-6 font-weight-bold">LOWEST PRICE</span>
			<span className="col-6 text-right font-weight-bold">$ {
				Number(criptomoneda.priceUsd) >= 1000 ?
				  mayorMenorPrecio.menorPrecio + ' k'
				: mayorMenorPrecio.menorPrecio
			}</span>
		</div>

		<div className="col-12 d-flex justify-content-between mb-2">
			<span className="col-6 font-weight-bold">HIGHEST PRICE</span>
			<span className="col-6 text-right font-weight-bold">$ {
				Number(criptomoneda.priceUsd) >= 1000 ?
				  mayorMenorPrecio.mayorPrecio + ' k'
				: mayorMenorPrecio.mayorPrecio
			}</span>
		</div>

		<div className="col-12 d-flex justify-content-between mb-2">
			<span className="col-6 font-weight-bold">AVERAGE PRICE</span>
			<span className="col-6 text-right font-weight-bold">$ {
				Number(criptomoneda.priceUsd) >= 1000 ?
				  promedioPrecio + ' k'
				: promedioPrecio
			}</span>
		</div>

		<div className="col-12 d-flex justify-content-between mb-2">
			<span className="col-6 font-weight-bold">24 HRS VARIATION</span>
			<span className="col-6 text-right font-weight-bold">{Number(criptomoneda.changePercent24Hr).toFixed(2)} %</span>
		</div>
	</div>
)

export default EstadisticasCriptomoneda;
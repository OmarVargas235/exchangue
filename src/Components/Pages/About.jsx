import React from 'react';
import { useDispatch } from 'react-redux';
import { recetearEstadosGlobalesAction, recetearVariacionUltimas24HorasAction } from '../../actions/variacionCriptomonedaAction';
import { Link } from 'react-router-dom';
const About = () => {

	const dispatch = useDispatch();
	dispatch( recetearEstadosGlobalesAction() );
	dispatch( recetearVariacionUltimas24HorasAction() );

	return (
		<div className="container text-center my-5 about">
			<h1>Exchange v1.0.0</h1>
			<p>Project to obtain the quotes of the most important cryptocurrencies through the Coincap 
			REST API.</p>
			<Link className="btn btn-color px-3 font-weight-bold" to={'/'}>Back to Home</Link>
		</div>
	)
}

export default About;
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<nav className="navbar navbar-blue header">
		<div className="container py-1">
			<Link className="d-flex align-items-center" to={'/'}>
				<img src="/archivos/simbolo-de-tipo-de-cambio-de-bitcoin.png" alt="simbolo" />
				
				<p className="text-light ml-2 font-weight-bold">Exchange</p>	
			</Link>

			<Link className="btn btn-color py-2 px-4" to={'/about'}>About</Link>
		</div>
	</nav>
)

export default Header;
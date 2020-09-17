import React from 'react';
import store from './redux/store';
import 'animate.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Components/Pages/Header';
import ListaCriptomonedas from './Components/Pages/ListaCriptomonedas';
import About from './Components/Pages/About';
import Coin from './Components/Pages/Coin';
import Footer from './Components/Pages/Footer';

const App = () => (
	<Router>
		<Header />
		
		<Provider store={store}>
			<Switch>
				<Route exact path="/" component={ListaCriptomonedas} />
				<Route path="/about" component={About} />
				<Route path="/coin/:id" component={Coin} />
			</Switch>
		</Provider>

		<Footer />
	</Router>
)

export default App;
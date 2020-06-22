import { combineReducers } from 'redux';
import criptomonedasReducer from './criptomonedasReducer';
import variacionCriptomonedaReducer from './variacionCriptomonedaReducer';
import mercadosCriptomonedasReducer from './mercadosCriptomonedasReducer';

export default combineReducers({
	criptomonedas: criptomonedasReducer,
	variacionCriptomonedas: variacionCriptomonedaReducer,
	mercadosCriptomonedas: mercadosCriptomonedasReducer
})
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

const reducerNumero = (state = 2,action)=>{
	var newState = Object.assign({},state);
	if (action.type === 'AUM') {
		newState = state+1;
		return newState;
	}else if(action.type === 'DIS'){
		newState = state-1;
		return newState;
	}
	return state;
}

const reducerTareas = (state = [],action)=>{
	var newState = Object.assign({},state);
	if (action.type === 'ADD') {
		newState = state.concat([{tarea: action.tarea, id: action.id}]);
		return newState;
	}
	return state;
}

const reducerID = (state=1, action)=>{
	var newState = Object.assign({},state);
	if (action.type==='ADD') {
		newState = state + 1;
		return newState;
	}
	return state;
}
//combineReducers toma un objeto javascript con los demás reducers como valores
const reducer = combineReducers({
	numero: reducerNumero,
	tareas: reducerTareas,
	id: reducerID
});

//const state = { cantidad: 2 };

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
	//I.Implementar el provider
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));

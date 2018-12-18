import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';  
import thunk from 'redux-thunk';  
import { createLogger } from 'redux-logger'
import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom'

import App from './App';

//style
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './index.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './spectre-overrides.css'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const store = createStore(
	reducers,
	applyMiddleware(...middleware)
)

render(
	< Provider store={store} >
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
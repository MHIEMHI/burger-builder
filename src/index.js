import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';

Axios.interceptors.request.use(request =>
{
	return request;
},
	error =>
	{
		return Promise.reject();
	}
);

Axios.interceptors.response.use(request =>
{
	return request;
},
	error =>
	{
		return Promise.reject();
	}
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

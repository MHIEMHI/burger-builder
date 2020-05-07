import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request =>
{
	return request;
},
	error =>
	{
		return Promise.reject();
	}
);

axios.interceptors.response.use(request =>
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

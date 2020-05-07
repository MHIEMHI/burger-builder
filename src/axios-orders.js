import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-eb0d7.firebaseio.com/'
});

export default instance;
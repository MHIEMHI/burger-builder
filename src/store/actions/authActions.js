import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>
{
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = authData =>
{
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData
	};
};

export const authFail = error =>
{
	return {
		type: actionTypes.AUTH_FAILED,
		error
	};
};

export const auth = (email, password) =>
{
	return dispatch =>
	{
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true
		};
		axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqi1LeTPnbuG7oixmtUud4SVa1g4FUCxg', authData)
			.then(response =>
			{
				dispatch(authSuccess(response.data));
			})
			.catch(error =>
			{
				dispatch(authFail(error));
			});
	};
};

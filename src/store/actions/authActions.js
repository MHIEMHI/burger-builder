import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>
{
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) =>
{
	return {
		type: actionTypes.AUTH_SUCCESS,
		token,
		userId
	};
};

export const authFail = error =>
{
	return {
		type: actionTypes.AUTH_FAILED,
		error
	};
};

export const auth = (email, password, isSignUp) =>
{
	return dispatch =>
	{
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true
		};
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:${isSignUp ? 'signUp' : 'signInWithPassword'}?key=AIzaSyCqi1LeTPnbuG7oixmtUud4SVa1g4FUCxg`;
		axios.post(url, authData)
			.then(response =>
			{
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch(error =>
			{
				dispatch(authFail(error.response.data.error));
			});
	};
};

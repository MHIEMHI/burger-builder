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

export const logout = () =>
{
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};
export const checkAuthTimeout = expirationTime =>
{
	return dispatch =>
	{
		setTimeout(() =>
		{
			dispatch(logout());
		}, expirationTime * 1000);
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
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error =>
			{
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path =>
{
	return {
		type: actionTypes.SET_AUT_REDIRECT_PATH,
		path
	};
};
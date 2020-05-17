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
		type: actionTypes.AUTH_LOGOUT_START
	};
};

export const logoutSuccess = () =>
{
	return {
		type: actionTypes.AUTH_LOGOUT_SUCCESS
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
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:${isSignUp ? 'signUp' : 'signInWithPassword'}?key=${process.env.REACT_APP_API_KEY}`;
		axios.post(url, authData)
			.then(response =>
			{
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);
				localStorage.setItem('expirationDate', expirationDate);
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

export const authCheckState = () =>
{
	return dispatch =>
	{
		const token = localStorage.getItem('token');
		if (!token)
		{
			dispatch(logout());
		}
		else
		{
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date())
			{
				const userId = localStorage.removeItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
			else
			{
				dispatch(logout());
			}
		}
	};
}; 
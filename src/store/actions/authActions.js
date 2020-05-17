import * as actionTypes from './actionTypes';

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
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationTime
	};
};

export const auth = (email, password, isSignUp) =>
{
	return {
		type: actionTypes.AUTH_USER,
		email,
		password,
		isSignUp
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
	return {
		type: actionTypes.AUTH_CHECK_STATE
	};
}; 
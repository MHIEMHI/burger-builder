import { put, delay } from 'redux-saga/effects';
import Axios from 'axios';

import * as actionCreators from '../actions';

export function* logoutSaga(action) 
{
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('userId');
	yield localStorage.removeItem('expirationDate');
	yield put(actionCreators.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action)
{
	yield delay(action.expirationTime * 1000);
	yield put(actionCreators.logout());
}

export function* authUserSaga(action)
{
	yield put(actionCreators.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	let url = `https://identitytoolkit.googleapis.com/v1/accounts:${action.isSignUp ? 'signUp' : 'signInWithPassword'}?key=${process.env.REACT_APP_API_KEY}`;
	try
	{
		const response = yield Axios.post(url, authData);

		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('userId', response.data.localId);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
		yield put(actionCreators.checkAuthTimeout(response.data.expiresIn));
	}
	catch (error)
	{
		yield put(actionCreators.authFail(error.response.data.error));
	}
}

export function* authCheckStateSaga(action)
{
	const token = yield localStorage.getItem('token');
	if (!token)
	{
		yield put(actionCreators.logout());
	}
	else
	{
		const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
		if (expirationDate > new Date())
		{
			const userId = yield localStorage.removeItem('userId');
			yield put(actionCreators.authSuccess(token, userId));
			yield put(actionCreators.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
		}
		else
		{
			yield put(actionCreators.logout());
		}
	}
}
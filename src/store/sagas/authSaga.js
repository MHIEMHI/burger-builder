import { put, delay } from 'redux-saga/effects';

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
import { put } from 'redux-saga';

import { logout } from '../actions';

export function* logoutSaga(action) 
{
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('userId');
	yield localStorage.removeItem('expirationDate');
	yield put(logout());
}
import { takeEvery } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './authSaga';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth()
{
	yield takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
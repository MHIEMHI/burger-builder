import { takeEvery } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './authSaga';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth()
{
	yield takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}
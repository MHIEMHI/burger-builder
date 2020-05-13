import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const authStart = (state, action) => updateObject(state, { error: null, loading: true });
const authSuccess = (state, action) => updateObject(state, { token: action.token, userId: action.userId, error: null, loading: false });
const authFailed = (state, action) => updateObject(state, { error: action.error, loading: false });

const authReducer = (state = initialState, action) =>
{
	switch (action.type)
	{
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAILED: return authFailed(state, action);
		case actionTypes.AUTH_LOGOUT: return initialState;
		default: return state;
	}
};

export default authReducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirect: '/'
};

const authStart = (state, action) => updateObject(state, { error: null, loading: true });
const authSuccess = (state, action) => updateObject(state, { token: action.token, userId: action.userId, error: null, loading: false });
const authFailed = (state, action) => updateObject(state, { error: action.error, loading: false });
const setAuthRedirectPath = (state, action) => updateObject(state, { authRedirect: action.path });

const authReducer = (state = initialState, action) =>
{
	switch (action.type)
	{
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAILED: return authFailed(state, action);
		case actionTypes.AUTH_LOGOUT: return initialState;
		case actionTypes.SET_AUT_REDIRECT_PATH: return setAuthRedirectPath(state, action);
		default: return state;
	}
};

export default authReducer;
import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import * as actionCreators from '../actions';

export function* purchaseBurgerSaga(action)
{
	yield put(actionCreators.purchaseBurgerStart());
	try
	{
		const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
		yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.orderData));
	}
	catch (error)
	{
		yield put(actionCreators.purchaseBurgerFailed(error));
	}
}

export function* fetchOrdersSaga(action)
{

	yield put(actionCreators.fetchOrdersStart());
	try
	{
		const queryparams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
		const response = yield axios.get('/orders.json' + queryparams);
		const fetchedOrders = [];
		for (let key in response.data)
		{
			fetchedOrders.push({
				id: key,
				...response.data[key]
			});
		}
		yield put(actionCreators.fetchOrdersSuccess(fetchedOrders));
	}
	catch (error)
	{
		yield put(actionCreators.fetchOrdersFailed(error));
	}
}
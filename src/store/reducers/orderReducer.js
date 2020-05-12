import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const orderReducer = (state = initialState, action) =>
{
	switch (action.type)
	{
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const neworder = updateObject(action.orderData, { id: action.id });
			return updateObject(state,
				{
					loading: false,
					purchased: true,
					orders: state.orders.concat(neworder)
				});

		case actionTypes.PURCHASE_BURGER_FAILED:
			return updateObject(state, { loading: false });

		case actionTypes.FETCH_ORDERS_START:
		case actionTypes.PURCHASE_BURGER_START:
			return updateObject(state, { loading: true });

		case actionTypes.PURCHASE_INIT:
			return updateObject(state, { purchased: false });

		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateObject(state,
				{
					orders: action.orders,
					loading: false
				});

		case actionTypes.FETCH_ORDERS_FAILED:
			return updateObject(state,
				{
					error: action.error,
					orders: action.orders,
					loading: false
				});

		default:
			return state;
	}
};
export default orderReducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false
};
const orderReducer = (state = initialState, action) =>
{
	switch (action.type)
	{
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const neworder = {
				...action.orderData,
				id: action.id
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(neworder)
			};

		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				loading: false
			};

		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
};
export default orderReducer;
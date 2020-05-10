export const INCREMENT = 'INCREMENT';
export const increment = () =>
{
	return {
		type: INCREMENT
	};
};

export const DECREMENT = 'DECREMENT';
export const decrement = () =>
{
	return {
		type: DECREMENT
	};
};

export const ADD = 'ADD';
export const add = value =>
{
	return {
		type: ADD,
		value
	};
};

export const SUBTRACT = 'SUBTRACT';
export const subtract = value =>
{
	return {
		type: SUBTRACT,
		value
	};
};

export const STORE_RESULT = 'STORE_RESULT';
export const storeResult = result =>
{
	return {
		type: STORE_RESULT,
		result
	};
};

export const DELETE_RESULT = 'DELETE_RESULT';
export const deleteResult = result =>
{
	return {
		type: DELETE_RESULT,
		result
	};
};
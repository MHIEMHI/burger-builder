import React, { useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (state, action) =>
{
	switch (action.type)
	{
		case 'SET_INGREDIENTS':
			return action.ingredients;
		case 'ADD_INGREDIENTS':
			return [...state, action.ingredient];
		case 'DELETE_INGREDIENTS':
			return state.filter(ing => ing.id !== action.id);
		default: throw new Error('Should not be reached!');
	}
};

const httpReducer = (state, action) =>
{
	switch (action.type)
	{
		case 'SEND':
			return { loading: true, error: null };
		case 'RESPONSE':
			return { ...state, loading: false };
		case 'ERROR':
			return { error: action.error, loading: false };
		case 'CLEAR':
			return { ...state, error: null };
		default: throw new Error('Should not be reached!');
	}
};

function Ingredients()
{
	const [ingredients, dispatch] = useReducer(ingredientReducer, []);
	const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });

	const filteredIngredientsHandler = useCallback(ingredients =>
	{
		dispatch({
			type: 'SET_INGREDIENTS',
			ingredients
		});
	}, [dispatch]);

	const addIngredientHandler = ingredient =>
	{
		dispatchHttp({ type: 'SEND' });
		fetch(`${process.env.REACT_APP_BASE_URL}/ingredients.json`, {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json())
			.then(responseData =>
			{
				dispatchHttp({ type: 'RESPONSE' });
				dispatch({
					type: 'ADD_INGREDIENTS',
					ingredient: { id: responseData.name, ...ingredient }
				});
			});
	};

	const removeIngredientHandler = id =>
	{
		dispatchHttp({ type: 'SEND' });
		fetch(`${process.env.REACT_APP_BASE_URL}/ingredients/${id}.json`, {
			method: 'DELETE',
		}).then(response => response.json())
			.then(responseData =>
			{
				dispatchHttp({ type: 'RESPONSE' });
				dispatch({
					type: 'DELETE_INGREDIENTS',
					id
				});
			})
			.catch(error =>
			{
				dispatchHttp({ type: 'ERROR', error: error.message });
			});
	};

	const clearError = () =>
	{
		dispatchHttp({ type: 'CLEAR' });
	};

	return (
		<div className="App">
			{httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
			<IngredientForm addIngredient={addIngredientHandler} loading={httpState.loading} />

			<section>
				<Search setIngredients={filteredIngredientsHandler} />
				<IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients} />
			</section>
		</div>
	);
}

export default Ingredients;

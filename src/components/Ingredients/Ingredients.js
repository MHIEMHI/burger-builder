import React, { useState, useCallback, useReducer } from 'react';

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
		default: return state;
	}
};

function Ingredients()
{
	const [ingredients, dispatch] = useReducer(ingredientReducer, []);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const filteredIngredientsHandler = useCallback(ingredients =>
	{
		dispatch({
			type: 'SET_INGREDIENTS',
			ingredients
		});
	}, [dispatch]);

	const addIngredientHandler = ingredient =>
	{
		setIsLoading(true);
		fetch(`${process.env.REACT_APP_BASE_URL}/ingredients.json`, {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json())
			.then(responseData =>
			{
				setIsLoading(false);
				dispatch({
					type: 'ADD_INGREDIENTS',
					ingredient: { id: responseData.name, ...ingredient }
				});
			});
	};

	const removeIngredientHandler = id =>
	{
		setIsLoading(true);
		fetch(`${process.env.REACT_APP_BASE_URL}/ingredients/${id}.json`, {
			method: 'DELETE',
		}).then(response => response.json())
			.then(responseData =>
			{
				setIsLoading(false);
				dispatch({
					type: 'DELETE_INGREDIENTS',
					id
				});
			})
			.catch(error =>
			{
				setIsLoading(false);
				setError(error.message);
			});
	};

	const clearError = () =>
	{
		setError(null);
	};

	return (
		<div className="App">
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
			<IngredientForm addIngredient={addIngredientHandler} loading={isLoading} />

			<section>
				<Search setIngredients={filteredIngredientsHandler} />
				<IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients} />
			</section>
		</div>
	);
}

export default Ingredients;

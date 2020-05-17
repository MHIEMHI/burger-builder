import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients()
{
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const filteredIngredientsHandler = useCallback(filteredIngredients =>
	{
		setIngredients(filteredIngredients);
	}, []);

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
				setIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }]);
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
				setIngredients(prevState => prevState.filter(ing => ing.id !== id));
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

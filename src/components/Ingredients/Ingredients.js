import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients()
{
	const [ingredients, setIngredients] = useState([]);

	useEffect(() =>
	{
		!ingredients.length && fetch(process.env.REACT_APP_BASE_URL + 'ingredients.json')
			.then(response => response.json())
			.then(responseData =>
			{
				const loadedIngredients = [];
				for (const key in responseData)
				{
					loadedIngredients.push({ id: key, ...responseData[key] });
				}
				setIngredients(loadedIngredients);
			});
	}, [ingredients, setIngredients]);

	const addIngredientHandler = ingredient =>
	{
		fetch(process.env.REACT_APP_BASE_URL + '/ingredients.json', {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json())
			.then(responseData =>
			{
				setIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }]);

			});
	};

	const removeIngredientHandler = id =>
	{
		setIngredients(prevState => prevState.filter(ing => ing.id !== id));

	};
	return (
		<div className="App">
			<IngredientForm addIngredient={addIngredientHandler} />

			<section>
				<Search setIngredients={setIngredients} />
				<IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients} />
			</section>
		</div>
	);
}

export default Ingredients;

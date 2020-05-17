import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients()
{
	const [ingredients, setIngredients] = useState([]);

	const addIngredientHandler = ingredient =>
	{
		setIngredients(prevState => [...prevState, { id: Math.random().toString(), ...ingredient }]);
	};

	const removeIngredientHandler = id =>
	{
		setIngredients(prevState => prevState.filter(ing => ing.id !== id));

	};
	return (
		<div className="App">
			<IngredientForm addIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients} />
			</section>
		</div>
	);
}

export default Ingredients;

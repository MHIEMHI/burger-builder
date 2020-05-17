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

	return (
		<div className="App">
			<IngredientForm addIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientList onRemoveItem={() => { }} ingredients={ingredients} />
			</section>
		</div>
	);
}

export default Ingredients;

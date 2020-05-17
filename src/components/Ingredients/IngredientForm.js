import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props =>
{
	const [inputState, setInputState] = useState(
		{
			title: '',
			amount: ''
		});

	const submitHandler = event =>
	{
		event.preventDefault();
		// ...
	};

	const handleChange = e =>
	{
		setInputState({
			...inputState,
			[e.target.name]: e.target.value
		});
	};

	return (
		<section className="ingredient-form">
			<Card>
				<form onSubmit={submitHandler}>
					<div className="form-control">
						<label htmlFor="title">Name</label>
						<input type="text" name="title" id="title" value={inputState.title} onChange={handleChange} />
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input type="number" name="amount" id="amount" value={inputState.amount} onChange={handleChange} />
					</div>
					<div className="ingredient-form__actions">
						<button type="submit">Add Ingredient</button>
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;

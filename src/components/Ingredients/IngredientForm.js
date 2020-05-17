import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

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
		props.addIngredient(inputState);
	};

	const handleChange = e =>
	{
		const value = e.target.value;
		const key = e.target.name;
		setInputState(prevState => ({
			...prevState,
			[key]: value
		}));
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
						{props.loading && <LoadingIndicator />}
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;

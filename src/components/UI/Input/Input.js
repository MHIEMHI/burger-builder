import React from 'react';

import classes from './Input.module.css';

const Input = props =>
{
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (!props.valid && props.validation && props.touched)
	{
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType)
	{
		case ('input'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
			/>;
			break;

		case ('textarea'):
			inputElement = <textarea
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
			/>;
			break;

		case ('select'):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayName}
						</option>
					))}
				</select>
			);
			break;

		default:
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
			/>;
			break;
	}

	let validationError = null;
	if (!props.valid && props.touched)
	{
		validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default Input;
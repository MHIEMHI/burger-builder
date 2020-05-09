import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component
{
	state = {
		loading: false,
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					name: 'name',
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					name: 'email',
					type: 'email',
					placeholder: 'Your email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					name: 'street',
					type: 'text',
					placeholder: 'Your street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					name: 'zipCode',
					type: 'text',
					placeholder: 'Your zipCode'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					name: 'country',
					type: 'text',
					placeholder: 'Your country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					name: 'deliveryMethod',
					options: [
						{ value: 'fastest', displayName: 'Fastest' },
						{ value: 'cheapest', displayName: 'Cheapest' }
					]
				},
				value: 'fastest'
			}
		},
	};

	orderHandler = (e) =>
	{
		e.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm)
		{
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		};
		axios.post('/orders.json', order)
			.then(response =>
			{
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(error =>
			{
				this.setState({ loading: false });
			});
	};

	checkValidity = (value, rules) =>
	{
		let isValid = true;
		if (rules.required)
		{
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength)
		{
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength)
		{
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (e) =>
	{
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[e.target.name]
		};
		updatedFormElement.value = e.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[e.target.name] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};

	render()
	{
		let formElementArray = [];
		for (let key in this.state.orderForm)
		{
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{
					formElementArray.map(formElement => (
						<Input
							key={formElement.id}
							{...formElement.config}
							changed={this.inputChangedHandler}
						/>
					))
				}
				<Button btnType="Success">ORDER</Button>
			</form>
		);

		if (this.state.loading)
		{
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter  your Contact data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
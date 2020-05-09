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
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					name: 'email',
					type: 'email',
					placeholder: 'Your email'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					name: 'street',
					type: 'text',
					placeholder: 'Your street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					name: 'zipCode',
					type: 'text',
					placeholder: 'Your zipCode'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					name: 'country',
					type: 'text',
					placeholder: 'Your country'
				},
				value: ''
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
				value: ''
			}
		},
	};

	orderHandler = (e) =>
	{
		e.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer:
			{
				name: 'Mehdi',
				address:
				{
					street: 'Test street',
					zipCode: '50010',
					country: 'Morroco'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
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

	inputChangedHandler = (e) =>
	{
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[e.target.name]
		};
		updatedFormElement.value = e.target.value;
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
			<form>
				{
					formElementArray.map(formElement => (
						<Input
							key={formElement.id}
							{...formElement.config}
							changed={this.inputChangedHandler}
						/>
					))
				}
				<Button
					btnType="Success"
					clicked={this.orderHandler}
				>
					ORDER
				</Button>
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
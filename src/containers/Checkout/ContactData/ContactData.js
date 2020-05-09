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
					type: 'text',
					placeholder: 'Your name'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your zipCode'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your country'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
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

	render()
	{
		let form = (

			<form>
				{

				}
				<Input elementConfig="..." elementType="..." value=".." />
				<Input inputtype="input" type="email" name="email" placeholder="Your email" />
				<Input inputtype="input" type="text" name="street" placeholder="Your street" />
				<Input inputtype="input" type="text" name="zipCode" placeholder="Your zipCode" />
				<Input inputtype="input" type="text" name="country" placeholder="Your country" />
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
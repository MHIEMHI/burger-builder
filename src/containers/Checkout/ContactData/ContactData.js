import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions';

class ContactData extends Component
{
	state = {
		formIsValid: false,
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
				touched: false,
				errorMessage: 'Name is missing'
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
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
				errorMessage: 'Email is missing'
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
				touched: false,
				errorMessage: 'Street is missing'
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
					maxLength: 5,
					isNumeric: true
				},
				valid: false,
				touched: false,
				errorMessage: 'Please enter a valid zipCode'
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
				touched: false,
				errorMessage: 'Country is missing'
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
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
	};

	orderHandler = (e) =>
	{
		e.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm)
		{
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
			userId: this.props.userId
		};
		this.props.onPurchaseBurgerStart(order, this.props.token);
	};

	checkValidity = (value, rules) =>
	{
		let isValid = true;

		if (!rules)
		{
			return true;
		}

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

		if (rules.isEmail)
		{
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric)
		{
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
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

		let formIsValid = true;
		for (let inputIdentifiers in updatedOrderForm)
		{
			formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid });
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
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);

		if (this.props.loading)
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

const mapStateToProps = state => (
	{
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	});

const mapDispatchToProps = dispatch => (
	{
		onPurchaseBurgerStart: (order, token) => dispatch(actionCreators.purchaseBurger(order, token))
	});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
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
		loading: false,
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
					required: true
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
					maxLength: 5
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
			orderData: formData
		};
		this.props.onPurchaseBurgerStart(order);
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

const mapStateToProps = state => (
	{
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	});

const mapDispatchToProps = dispatch => (
	{
		onPurchaseBurgerStart: order => dispatch(actionCreators.purchaseBurgerStart(order))
	});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
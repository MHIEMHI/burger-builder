import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component
{
	state = {
		totalPrice: 0,
		ingredients: null
	};

	componentWillMount()
	{
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let totalPrice = 0;
		for (let param of query.entries())
		{
			if (param[0] === 'totalPrice')
			{
				totalPrice = +param[1];
			}
			else
			{
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients, totalPrice });
	}

	onCheckoutCancelled = () =>
	{
		this.props.history.goBack();
	};

	onCheckoutContinued = () =>
	{
		this.props.history.replace('/checkout/contact-data');
	};

	render()
	{
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.onCheckoutCancelled}
					checkoutContinued={this.onCheckoutContinued}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)}
				/>
			</div>
		);
	}
}

export default Checkout;
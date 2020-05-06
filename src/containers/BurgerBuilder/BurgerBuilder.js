import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component
{
	state =
		{
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4,
			purchasable: false,
			purchasing: false
		};

	purchaseCancelHandler = () =>
	{
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => 
	{
		//alert('You Continue!');
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
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
			.then(response => console.log(response))
			.catch(error => console.log(error));
	};

	purchaseHandler = () =>
	{
		this.setState({ purchasing: true });
	};

	updatePurchaseState = ingredients =>
	{
		const sum = Object.keys(ingredients)
			.map(igkey =>
			{
				return ingredients[igkey];
			})
			.reduce((sum, el) =>
			{
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = type =>
	{
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredient);
	};

	removeIngredientHandler = type =>
	{
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0)
		{
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredient);
	};

	render()
	{
		const disableInfo = {
			...this.state.ingredients
		};
		for (let key in disableInfo)
		{
			disableInfo[key] = disableInfo[key] <= 0;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disableInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux >
		);
	}
}

export default BurgerBuilder;